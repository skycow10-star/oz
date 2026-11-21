#!/bin/bash
# 자동 시험: 장마다 세 갈래(원작/상상/함께)를 끝까지 눌러 보고 오류·결말·카드를 출력.
# 사용법: bash $OZ_HOME/tools/test.sh            → 원래 이야기 1~10장
#         EASY=1 bash $OZ_HOME/tools/test.sh     → 쉬운 이야기 1~10장
#         CIS="7 8" bash $OZ_HOME/tools/test.sh  → 8·9장만 (0부터 셈)
# 먼저 NOPUSH=1 bash tools/publish.sh x 로 빌드할 것. playwright(pip) + 크롬 필요.
OZ_HOME="${OZ_HOME:-/home/claude}"; export OZ_HOME
mkdir -p "$OZ_HOME/out"; cd "$OZ_HOME/oz"
python3 -m http.server 8765 >/dev/null 2>&1 & SRV=$!; sleep 1
URL="http://localhost:8765/"; [ -n "$EASY" ] && URL="${URL}easy/"
for c in ${CIS:-0 1 2 3 4 5 6 7 8 9}; do echo "== $((c+1))장"; CI=$c python3 -u "$OZ_HOME/test4/run3_oz.py" "$URL" 2>&1 | grep -E "^(canon|imag|bal)|Error"; done
kill $SRV
git checkout -q sw.js 2>/dev/null || true
