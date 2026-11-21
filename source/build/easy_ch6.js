/* =========================================================
   쉬운 이야기 6장 · 에메랄드 시 (원작 10~11장)
   ========================================================= */
EASY.push({
  key: `ch6`, num: 6, together: [`scarecrow`, `tinman`, `lion`], bgm: `bgm_ch6.mp3`, title: `에메랄드 시`, orig: `원작 10~11장`, origTitle: `성문 문지기 · 놀라운 오즈의 에메랄드 시`,
  bgKeys: [`ch6`, `ch6_farm`, `ch6_gate`, `ch6_city`, `ch6_room`, `ch6_throne`],
  endings: {
    canon: {title: `초록 수탉이 울 때`, label: `원작 결말`},
    imag:  {title: `초록 달걀의 꿈`, label: `상상 결말`},
    bal:   {title: `넷이 한 약속`, label: `함께 결말`}
  },
  items: {
    greenSpectacles: {ic: `🕶️`, name: `초록 안경`, desc: `성문 문지기가 채워 준 초록 안경. 에메랄드 시에서는 모두 이 안경을 써요.`},
    emerald: {ic: `💎`, name: `에메랄드 한 알`, desc: `초록 거리 바닥에 박혀 반짝이던 보석이에요.`}
  },
  album: [
    {id: `e6_lemonade`, ic: `🍋`, name: `초록 레모네이드`},
    {id: `e6_egg`, ic: `🥚`, name: `초록 달걀의 꿈`},
    {id: `e6_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`네 친구는 오즈를 만날 때 모두 다른 모습을 보았어요. 왜 그랬을까요?`,
        `오즈는 "서쪽 마녀를 없애야 소원을 들어주겠다"고 했어요. 이 말을 들은 친구들의 기분은 어땠을까요?`,
        `내가 오즈에게 부탁하고 싶은 것은 무엇인가요?`],
    l: [`네 친구는 오즈를 만날 때 모두 다른 모습을 보았어요. 왜 그랬을까요?`,
        `오즈는 "서쪽 마녀를 없애야 소원을 들어주겠다"고 했어요. 이 말을 들은 친구들의 기분은 어땠을까요?`,
        `내가 오즈에게 부탁하고 싶은 것은 무엇인가요?`]
  },
  nodes: [
  /* ---------- 초록 농가 ---------- */
  {id: `s1`, bg: `ch6`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `lion`, cam: `out`,
   e: `길가의 울타리와 집이 초록색으로 바뀌었어.\n에메랄드 시가 가까운가 봐!`},
  {bg: `ch6_farm`, w: `farmwife`, f: `dorothy_happy`, o: `farmwife`,
   e: `저녁에 한 농가에서 묵었어.\n아주머니가 맛있는 저녁을 차려 주셨어.`},
  {w: `farmer`, f: `dorothy_surprised`, o: `farmer`,
   e: `"오즈를 만나러 간다고?\n오즈는 아무도 만나 주지 않는단다."`},
  {w: `farmer`, f: `dorothy_surprised`, o: `farmer`,
   e: `"오즈는 새도 되고, 코끼리도 되고, 고양이도 된대.\n진짜 모습은 아무도 몰라."`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `도로시의 마음`, f: `dorothy_sad`, o: `farmer`,
   q: {e: `"오즈는 아무도 안 만나 준대."\n도로시의 마음은 어떨까요?`},
   note: {e: `도로시는 걱정이 되었어요. 하지만 여기까지 왔으니 꼭 만나야 한다고 생각해요.`},
   opts: [
    {type: `feel`, ic: `😟`, ok: 1, eff: {album: `e6_feel`}, e: `걱정되지만 꼭 만나고 싶어요`},
    {type: `feel`, ic: `😆`, e: `너무 웃겨요`},
    {type: `feel`, ic: `🥱`, e: `상관없어요`}
   ]},
  /* ---------- 성문 ---------- */
  {bg: `ch6_gate`, w: `dorothy`, in: 1, f: `dorothy_surprised`, cam: `out`,
   e: `다음 날, 커다란 초록 성문이 나왔어.\n에메랄드가 반짝반짝 박혀 있었어!`},
  {w: `guardian`, f: `dorothy_surprised`, o: `guardian`,
   e: `초록 옷의 문지기가 말했어.\n"이 도시에 들어오려면 초록 안경을 써야 한다."`},
  {w: `guardian`, f: `dorothy_surprised`, o: `guardian`, eff: {item: `greenSpectacles`},
   e: `"안 그러면 눈이 부셔서 안 보이거든."\n문지기가 안경을 채우고 열쇠로 잠갔어.`},
  {t: `choice`, id: `C1`, kind: `act`, label: `초록 안경`, f: `dorothy_dreamy`, o: `guardian`,
   q: {e: `초록 안경을 썼어요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 문지기 말대로 안경을 쓰고 들어가요. 토토도 작은 안경을 썼대요!`},
   opts: [
    {type: `canon`, go: `c1a`, e: `토토도 안경을 쓰고 들어가요`},
    {type: `imag`, go: `c1b`, e: `안경을 살짝 내려서 몰래 봐요`}
   ]},
  {id: `c1a`, w: `toto`, f: `dorothy_happy`, o: `toto`,
   e: `토토도 작은 초록 안경을 썼어.\n너무 귀여워!`},
  {t: `goto`, to: `m1`},
  {id: `c1b`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `guardian`, fx: `dream`,
   e: `안경을 살짝 내려 봤어.\n어? 그런데 열쇠로 잠겨서 안 내려가!`},
  /* ---------- 초록 도시 ---------- */
  {id: `m1`, bg: `ch6_city`, w: `dorothy`, in: 1, f: `dorothy_happy`, cam: `out`, eff: {item: `emerald`},
   e: `와! 집도, 길도, 하늘도 다 초록색이야.\n바닥엔 에메랄드가 반짝였어.`},
  {w: `dorothy`, in: 1, f: `dorothy_happy`,
   e: `초록 옷을 입은 사람들, 초록 사탕, 초록 레모네이드.\n아이들이 사자를 보고 도망갔어.`},
  {t: `choice`, id: `C2`, kind: `act`, label: `초록 거리`, f: `dorothy_happy`, o: `lion`,
   q: {e: `신기한 초록 거리예요.\n도로시는 무엇을 할까요?`},
   note: {e: `원작의 일행은 병사를 따라 곧장 궁전으로 가요. 거리 사람들은 신기한 듯 바라봐요.`},
   opts: [
    {type: `canon`, go: `m2`, e: `곧장 궁전으로 가요`},
    {type: `imag`, go: `c2b`, eff: {album: `e6_lemonade`}, e: `초록 레모네이드를 사 먹어요`}
   ]},
  {id: `c2b`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`, fx: `dream`,
   e: `초록 레모네이드를 한 모금!\n맛은… 그냥 레모네이드 맛이었어.`},
  {id: `m2`, bg: `ch6_room`, w: `soldier`, f: `dorothy_happy`, o: `soldier`,
   e: `초록 수염 병사가 궁전으로 데려갔어.\n"오즈님께 여쭤보겠다."`},
  {w: `greengirl`, f: `dorothy_happy`, o: `greengirl`,
   e: `초록 소녀가 초록 방으로 안내해 주었어.\n초록 침대, 초록 분수, 초록 책!`},
  {t: `name`, id: `N6`, key: `myWish`, free: true, max: 30, label: `내가 오즈에게 부탁하고 싶은 것`, f: `dorothy_dreamy`, o: `greengirl`,
   q: {e: `✍️ 내일 오즈를 만나요.\n내가 오즈에게 부탁한다면 무엇을 부탁할까요?`},
   pick: [`친구랑 사이좋게 지내게 해 주세요`, `용기를 주세요`, `집에 가고 싶어요`],
   ph: `직접 써도 돼요`,
   note: {e: `도로시는 집에 가고 싶다고 부탁할 거예요. 친구들은 뇌, 심장, 용기를 부탁하고요.`}},
  {w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`,
   e: `'{myWish}'.\n나도 마음속으로 소원을 빌었어.`},
  /* ---------- 오즈 ---------- */
  {bg: `ch6_throne`, w: `oz_head`, f: `dorothy_surprised`, o: `oz_head`, cam: `in`,
   e: `다음 날, 나 혼자 알현실에 들어갔어.\n왕좌 위에 커다란 머리가 떠 있었어!`},
  {w: `oz_head`, f: `dorothy_surprised`, o: `oz_head`,
   e: `"나는 위대하고 무시무시한 오즈다.\n너는 누구냐?"`},
  {w: `dorothy`, in: 1, f: `dorothy_brave`, o: `oz_head`,
   e: `"저는 작고 순한 도로시예요.\n캔자스 집으로 보내 주세요."`},
  {w: `oz_head`, f: `dorothy_sad`, o: `oz_head`, cam: `shake`,
   e: `"서쪽의 나쁜 마녀를 없애라.\n그러면 집에 보내 주마."`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `oz_head`,
   e: `"저는 아무도 해치고 싶지 않아요!"\n나는 울면서 나왔어.`},
  {w: `scarecrow`, f: `dorothy_surprised`, o: `oz_lady`,
   e: `허수아비가 갔을 땐 아름다운 숙녀가 있었대.\n"마녀를 없애면 뇌를 주마."`},
  {w: `tinman`, f: `dorothy_surprised`, o: `oz_beast`,
   e: `나무꾼은 무시무시한 괴물을 봤대.\n"마녀를 없애면 심장을 주마."`},
  {w: `lion`, f: `dorothy_surprised`, o: `oz_fire`,
   e: `사자는 활활 타는 불덩이를 봤대.\n"마녀를 없애면 용기를 주마."`},
  {t: `choice`, id: `C3`, kind: `predict`, label: `오즈의 진짜 모습`, f: `dorothy_dreamy`, o: `oz`,
   q: {e: `넷이 모두 다른 모습을 봤어요.\n오즈의 진짜 모습은 무엇일까요?`},
   note: {e: `아직은 아무도 몰라요. 오즈의 진짜 모습은 8장에서 밝혀져요. 기억해 두세요!`},
   opts: [
    {type: `canon`, go: `m3`, e: `아직은 모르겠어요`},
    {type: `imag`, go: `m3`, e: `사실은 작은 생쥐일 거예요!`}
   ]},
  {id: `m3`, bg: `ch6_room`, w: `lion`, f: `dorothy_sad`, o: `lion`,
   e: `"이제 어떻게 하지?"\n우리는 한참 동안 말이 없었어.`},
  {t: `choice`, id: `C4`, kind: `talk`, label: `서쪽으로 갈까`, f: `dorothy_brave`, o: `lion`,
   q: {e: `서쪽 마녀를 찾아가야 할까요?\n도로시는 뭐라고 할까요?`},
   note: {e: `원작에서 넷은 함께 서쪽으로 가기로 해요. 마녀를 없앨 수 있을지는 몰라도, 혼자 가게 둘 수는 없으니까요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `"무섭지만 같이 가 보자."`},
    {type: `imag`, go: `E_pre`, e: `"먼저 맛있는 걸 먹고 생각하자!"`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch6_gate`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `lion`,
   e: `다음 날 아침, 초록 수탉이 울었어.\n우리는 서쪽으로 길을 떠났어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch6_room`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`, fx: `dream`, eff: {album: `e6_egg`},
   e: `초록 달걀 프라이를 먹는 꿈을 꾸었어.\n꿈에서도 다 초록색이었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch6_room`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, eff: {heart: {scarecrow: 1, tinman: 1, lion: 1}},
   e: `우리 넷은 손을 포갰어.\n"누구도 혼자 두지 않기!"`},
  {id: `E_last`, bg: `ch6_gate`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `scarecrow`, cam: `out`,
   e: `서쪽 마녀는 얼마나 무서울까?\n그래도 우리는 넷이야.`},
  {t: `endcard`}
  ]
});
