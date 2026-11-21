#!/bin/bash
# 새 작업 환경에서 제작 도구가 기대하는 폴더 구조를 다시 만든다.
# 사용법: 저장소를 /home/claude/oz 에 clone 한 뒤  bash /home/claude/oz/source/setup.sh
set -e
R=$(cd "$(dirname "$0")" && pwd)
mkdir -p /home/claude/imgs/in /home/claude/imgs/later /home/claude/imgs/spare /home/claude/src /home/claude/test4 /home/claude/out
cp -r $R/build /home/claude/build
cp -r $R/tools /home/claude/tools
find $R/images -maxdepth 1 -type f -exec cp {} /home/claude/imgs/in/ \; 2>/dev/null || true
cp $R/images/later/* /home/claude/imgs/later/ 2>/dev/null || true
cp $R/images/spare/* /home/claude/imgs/spare/ 2>/dev/null || true
cp -r $R/text/translations /home/claude/src/tr
cp -r $R/text/original_chapters /home/claude/src/chapters
cp $R/tests/*.py /home/claude/test4/ 2>/dev/null || true
echo "준비 완료: 고친 뒤 bash /home/claude/tools/publish.sh \"커밋 메시지\" 로 빌드·그림·쉬운 이야기 페이지 생성·백업·배포를 한 번에 합니다."
