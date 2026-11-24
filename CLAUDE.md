# CLAUDE.md — 《오즈의 마법사》 비주얼 노벨 (클로드 코드용 요약)

이 저장소는 **배포되는 앱**(루트)과 **제작 원본 백업**(`source/`)으로 나뉜다. 자세한 내용은 `인수인계.md`(반드시 끝까지 읽기).

## 작업 폴더
- 모든 도구는 환경 변수 `OZ_HOME`(기본 `/home/claude`) 아래에서 일한다. 클로드 코드에서는 **이 저장소의 부모 폴더**를 OZ_HOME으로 쓴다.
  - 예: `~/ozwork/oz` 가 이 저장소라면 `export OZ_HOME=~/ozwork`. 셸 명령마다 앞에 붙이거나 세션 처음에 export.
- 처음 한 번: `bash $OZ_HOME/oz/source/setup.sh` → `$OZ_HOME/build, tools, src/tr, src/chapters, imgs/in, test4` 생성.
- 필요한 것: git, python3(pillow, playwright), node, 크롬(시험), ffmpeg(음악).

## 고치고 배포하기
- **원본은 `$OZ_HOME/build/*.js`, `$OZ_HOME/src/tr/*.txt`, `$OZ_HOME/tools/*`** 에서 고친다. `oz/source/`는 publish 때 덮어쓰는 백업이니 직접 고치지 말 것.
- 빌드만: `NOPUSH=1 bash $OZ_HOME/tools/publish.sh x` (끝나면 `cd $OZ_HOME/oz && git checkout -q sw.js`)
- 시험: `bash $OZ_HOME/tools/test.sh` (쉬운 이야기는 `EASY=1`, 일부 장만 `CIS="7 8"` — 0부터 셈). 각 줄 끝 `[]` = 오류 없음.
- 배포: `bash $OZ_HOME/tools/publish.sh "커밋 메시지"` → 빌드·그림·쉬운 페이지·백업·캐시 번호·커밋·푸시를 한 번에.
- 그림 넣기: 파일 이름 = 키로 `$OZ_HOME/imgs/in/`에 넣고 publish (`bg_ch2.png` → 배경 `ch2`, 인물은 이름 그대로). 얼굴 아이콘은 `python3 tools/avatars.py`.

## 현재 상태 (2026-11-24)
- 원래 이야기·쉬운 이야기 1~10장, 힘 카드, 중간·최종 보고서 완성. 자동 시험 통과.
- **그림 완성**: 배경 48·인물 36·얼굴 아이콘 5 (원본 `$OZ_HOME/imgs/in`, 기준 그림 ①~⑨는 `$OZ_HOME/imgs/ref`).
- **음악**: 1~7·9·10장 `bgm_chN.mp3` 넣음. **8장만 남음**(수노 다운로드 횟수가 12/6에 다시 채워지면 받기).
- 물건 아이콘 it_ 19개·결말 end_ 3개·앱 아이콘(노란 벽돌 길+도로시·토토) 완성.
- 남은 일: 8장 음악.
- GitHub Pages(Settings → Pages, main 브랜치)를 켜야 학생 주소가 열린다.
- Windows 작업: `C:\ozwork`, 셸마다 `source /c/ozwork/oz_env.sh`(python3·node·CHROME 경로). 시험 포트 8775. 인물 그림은 `tools/sprite.py`, 받은 그림 정리는 `tools/grab_img.sh`.

## 선생님과 일하는 법
- 한국어로, 짧고 분명하게. 무엇을 했는지 + 선생님이 할 일만.
- 1939년 영화가 아니라 1900년 원작(은 구두). 주제는 "이미 가진 힘을 알아보기"와 관계.
- 힘 카드는 원래 이야기 대본(`script_chN.js`의 `cards`)에서만 정의, 쉬운 이야기는 키만 쓴다.
- 쉬운 이야기의 이름 고르기(`t:'name'` + `pick`)에는 `free: true`가 꼭 있어야 한다(없으면 멈춤).
