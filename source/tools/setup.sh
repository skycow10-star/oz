#!/bin/bash
# 새 작업 환경에서 제작 도구가 기대하는 폴더 구조를 다시 만든다.
# 사용법: 저장소를 $H/oz 에 clone 한 뒤  bash $H/oz/source/setup.sh
set -e
H="${OZ_HOME:-/home/claude}"
R=$(cd "$(dirname "$0")" && pwd)
mkdir -p $H/imgs/in $H/imgs/later $H/imgs/spare $H/src $H/test4 $H/out
cp -r $R/build $H/build
cp -r $R/tools $H/tools
find $R/images -maxdepth 1 -type f -exec cp {} $H/imgs/in/ \; 2>/dev/null || true
cp $R/images/later/* $H/imgs/later/ 2>/dev/null || true
cp $R/images/spare/* $H/imgs/spare/ 2>/dev/null || true
cp -r $R/text/translations $H/src/tr
cp -r $R/text/original_chapters $H/src/chapters
cp $R/tests/*.py $H/test4/ 2>/dev/null || true
echo "준비 완료: 고친 뒤 bash $H/tools/publish.sh \"커밋 메시지\" 로 빌드·그림·쉬운 이야기 페이지 생성·백업·배포를 한 번에 합니다."
