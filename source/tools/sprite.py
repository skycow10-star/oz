# 제미나이 인물 그림(흰 배경) → 앱용 투명 스프라이트 (750×1000, 발을 같은 바닥선에, 인물별 키)
# 사용법: python3 sprite.py 이름 [키(0~1, 캔버스 높이 대비)]   예) python3 sprite.py dorothy_happy 0.76
#   입력: $OZ_HOME/out/cand/이름.png (grab_img.sh 결과)  출력: $OZ_HOME/imgs/in/이름.png + out/cand/_이름_spr.jpg(확인용)
# - 테두리에서 이어진 흰 배경만 투명하게 지움(하얀 옷처럼 윤곽선 안쪽의 흰색은 남김).
#   네 귀퉁이가 투명하면 앱(engine.js removeEdgeWhite)은 흰 배경 지우기를 건너뛰므로 하얀 옷이 지워지지 않음.
import os, sys
from collections import deque
from PIL import Image, ImageFilter
OZH = os.environ.get('OZ_HOME', '/home/claude')
HEIGHTS = {'lion': .72, 'dorothy': .76, 'toto': .30, 'em': .93, 'henry': .95, 'munchkin': .76, 'northwitch': .86}
W, H, FOOT = 750, 1000, 985
FOOTS = {'oz_head': 760, 'oz_fire': 760}   # 공중에 뜬 것: 바닥보다 위에 놓기
WIDE = {'monkeyking': 1000, 'oz_head': 1000, 'oz_fire': 1000, 'lion': 1000, 'tiger': 1000, 'oz_beast': 1000, 'stork': 750}   # 옆으로 긴 동물은 정사각형 캔버스(화면에서 너무 작아지지 않게)

KEEPWHITE = {'joker', 'witch', 'oz_head', 'mousequeen', 'northwitch', 'tinman', 'glinda', 'oz_lady', 'oz_fire', 'stork', 'milkmaid', 'chinaprincess'}  # 흰색이 몸·옷인 인물: 갇힌 흰색 지우기 안 함

def chroma(im, bc):
    # 단색(초록 등) 배경: 귀퉁이 색 bc 와 가까운 픽셀을 모두 지우고, 가장자리는 반투명 + 배경색 물듦 줄이기
    im = im.convert('RGBA'); px = im.load(); w, h = im.size
    G = max(20, bc[1] - max(bc[0], bc[2]))              # 배경의 '초록 도드라짐' 정도
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]; e = g - max(r, b)     # 이 픽셀의 초록 도드라짐 (흰색·검정·회색은 0 근처)
            if e > .7 * G: px[x, y] = (r, g, b, 0)
            elif e > .25 * G:
                t = (.7 * G - e) / (.45 * G)             # 1=그림, 0=배경
                px[x, y] = (r, max(r, b) + int(e * t), b, int(255 * t))
    bw, bh = int(w * 0.09), int(h * 0.07)               # 오른쪽 아래 제미나이 반짝이 표시 지우기
    for y in range(h - bh, h):
        for x in range(w - bw, w): px[x, y] = (0, 0, 0, 0)
    return im

def cut(im, holes=True):
    im = im.convert('RGBA'); w, h = im.size; px = im.load()
    c = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    if all(min(p[:3]) < 200 for p in c):                # 귀퉁이가 흰색이 아니면 단색 배경으로 보고 색으로 지움
        return chroma(im, tuple(sorted(p[i] for p in c)[1] for i in range(3)))
    def bg(x, y):
        r, g, b, a = px[x, y]; mn, mx = min(r, g, b), max(r, g, b)
        return mn > 222 and mx - mn < 30
    seen = bytearray(w * h); q = deque()
    for x in range(w):
        for y in (0, h - 1): q.append((x, y))
    for y in range(h):
        for x in (0, w - 1): q.append((x, y))
    while q:
        x, y = q.popleft(); i = y * w + x
        if seen[i] or not bg(x, y): continue
        seen[i] = 1
        if x > 0: q.append((x - 1, y))
        if x < w - 1: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y < h - 1: q.append((x, y + 1))
    if holes:  # 팔다리 사이처럼 테두리와 안 이어진 '갇힌 흰 바탕'도 지움(큰 덩어리만, 눈 흰자 등은 남음)
        strict = lambda x, y: min(px[x, y][:3]) > 236 and max(px[x, y][:3]) - min(px[x, y][:3]) < 14
        lab = bytearray(w * h); minsize = int(w * h * 0.0006)
        for y0 in range(0, h, 3):
            for x0 in range(0, w, 3):
                i0 = y0 * w + x0
                if seen[i0] or lab[i0] or not strict(x0, y0): continue
                comp = [i0]; st = [(x0, y0)]; lab[i0] = 1
                while st:
                    x, y = st.pop()
                    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                        if 0 <= nx < w and 0 <= ny < h:
                            j = ny * w + nx
                            if not seen[j] and not lab[j] and strict(nx, ny): lab[j] = 1; comp.append(j); st.append((nx, ny))
                if len(comp) >= minsize:
                    for j in comp: seen[j] = 1
    mask = Image.frombytes('L', (w, h), bytes(0 if s else 255 for s in seen))
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))  # 흰 테두리 띠 줄이고 가장자리 부드럽게
    im.putalpha(mask); return im

def main():
    global W
    k = sys.argv[1]; W = WIDE.get(k, W)
    hgt = float(sys.argv[2]) if len(sys.argv) > 2 else HEIGHTS.get(k.split('_')[0], .9)
    im = cut(Image.open(f'{OZH}/out/cand/{k}.png'), holes=k not in KEEPWHITE)
    a = im.getchannel('A').point(lambda v: 255 if v > 40 else 0); box = a.getbbox()
    fig = im.crop(box); s = hgt * H / fig.height
    if fig.width * s > W * .98: s = W * .98 / fig.width
    fig = fig.resize((max(1, round(fig.width * s)), max(1, round(fig.height * s))), Image.LANCZOS)
    out = Image.new('RGBA', (W, H), (0, 0, 0, 0)); out.paste(fig, ((W - fig.width) // 2, FOOTS.get(k, FOOT) - fig.height), fig)
    os.makedirs(f'{OZH}/imgs/in', exist_ok=True); out.save(f'{OZH}/imgs/in/{k}.png')
    chk = Image.new('RGB', (W, H), (120, 160, 120)); chk.paste(out, (0, 0), out)   # 초록 바탕에 얹어 지운 자리 확인
    chk.resize((W // 2, H // 2)).save(f'{OZH}/out/cand/_{k}_spr.jpg', quality=85)
    print(k, '키', hgt, '→', out.size, '그림 상자', fig.size)

main()
