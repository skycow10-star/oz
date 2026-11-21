# 제미나이 아이콘 시트(흰 배경, 격자) → 물건마다 잘라 imgs/in/<접두어>_<키>.png 로 저장
# 사용법: python3 iconsheet.py 시트.png it silverShoes kissMark note ...   (왼쪽 위부터 오른쪽으로, 다음 줄)
#         python3 iconsheet.py 결말.png end canon imag bal
# - 흰 배경 기준으로 물건 덩어리를 찾음(격자가 조금 삐뚤어도 됨). 가까운 조각(그림자·반짝이)은 한 덩어리로 묶음
# - 정사각형 여백을 주고, 바깥 흰 배경은 투명하게 (앱에서는 it_/end_ 그림의 배경 지우기를 건너뜀)
# - 확인용 미리보기: /home/claude/out/<접두어>_sheet.png
import os as _os; OZH = _os.environ.get('OZ_HOME', '/home/claude')   # 작업 폴더(기본 /home/claude)
import sys, os
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
path, prefix, keys = sys.argv[1], sys.argv[2], sys.argv[3:]
im = Image.open(path).convert('RGB'); a = np.asarray(im).astype(int)
ink = (a.min(axis=2) < 232) | (a.max(axis=2) - a.min(axis=2) > 22)          # 흰 바탕이 아닌 곳
gap = max(6, int(min(im.size) * 0.012))
lab, n = ndimage.label(ndimage.binary_dilation(ink, iterations=gap))
objs = ndimage.find_objects(lab)
area = ndimage.sum(ink, lab, range(1, n + 1))
cand = [(objs[i], area[i]) for i in range(n) if area[i] > ink.sum() * 0.004]
cand.sort(key=lambda c: -c[1]); cand = cand[:len(keys)]
if len(cand) < len(keys): print(f'⚠️ 물건 {len(keys)}개를 적었는데 그림에서 {len(cand)}개만 찾았어요')
# 줄 → 칸 순서로 정렬: 세로 중심이 비슷한 것끼리 한 줄
cen = [((s[0].start + s[0].stop) / 2, (s[1].start + s[1].stop) / 2, s) for s, _ in cand]
cen.sort(); rows, cur = [], []
hmed = np.median([s[0].stop - s[0].start for _, _, s in cen]) if cen else 0
for c in cen:
    if cur and c[0] - cur[-1][0] > hmed * 0.5: rows.append(cur); cur = []
    cur.append(c)
if cur: rows.append(cur)
order = [c[2] for r in rows for c in sorted(r, key=lambda c: c[1])]
os.makedirs(OZH + '/imgs/in', exist_ok=True); os.makedirs(OZH + '/out', exist_ok=True)
prev = Image.new('RGBA', (len(order) * 140 + 10, 170), (250, 245, 235, 255)); dr = ImageDraw.Draw(prev)
for i, (k, sl) in enumerate(zip(keys, order)):
    y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
    piece = im.crop((x0, y0, x1, y1)).convert('RGBA'); p = np.array(piece)
    # 테두리와 이어진 흰 바탕만 투명하게 (물건 안의 흰 부분은 남김)
    white = (p[:, :, :3].min(axis=2) > 236) & (p[:, :, :3].max(axis=2) - p[:, :, :3].min(axis=2) < 18)
    lw, _ = ndimage.label(white); edge = set(np.unique(np.concatenate([lw[0], lw[-1], lw[:, 0], lw[:, -1]]))) - {0}
    p[np.isin(lw, list(edge)), 3] = 0
    piece = Image.fromarray(p)
    side = int(max(x1 - x0, y1 - y0) * 1.12)
    sq = Image.new('RGBA', (side, side), (0, 0, 0, 0)); sq.alpha_composite(piece, ((side - (x1 - x0)) // 2, (side - (y1 - y0)) // 2))
    sq = sq.resize((256, 256), Image.LANCZOS); sq.save(f'{OZH}/imgs/in/{prefix}_{k}.png')
    prev.alpha_composite(sq.resize((128, 128), Image.LANCZOS), (8 + i * 140, 6)); dr.text((10 + i * 140, 145), k, fill=(80, 60, 40, 255))
prev.save(f'{OZH}/out/{prefix}_sheet.png')
print(len(order), '개 저장:', ', '.join(f'{prefix}_{k}' for k in keys[:len(order)]))
