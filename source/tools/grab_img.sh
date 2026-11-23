#!/bin/bash
# 방금 받은 제미나이 그림(최근 3분 안 Downloads 의 가장 새 파일)을 앱 그림으로 정리
# 사용법: bash grab_img.sh bg_ch1        → 배경: 1376×768 로 맞춰 out/raw 원본 + out/cand 후보
#         bash grab_img.sh dorothy_happy  → 인물: 원본 그대로(흰 배경은 앱이 지움), 긴 변 1600 이하
# 확인 뒤 out/cand/<이름>.png 를 imgs/in 으로 옮기면 publish 때 들어감
D="/c/Users/김준환/Downloads"
LAST=$(cat /c/ozwork/out/.lastgrab 2>/dev/null)
F=""
if [ "$2" != re ]; then
  for i in $(seq 1 20); do   # 지난번에 쓴 파일이 아닌 새 파일이 다 받아질 때까지 최대 40초 기다림
    F=$(find "$D" -maxdepth 1 -name 'Gemini_Generated_Image_*.png' -mmin -3 -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
    if [ -n "$F" ] && [ "$F" != "$LAST" ]; then s1=$(stat -c %s "$F"); sleep 1; [ "$s1" = "$(stat -c %s "$F")" ] && break; fi
    F=""; sleep 2
  done
  [ -n "$F" ] && echo "$F" > /c/ozwork/out/.lastgrab
fi
# bash grab_img.sh 이름 re → 이미 받은 out/raw/이름.png 로 다시 정리
if [ -n "$F" ]; then mkdir -p /c/ozwork/out/raw /c/ozwork/out/cand; cp "$F" "/c/ozwork/out/raw/$1.png"
elif [ "$2" != re ]; then echo "받은 파일 없음"; exit 1; fi
/c/ozwork/.ozbin/python3 - "$1" <<'PY'
import sys; from PIL import Image
k=sys.argv[1]; im=Image.open(f'C:/ozwork/out/raw/{k}.png').convert('RGB'); print(k,'원본',im.size)
if k.startswith('bg_'):
    px=im.load(); W,H=im.size
    wr=lambda y: sum(1 for x in range(0,W,8) if min(px[x,y])>225)/(W/8)>0.8   # 흰 종이 테두리 줄
    wc=lambda x: sum(1 for y in range(0,H,8) if min(px[x,y])>225)/(H/8)>0.8
    t,b,l,r=0,H,0,W
    while t<H//4 and wr(t): t+=1
    while b>H*3//4 and wr(b-1): b-=1
    while l<W//4 and wc(l): l+=1
    while r>W*3//4 and wc(r-1): r-=1
    im=im.crop((l,t,r,b))
    W,H=im.size; t=16/9
    if W/H>t: nw=int(H*t); im=im.crop(((W-nw)//2,0,(W-nw)//2+nw,H))
    else: nh=int(W/t); im=im.crop((0,(H-nh)//2,W,(H-nh)//2+nh))
    im=im.resize((1376,768),Image.LANCZOS)
else:
    s=min(1.0,1600/max(im.size)); im=im.resize((int(im.width*s),int(im.height*s)),Image.LANCZOS)
W,H=im.size; bw,bh=int(W*0.055),int(H*0.10); x0,y0=W-bw-int(W*0.006),H-bh-int(H*0.006)
im.paste(im.crop((x0-bw,y0,x0,y0+bh)),(x0,y0))   # 오른쪽 아래 제미나이 반짝이 표시를 왼쪽 옆 조각으로 덮기
im.save(f'C:/ozwork/out/cand/{k}.png'); im.resize((im.width//2,im.height//2)).save(f'C:/ozwork/out/cand/_{k}.jpg',quality=85); print('후보',im.size)
PY
