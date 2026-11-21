#!/bin/bash
# 빌드 → 앱용 파일 생성 → 원본 백업 → 캐시 번호 올림 → 커밋·푸시
# 사용법: bash $OZ_HOME/tools/publish.sh "커밋 메시지"   (푸시 없이 만들기만: NOPUSH=1)
set -e
MSG="$1"
OZ_HOME="${OZ_HOME:-/home/claude}"; export OZ_HOME
cd "$OZ_HOME"
ID=$(node -e "eval(require('fs').readFileSync('build/work.js','utf8')+';console.log(WORK.id)')")
python3 tools/build.py
python3 tools/assets.py 2>&1 | grep -v "proxy\|allowed\|use the read" | tail -1
python3 tools/mkeasy.py
R=$ID/source
mkdir -p $R/text
rm -rf $R/build $R/tools; cp -r build tools $R/
rm -rf $R/tools/__pycache__
rm -rf $R/text/translations; cp -r src/tr $R/text/translations
rm -rf $R/text/original_chapters; cp -r src/chapters $R/text/original_chapters
rm -rf $R/images; mkdir -p $R/images/later $R/images/spare; cp imgs/in/* $R/images/ 2>/dev/null || true; cp imgs/later/* $R/images/later/ 2>/dev/null || true; cp imgs/spare/* $R/images/spare/ 2>/dev/null || true
mkdir -p $R/tests; cp test4/*.py $R/tests/ 2>/dev/null || true
cp tools/setup.sh $R/setup.sh 2>/dev/null || true
cd $ID
N=$(grep -o "$ID-vn-v[0-9]*" sw.js | grep -o '[0-9]*$'); python3 -c "import sys;p='sw.js';s=open(p).read();open(p,'w').write(s.replace(sys.argv[1],sys.argv[2]))" "$ID-vn-v$N" "$ID-vn-v$((N+1))"
[ -n "$NOPUSH" ] && { echo "빌드만 완료 (푸시 안 함)"; exit 0; }
git add -A
git commit -q -m "$MSG"
git -c push.negotiate=true push 2>&1 | tail -1
