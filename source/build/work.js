/* =========================================================
   작품 설정 — 《오즈의 마법사》
   엔진(engine.js)은 작품과 상관없이 쓰고, 작품마다 달라지는 것은 모두 여기에 둡니다.
   장마다 새로 생기는 인물·그림·낱말은 이 파일에 덧붙이면 됩니다.
   ========================================================= */
const WORK = {
  /* 이름·제목 */
  id: `oz`,
  title: `오즈의 마법사`,
  sub: `노란 벽돌 길 위의 친구들`,
  en: `THE WONDERFUL WIZARD OF OZ`,
  easyTitle: `쉬운 오즈의 마법사`,
  easyShort: `쉬운 오즈`,
  desc: `원작 소설과 함께 읽는 선택형 문학 비주얼 노벨`,
  theme: `#2f7d5b`,
  palette: {from: [12, 58], to: 152, spread: 0.45, sat: 0.95},   /* 주황·베이지 → 에메랄드 (앤과 구별) */
  file: `oz_visual_novel.html`,
  saveKey: `ozVN_v1`,
  bookCredit: `L. 프랭크 바움 《오즈의 위대한 마법사》(1900) 영어 원작을 이 앱을 위해 새로 우리말로 옮겼어요. 점선 밑줄 낱말을 누르면 뜻풀이가 나와요.`,

  /* 세 번째 갈래(균형) 이름: 이 작품에서는 '함께' */
  bal: {ic: `🤝`, name: `함께`, badge: {e: `🤝 친구와 함께하는 길을 골랐어요!`, l: `🤝 함께 해결하는 길을 골랐습니다`}},

  /* 주인공 */
  hero: `dorothy`,
  heroName: `도로시`,
  heroFull: `도로시`,
  heroTopic: `도로시는`,

  /* 표지 */
  coverBg: [`ch10`, `ch1_munchkin`, `ch1`],
  coverSprite: `dorothy_happy`,
  coverText: {
    normal: `내가 고른 선택에 따라 도로시와 친구들의 이야기가 달라져요.`,
    easy: `짧은 글을 읽고, 내가 도로시라면 어떻게 할지 골라 보세요.`
  },

  /* 말하는 사람 이름표 (주인공 제외). 색은 tagColors */
  who: {
    toto: `토토`,
    em: `엠 아주머니`,
    henry: `헨리 아저씨`,
    munchkin: `먼치킨 사람`,
    northwitch: `북쪽 마녀`,
    scarecrow: `허수아비`,
    boq: `보크`,
    tinman: `양철 나무꾼`,
    lion: `겁쟁이 사자`,
    stork: `황새`,
    mousequeen: `들쥐 여왕`,
    /*+who*/
  },
  tagColors: {
    toto: `#5a5560`, em: `#8a7a6a`, henry: `#6f6a5c`, munchkin: `#4a78b8`, northwitch: `#9b86c4`,
    scarecrow: `#c9a23a`, boq: `#3f6fb0`,
    tinman: `#7d8a96`,
    lion: `#c98a2e`,
    stork: `#8aa0b8`, mousequeen: `#a08ab0`,
    /*+tag*/
  },

  /* 하트(관계) 대상. start = 처음 하트 수 */
  chars: {
    toto: {ic: `🐶`, name: `토토`, full: `토토`, start: 2},
    scarecrow: {ic: `🌾`, name: `허수아비`, full: `허수아비`, start: 0},
    tinman: {ic: `🪓`, name: `나무꾼`, full: `양철 나무꾼`, start: 0},
    lion: {ic: `🦁`, name: `사자`, full: `겁쟁이 사자`, start: 0},
    /*+chars*/
  },
  startMet: [`toto`],
  /* 얼굴 아이콘(av_하트키)을 자를 인물 그림. tools/avatars.py 가 씀. 새 친구가 생기면 추가 */
  avatarFrom: {toto: `toto`, scarecrow: `scarecrow`, tinman: `tinman`, lion: `lion`, /*+av*/},

  /* 힘 카드 주인과 힘 이름 (하트 키와 같게). 카드는 장 대본의 cards: {키: {who, name, e, l, quote}} */
  powers: {
    scarecrow: {name: `허수아비`, ic: `🧠`, power: `생각하는 힘`, wish: `뇌`},
    tinman: {name: `양철 나무꾼`, ic: `💗`, power: `따뜻한 마음`, wish: `심장`},
    lion: {name: `사자`, ic: `🦁`, power: `용기`, wish: `용기`},
    dorothy: {name: `도로시`, ic: `🥈`, power: `집으로 가는 힘`, wish: `집`}
  },
  powerOk: `💡 친구의 힘을 알아봤어요!`,

  /* 인물 그림 키 (흰 배경 전신 PNG → 자동 투명 처리) */
  sprites: [`dorothy_happy`, `dorothy_sad`, `dorothy_surprised`, `dorothy_brave`, `dorothy_dreamy`,
            `toto`, `em`, `henry`, `munchkin`, `northwitch`,
            `scarecrow`, `boq`,
    `tinman`,
    `lion`,
    `stork`, `mousequeen`,
    /*+sprites*/],

  /* 그림 키 안내 (교사용 도움말에 나옴) */
  bgHelp: {
    ch1: `캔자스 농가(잿빛 대초원)`,
    ch1_storm: `회오리바람이 다가오는 들판`,
    ch1_sky: `회오리 속을 떠가는 집 안(어둠)`,
    ch1_munchkin: `먼치킨 나라(꽃·시냇물·파란 집)`,
    ch1_road: `노란 벽돌 길이 시작되는 곳`,
    ch2: `먼치킨 마을을 지나는 노란 벽돌 길(파란 울타리·둥근 파란 집)`,
    ch2_feast: `보크네 집 앞 잔치(저녁, 잔디밭에서 춤추는 먼치킨들)`,
    ch2_corn: `옥수수밭과 장대(허수아비 없이)`,
    ch2_rough: `험해진 노란 벽돌 길, 쓸쓸한 들판과 시냇가`,
    ch2_forest: `어두운 숲속 길과 통나무 오두막(밤)`,
    ch3: `아침 숲속의 맑은 샘`,
    ch3_tin: `햇살이 비치는 숲, 반쯤 베어진 큰 나무(인물 없이)`,
    ch3_thicket: `가지가 빽빽이 덮어 막힌 노란 벽돌 길`,
    ch3_deep: `깊은 숲을 지나는 노란 벽돌 길(오후)`,
    ch4: `낙엽 덮인 어두운 숲속 노란 벽돌 길`,
    ch4_camp: `밤, 큰 나무 아래 모닥불`,
    ch4_ditch: `길을 가로지르는 깊은 골짜기(바닥에 뾰족한 바위)`,
    ch4_bridge: `넓은 골짜기 위에 쓰러뜨린 큰 나무 다리`,
    ch4_river: `넓은 강과 건너편의 꽃 핀 초록 들판(오후)`,
    ch5: `강가의 아침, 통나무 뗏목`,
    ch5_river: `빠른 강 한가운데(물에 꽂힌 장대 하나)`,
    ch5_bank: `꽃과 과일나무가 가득한 강둑`,
    ch5_poppy: `끝없는 진홍빛 양귀비 꽃밭`,
    ch5_meadow: `양귀비밭 너머 초록 들판과 강가(나무 수레)`,
    /*+bghelp*/
  },

  /* 그림이 없을 때 나오는 수채화 대체 그림 설정
     sky: 하늘 세 색, far/near: 먼 언덕·가까운 땅, sun/moon, stars, road(노란 벽돌 길), house, trees, flowers, dark(밤·실내 어둠) */
  svgScenes: {
    ch1:          {sky: [`#b9b8ad`, `#cfcabd`, `#ddd6c4`], far: `#a7a08e`, near: `#9a9280`, house: `gray`, flat: true},
    ch1_storm:    {sky: [`#3e4148`, `#6a6c70`, `#a19c8e`], far: `#7d7768`, near: `#6d6758`, house: `gray`, flat: true, funnel: true},
    ch1_sky:      {sky: [`#1d1f2a`, `#2d3040`, `#3e4152`], dark: true, swirl: true},
    ch1_munchkin: {sky: [`#8fc6ea`, `#bfe1f2`, `#eef6e6`], far: `#7fb36a`, near: `#5f9a52`, flowers: [`#f2c94c`, `#e86a6a`, `#ffffff`, `#7aa7e0`], house: `blue`, stream: true, trees: 6},
    ch1_road:     {sky: [`#9fd0ee`, `#cfe8f4`, `#f4f2de`], far: `#86b872`, near: `#6aa25a`, road: true, trees: 8, flowers: [`#f2c94c`, `#ffffff`]},
    ch2:        {sky: [`#9fd0ee`, `#cfe8f4`, `#f4f2de`], far: `#86b872`, near: `#6aa25a`, road: true, house: `blue`, trees: 4, flowers: [`#7aa7e0`, `#ffffff`]},
    ch2_feast:  {sky: [`#e9a86a`, `#f3c98e`, `#f8e6c0`], far: `#7aa35e`, near: `#5f8f4e`, house: `blue`, trees: 4, sun: [1250, 330, `#ffd9a0`], flowers: [`#f2c94c`, `#e86a6a`]},
    ch2_corn:   {sky: [`#9fd0ee`, `#d6ecf4`, `#f4f0d6`], far: `#c9b45a`, near: `#b39a3e`, trees: 2, road: true},
    ch2_rough:  {sky: [`#b9c7cf`, `#d6dcd8`, `#e8e4d2`], far: `#98a882`, near: `#8a9470`, road: true, stream: true},
    ch2_forest: {sky: [`#1e2a26`, `#2c3b33`, `#3a4a3e`], dark: true, far: `#22352a`, near: `#1c2a22`, trees: 10, tree: `#24402c`, road: true},
    ch3:         {sky: [`#9fc8a8`, `#c8e0c4`, `#e8f0d8`], far: `#5f8f5a`, near: `#4f7f4a`, trees: 9, tree: `#3f7440`, stream: true, sun: [380, 140, `#fff6cc`]},
    ch3_tin:     {sky: [`#8fb89a`, `#bfd8bc`, `#e4eed6`], far: `#5a8a56`, near: `#4a7a46`, trees: 10, tree: `#3c6e3e`, sun: [900, 120, `#fff3b8`]},
    ch3_thicket: {sky: [`#5f7f62`, `#7f9f7c`, `#a8c0a0`], far: `#3f6a42`, near: `#355e38`, trees: 14, tree: `#2f5a34`, road: true},
    ch3_deep:    {sky: [`#6f9a7a`, `#9fc0a0`, `#d0e0c4`], far: `#4a7a4c`, near: `#3e6e40`, trees: 12, tree: `#355f3a`, road: true},
    ch4:        {sky: [`#4f6a58`, `#6f8a72`, `#9fb092`], far: `#3f5f44`, near: `#5a5032`, trees: 12, tree: `#2f5034`, road: true},
    ch4_camp:   {sky: [`#141c22`, `#1f2a30`, `#2c3a3a`], dark: true, far: `#1e2c24`, near: `#2a2418`, trees: 8, tree: `#1a3020`, sun: [800, 640, `#ffb060`]},
    ch4_ditch:  {sky: [`#8fb0a0`, `#b8cfc0`, `#dde6d4`], far: `#4f7f52`, near: `#5a4a3a`, trees: 8, tree: `#3f6a42`, funnel: false},
    ch4_bridge: {sky: [`#7f9f8a`, `#a8c2ae`, `#d0dcc8`], far: `#4a7a4c`, near: `#4a3e30`, trees: 9, tree: `#355f3a`},
    ch4_river:  {sky: [`#9fd0ee`, `#cfe8f4`, `#f4f2de`], far: `#86b872`, near: `#6aa25a`, stream: true, trees: 6, flowers: [`#f2c94c`, `#e86a6a`, `#ffffff`]},
    ch5:        {sky: [`#ffd9a0`, `#ffe9c4`, `#f6f2dc`], far: `#86b872`, near: `#6aa25a`, stream: true, trees: 5, sun: [300, 260, `#fff1c0`]},
    ch5_river:  {sky: [`#9fd0ee`, `#c8e4f2`, `#e6f2f4`], far: `#7fb36a`, near: `#5d9ec8`, stream: true, trees: 3},
    ch5_bank:   {sky: [`#9fd0ee`, `#cfe8f4`, `#f4f2de`], far: `#86b872`, near: `#6aa25a`, stream: true, trees: 6, flowers: [`#f2c94c`, `#ffffff`, `#7aa7e0`, `#b07ad0`]},
    ch5_poppy:  {sky: [`#f2c2a0`, `#f6dcc0`, `#f8ecd8`], far: `#9ab870`, near: `#c8302e`, flowers: [`#e02a2a`, `#ff4a3a`, `#c81e1e`, `#ff7a5a`]},
    ch5_meadow: {sky: [`#9fd0ee`, `#cfe8f4`, `#f4f2de`], far: `#86b872`, near: `#6aa25a`, stream: true, trees: 4, flowers: [`#e02a2a`, `#ffffff`]},
    /*+svg*/
  },

  /* 장면 효과 (빛·꽃잎·별·물빛) — 앤 엔진과 같은 형식 */
  sceneFx: {
    ch1:          {light: `dim`, motes: {n: 18}},
    ch1_storm:    {light: `dim`, petals: {n: 26, col: [`#8a8070`, `#a8a090`, `#6d6758`], size: [2, 5], vy: [30, 60], wind: -60}},
    ch1_sky:      {light: `night`, motes: {n: 10}},
    ch1_munchkin: {light: `road`, petals: {n: 16, col: [`#f2c94c`, `#ffffff`, `#e86a6a`, `#7aa7e0`], size: [4, 7], vy: [10, 20], wind: -6}, glints: {n: 12, band: [.72, .86]}},
    ch1_road:     {light: `sunset`, motes: {n: 14}},
    ch2:        {light: `road`, petals: {n: 10, col: [`#7aa7e0`, `#ffffff`], size: [3, 6], vy: [10, 20], wind: -6}},
    ch2_feast:  {light: `sunset`, petals: {n: 18, col: [`#f2c94c`, `#e86a6a`, `#7aa7e0`, `#ffffff`], size: [3, 6], vy: [12, 22], wind: -4}},
    ch2_corn:   {light: `road`, motes: {n: 16}},
    ch2_rough:  {light: `dim`, motes: {n: 10}},
    ch2_forest: {light: `night`, motes: {n: 10}, stars: {n: 10, band: [0, .2]}},
    ch3:         {light: `road`, glints: {n: 18, band: [.74, .86]}, motes: {n: 10}},
    ch3_tin:     {light: `road`, motes: {n: 22}},
    ch3_thicket: {light: `dim`, petals: {n: 10, col: [`#6aa25a`, `#4f8a4a`], size: [3, 6], vy: [10, 18], wind: -4}},
    ch3_deep:    {light: `dim`, motes: {n: 12}},
    ch4:        {light: `dim`, petals: {n: 12, col: [`#a8823e`, `#8a6a2e`, `#c9a24a`], size: [3, 6], vy: [10, 18], wind: -6}},
    ch4_camp:   {light: `lamp`, motes: {n: 16}, stars: {n: 18, band: [0, .3]}},
    ch4_ditch:  {light: `road`, motes: {n: 10}},
    ch4_bridge: {light: `dim`, motes: {n: 12}},
    ch4_river:  {light: `sunset`, glints: {n: 30, band: [.72, .88]}},
    ch5:        {light: `sunset`, glints: {n: 20, band: [.72, .88]}},
    ch5_river:  {light: `road`, glints: {n: 40, band: [.55, .95]}},
    ch5_bank:   {light: `road`, petals: {n: 14, col: [`#f2c94c`, `#ffffff`, `#b07ad0`], size: [3, 6], vy: [8, 16], wind: -6}},
    ch5_poppy:  {light: `rose`, petals: {n: 30, col: [`#e02a2a`, `#ff5a4a`, `#c81e1e`], size: [4, 8], vy: [6, 14], wind: -4}},
    ch5_meadow: {light: `road`, motes: {n: 14}},
    /*+fx*/
  },

  /* 물건(추억 상자) — 장 대본의 items 로도 더할 수 있음 */
  items: {},

  /* 이름 짓기 기본값 · 보고서에 나오는 이름 목록 */
  names: {},
  nameLabels: [
    {k: `toEm`, ch: 1, what: `엠 아주머니께 보내는 한마디`, free: true},
    {k: `toScarecrow`, ch: 2, what: `허수아비에게 해 주고 싶은 말`, free: true},
    {k: `brainOrHeart`, ch: 3, what: `뇌와 심장, 나의 생각`, free: true},
    {k: `courageIs`, ch: 4, what: `내가 생각하는 진짜 용기`, free: true},
    {k: `toQueen`, ch: 5, what: `들쥐 여왕에게 보내는 감사`, free: true},
    /*+names*/
  ],

  /* 낱말 풀이 (원문 책장·대본에서 점선 밑줄) */
  gloss: {
    "캔자스": `미국 한가운데에 있는 주(州). 끝없이 평평한 들판이 펼쳐진 곳이에요.`,
    "대초원": `나무가 거의 없이 풀만 끝없이 펼쳐진 넓은 들판(프레리)이에요.`,
    "회오리바람": `빙빙 돌며 땅에서 하늘로 솟구치는 아주 센 바람(사이클론, 토네이도)이에요.`,
    "회오리바람 대피 굴": `회오리바람이 오면 숨으려고 땅을 파서 만든 작은 굴이에요.`,
    "먼치킨": `오즈의 동쪽 나라에 사는 키 작은 사람들. 파란색을 좋아해요.`,
    "오즈": `도로시가 회오리바람에 실려 간 신기한 나라, 그리고 그 나라의 위대한 마법사 이름이에요.`,
    "체크무늬": `가로세로 줄이 엇갈려 바둑판처럼 보이는 무늬예요.`,
    "들창문": `바닥이나 지붕에 달려 위로 들어 올려 여는 문이에요.`,
    "들보": `집의 무게를 받치려고 기둥과 기둥 사이에 가로 걸친 굵은 나무예요.`,
    "석판": `얇고 평평한 돌판. 옛날에는 공책 대신 여기에 분필로 글씨를 썼어요.`,
    "문명국": `과학과 제도가 발달한 나라. 북쪽 마녀는 그런 나라에는 마법사가 남아 있지 않다고 믿어요.`,
    "쿼들링": `오즈의 남쪽 나라에 사는 사람들이에요.`,
    "윙키": `오즈의 서쪽 나라에 사는 사람들. 서쪽의 나쁜 마녀에게 지배받고 있어요.`,
    "에메랄드 시": `오즈 나라 한가운데 있는 도시. 위대한 마법사 오즈가 다스려요.`,
    "열기구": `뜨거운 공기를 채운 커다란 풍선에 바구니를 매달아 하늘을 나는 기구예요.`,
    "요람": `아기를 눕혀 살살 흔들어 재우는 작은 침대예요.`,
    "햇빛 가리개 모자": `챙이 넓어 얼굴에 햇빛이 들지 않게 해 주는 천 모자(선보닛)예요.`,
    "들통": `물을 길어 나르는 손잡이 달린 통이에요.`,
    "장대": `길고 굵은 막대기예요.`,
    "허수아비": `새를 쫓으려고 사람 모양으로 만들어 밭에 세워 두는 인형이에요.`,
    "양철": `얇은 철판에 주석을 입혀 녹이 잘 슬지 않게 한 금속판이에요.`,
    "양철공": `양철로 물건을 만들고 고치는 기술자예요.`,
    "마디": `팔꿈치·무릎처럼 굽혔다 폈다 하는 이음 부분이에요.`,
    "칼리다": `몸은 곰 같고 머리는 호랑이 같은 오즈 나라 숲속의 괴물이에요.`,
    "갈기": `사자 목둘레에 난 길고 풍성한 털이에요.`,
    "경첩": `문이나 턱처럼 여닫는 부분을 이어 주는 쇠붙이예요.`,
    "뗏목": `통나무를 나란히 엮어 물에 띄우는 배예요.`,
    "골짜기": `땅이 깊고 길게 파여 들어간 곳이에요.`,
    "양귀비": `빛깔이 아주 고운 꽃. 이야기 속 양귀비 꽃밭은 향기를 맡으면 잠들어 버리는 무서운 곳이에요.`,
    "살쾡이": `고양이보다 크고 사나운 들짐승이에요.`,
    "황새": `다리와 부리가 길고 하얀 큰 새예요.`,
    "수레": `바퀴를 달아 짐을 싣고 끄는 도구예요.`,
    /*+gloss*/
  },

  /* 리포트의 독서 유형 */
  readerTypes: {
    canon: {emoji: `📖`, name: `원작 탐정형`, e: `원작 속 도로시와 친구들의 마음을 정확히 읽어 내는 독자예요. 인물이 왜 그렇게 행동하는지 꼼꼼히 따라가며 읽었어요.`, l: `인물의 성격과 동기를 정확히 읽어 내는 독자입니다. 원작의 흐름을 존중하며 인물들의 선택이 지닌 의미를 따라갔습니다.`},
    imag: {emoji: `✨`, name: `상상 모험가형`, e: `노란 벽돌 길 바깥으로 나만의 샛길을 여러 번 낸 독자예요. 오즈 나라를 더 넓게 상상했어요.`, l: `원작의 빈틈에서 다른 가능성을 상상하며 오즈 나라를 넓혀 간 독자입니다.`},
    bal: {emoji: `🤝`, name: `함께 길 찾기형`, e: `혼자보다 친구와 함께 해결하는 길을 자주 고른 독자예요. 서로의 힘을 알아봐 주었어요.`, l: `혼자 해결하기보다 동료의 힘을 알아보고 함께 길을 찾는 선택을 자주 했습니다. 관계 속에서 문제를 푸는 성숙한 읽기입니다.`}
  },
  endingDesc: {
    canon: {e: `원작 속 도로시가 했던 선택을 거의 그대로 따라갔어요. 도로시의 마음을 정말 잘 읽었어요!`, l: `원작 속 도로시가 걸었던 길을 충실히 따라 결말에 닿았습니다. 인물의 성격을 읽어 내는 눈이 밝은 독자입니다.`},
    imag: {e: `원작과 다른 상상의 길을 많이 골랐어요. 오즈 나라처럼 상상력이 반짝이는 친구예요!`, l: `원작 바깥으로 상상의 샛길을 여러 번 내었습니다. 오즈 나라를 새롭게 그려 내는 독자입니다.`},
    bal: {e: `혼자 하지 않고 친구와 함께 해결하는 길을 골랐어요. 서로의 힘을 알아봐 주는 따뜻한 선택이었어요!`, l: `도로시의 마음과 동료들의 마음 사이에서 함께 해결하는 길을 찾았습니다. 타인의 힘을 알아보는 성숙한 읽기입니다.`}
  },
  feelOk: `💗 도로시의 마음을 잘 읽었어요!`,

  /* 중간·최종 보고서 (대본에서 midReport:true / finalReport:true 인 장 끝에 열림) */
  report: {
    mid: {
      sub: `원작 1장부터 13장까지, 회오리바람에 실려 온 도로시가 세 친구를 만나 서쪽 마녀를 물리치기까지의 이야기`,
      e: [`1~{n}장에서 친구들(허수아비·양철 나무꾼·사자)이 '없다'고 했던 것을 사실은 보여 준 장면을 하나 골라 써 보세요.`,
          `내가 고른 선택 중에 원작과 가장 달랐던 것 하나를 골라 보세요. 왜 그 길을 골랐나요?`,
          `오즈를 다시 만나면 친구들은 정말 원하는 것을 얻을 수 있을까요? 예측해 봐요.`],
      l: [`1~{n}장에서 세 동료가 스스로 '없다'고 믿는 것을 이미 보여 준 장면을 찾아, 원작 문장을 근거로 써 봅시다.`,
          `내가 고른 선택 가운데 원작과 가장 달랐던 것 하나를 골라, 그 선택이 이후 이야기에 어떤 영향을 줄 수 있었을지 써 봅시다.`,
          `오즈와 다시 만났을 때 일어날 일을 근거를 들어 예측해 봅시다.`]
    },
    final: {
      sub: `원작 1장부터 24장까지, 잿빛 캔자스의 소녀가 노란 벽돌 길에서 친구들과 함께 집으로 돌아오기까지의 이야기`,
      e: [`허수아비, 양철 나무꾼, 사자 중 한 명을 골라, 그 친구가 처음부터 가지고 있던 힘이 무엇이었는지 써 보세요.`,
          `도로시는 처음부터 은 구두를 신고 있었어요. 나에게도 '이미 가지고 있는데 몰랐던 힘'이 있을까요?`,
          `도로시에게 친구들은 어떤 사람이었나요? 친구들에게 도로시는요?`,
          `캔자스로 돌아온 도로시에게 편지를 써 보세요.`],
      l: [`세 동료 가운데 한 인물을 골라, 그가 처음부터 지니고 있던 힘이 드러난 장면들을 근거로 '오즈의 선물'의 의미를 분석해 봅시다.`,
          `도로시는 처음부터 집으로 돌아갈 힘(은 구두)을 지니고 있었습니다. 그렇다면 이 여행은 왜 필요했을까요? 나의 생각을 써 봅시다.`,
          `도로시와 동료들의 관계가 각 인물의 변화에 어떤 역할을 했는지 분석해 봅시다.`,
          `캔자스로 돌아온 도로시에게, 여행에서 얻은 것에 대한 편지를 써 봅시다.`]
    }
  }
};
