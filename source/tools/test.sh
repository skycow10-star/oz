#!/bin/bash
# 자동 시험: 장마다 세 갈래(원작/상상/함께)를 끝까지 눌러 보고 오류·결말·카드를 출력.
# 사용법: bash $OZ_HOME/tools/test.sh            → 원래 이야기 1~10장
#         EASY=1 bash $OZ_HOME/tools/test.sh     → 쉬운 이야기 1~10장
#         CIS="7 8" bash $OZ_HOME/tools/test.sh  → 8·9장만 (0부터 셈)
#         PORT=8780 ...                          → 다른 포트 (기본 8775; 지도 게임 등이 8765 를 씀)
# 먼저 NOPUSH=1 bash tools/publish.sh x 로 빌드할 것. playwright(pip) + 크롬 필요.
OZ_HOME="${OZ_HOME:-/home/claude}"; export OZ_HOME
PORT="${PORT:-8775}"
mkdir -p "$OZ_HOME/out"; cd "$OZ_HOME/oz"
# 서버가 자기 번호를 적어 두게 해서, 끝날 때 그 서버만 끈다 (Windows 에서는 kill 이 파이썬까지 못 끔)
python3 -c "import os,http.server;open(os.environ['OZ_HOME']+'/out/srv.pid','w').write(str(os.getpid()));http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler,port=$PORT,bind='127.0.0.1')" >/dev/null 2>&1 &
sleep 1
URL="http://127.0.0.1:$PORT/"; [ -n "$EASY" ] && URL="${URL}easy/"
for c in ${CIS:-0 1 2 3 4 5 6 7 8 9}; do echo "== $((c+1))장"; CI=$c python3 -u "$OZ_HOME/test4/run3_oz.py" "$URL" 2>&1 | grep -E "^(canon|imag|bal)|Error"; done
P=$(cat "$OZ_HOME/out/srv.pid" 2>/dev/null)
if [ -n "$P" ]; then if command -v taskkill >/dev/null; then taskkill //F //PID $P >/dev/null 2>&1; else kill $P 2>/dev/null; fi; fi
rm -f "$OZ_HOME/out/srv.pid"
git checkout -q sw.js 2>/dev/null || true
