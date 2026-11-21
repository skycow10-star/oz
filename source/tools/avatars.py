# 인물 그림(저장소/img/*.webp, 배경 투명)에서 얼굴을 동그랗게 잘라 imgs/in/av_인물.png 로 저장 (앤 저장소 avatars.py 와 같은 방식)
# 사용법: python3 avatars.py                       → 미리보기 /home/claude/out/av_sheet.png
#         python3 avatars.py "{'toto':(0,0.05,1.2)}"  → 인물별 미세 조정 (dx, dy, 배율; dx·dy는 크기 비율)
# 어떤 그림에서 자를지는 work.js 의 avatarFrom {하트키: 스프라이트키}
import os as _os; OZH = _os.environ.get('OZ_HOME', '/home/claude')   # 작업 폴더(기본 /home/claude)
import sys, os, ast
from PIL import Image, ImageDraw
import numpy as np
sys.path.insert(0, OZH + '/tools')
from work import W, REPO
SRC = W.get('avatarFrom', {})
ADJ = ast.literal_eval(sys.argv[1]) if len(sys.argv) > 1 else {}
have = [(k, f) for k, f in SRC.items() if os.path.exists(f'{REPO}/img/{f}.webp')]
if not have: sys.exit('아직 인물 그림이 없어요 (img/*.webp)')
sheet = Image.new('RGBA', (len(have) * 170 + 10, 200), (250, 245, 235, 255)); d = ImageDraw.Draw(sheet)
for i, (k, f) in enumerate(have):
    im = Image.open(f'{REPO}/img/{f}.webp').convert('RGBA'); a = np.array(im)[:, :, 3]
    ys, xs = np.where(a > 40); top = ys.min(); h = ys.max() - top
    band = a[top:top + int(h * 0.16)]; cols = np.where(band.max(axis=0) > 40)[0]
    cx = (cols.min() + cols.max()) / 2; w = cols.max() - cols.min()
    dx, dy, sc = ADJ.get(k, (0, 0, 1.0))
    size = int(max(w * 1.05, h * 0.17) * sc); cy = top + size * 0.55
    cx += dx * size; cy += dy * size
    box = (int(cx - size / 2), int(cy - size / 2), int(cx + size / 2), int(cy + size / 2))
    crop = Image.new('RGBA', (size, size), (255, 249, 241, 255)); crop.alpha_composite(im.crop(box))
    crop = crop.resize((160, 160), Image.LANCZOS)
    m = Image.new('L', (160, 160), 0); ImageDraw.Draw(m).ellipse((0, 0, 159, 159), fill=255)
    out = Image.new('RGBA', (160, 160), (0, 0, 0, 0)); out.paste(crop, (0, 0), m)
    out.save(f'{OZH}/imgs/in/av_{k}.png'); sheet.alpha_composite(out, (5 + i * 170, 5)); d.text((10 + i * 170, 175), k, fill=(80, 60, 40, 255))
os.makedirs(OZH + '/out', exist_ok=True); sheet.save(OZH + '/out/av_sheet.png')
print('얼굴', len(have), '개 →', ', '.join(k for k, _ in have), '/ 미리보기 /home/claude/out/av_sheet.png')
