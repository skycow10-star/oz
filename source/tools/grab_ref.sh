#!/bin/bash
# 내장 브라우저로 받은 제미나이 그림을 기준 그림 폴더에 이름 붙여 복사 (최근 3분 안의 가장 새 파일)
# 저장 창에서 '저장'을 누르면 Gemini_Generated_Image_*.png, 누르기 전이면 <uuid>.tmp 로 있음
# 사용법: bash grab_ref.sh ref_west
D="/c/Users/김준환/Downloads"
F=$(find "$D" -maxdepth 1 \( -name 'Gemini_Generated_Image_*.png' -o -name '*.tmp' \) -mmin -3 -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
[ -z "$F" ] && { echo "받은 파일 없음"; exit 1; }
mkdir -p /c/ozwork/imgs/ref; cp "$F" "/c/ozwork/imgs/ref/$1.png"
/c/ozwork/.ozbin/python3 -c "
from PIL import Image; im=Image.open('C:/ozwork/imgs/ref/$1.png'); print('$1', im.size)
im.convert('RGB').resize((im.width//2, im.height//2)).save('C:/ozwork/imgs/ref/$1_small.jpg', quality=88)"
