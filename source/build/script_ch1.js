/* =========================================================
   1장 대본 — 회오리바람 (원작 1~2장)
   ⚠️ 임시 대본: 엔진·원문 책장 확인용. 다음 단계에서 정식 대본으로 바꿉니다.
   ========================================================= */
CHAPTERS.push({
  key: `ch1`, num: 1, title: `회오리바람`, orig: `원작 1~2장`, origTitle: `회오리바람 · 먼치킨들과의 회의`,
  bgKeys: [`ch1`, `ch1_storm`, `ch1_sky`, `ch1_munchkin`, `ch1_road`],
  endings: {
    canon: {title: `노란 벽돌 길 위로`, label: `원작 결말`},
    imag:  {title: `(준비 중)`, label: `상상 결말`},
    bal:   {title: `(준비 중)`, label: `균형 결말`}
  },
  talk: {e: [`(준비 중) 도로시가 사는 캔자스는 왜 '잿빛'으로 그려졌을까요?`], l: [`(준비 중) 원작 1장에서 '잿빛'이 되풀이되는 까닭을 생각해 봅시다.`]},
  nodes: [
  {id: `s1`, bg: `ch1`, w: `dorothy`, in: 1, f: `dorothy_sad`, bk: [`1-2`],
   b: `(임시 장면) 우리 집은 캔자스 대초원 한가운데에 있어. 둘러보면 하늘 끝까지 온통 잿빛이야.`},
  {bg: `ch1_storm`, w: `henry`, f: `dorothy_surprised`, o: `henry`, cam: `shake`, bk: [`1-9`],
   b: `"회오리바람이 오고 있어, 엠!"`},
  {bg: `ch1_sky`, w: `dorothy`, in: 1, f: `dorothy_surprised`, bk: [`1-14`],
   b: `집이 빙글빙글 돌더니 하늘로 떠올랐어!`},
  {t: `choice`, id: `C1`, kind: `act`, label: `흔들리는 집 안에서`, f: `dorothy_brave`,
   q: {e: `(임시 선택지) 집이 하늘을 떠가요. 도로시는 어떻게 할까요?`, l: `(임시 선택지) 집이 하늘을 떠갑니다. 도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 차분히 기다리기로 마음먹고 침대에 누워 잠이 들어요.`, l: `원작에서 도로시는 앞으로 일어날 일을 차분히 기다리기로 하고 잠듭니다.`},
   opts: [
    {type: `canon`, go: `s2`, e: `침대에 누워 차분히 기다린다.`},
    {type: `bal`, go: `s2`, e: `토토를 꼭 안고 함께 견딘다.`},
    {type: `imag`, go: `s2`, e: `창밖으로 회오리 속을 내다본다.`}
   ]},
  {id: `s2`, bg: `ch1_munchkin`, w: `northwitch`, f: `dorothy_surprised`, o: `northwitch`, bk: [`2-7`],
   b: `"가장 고귀하신 마법사님, 먼치킨 나라에 오신 것을 환영합니다."`},
  {t: `ending`},
  {id: `E_canon`, bg: `ch1_road`, w: `dorothy`, in: 1, f: `dorothy_brave`, bk: [`2-57`], b: `(임시 결말) 노란 벽돌 길을 따라가 보자.`, eff: {}},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch1_road`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, b: `(임시 결말)`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch1_road`, w: `dorothy`, in: 1, f: `dorothy_happy`, b: `(임시 결말)`},
  {id: `E_last`, bg: `ch1_road`, w: `dorothy`, f: `dorothy_happy`, o: `toto`, b: `가자, 토토! 에메랄드 시로!`},
  {t: `endcard`}
  ]
});
