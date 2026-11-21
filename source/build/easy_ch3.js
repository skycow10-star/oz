/* =========================================================
   쉬운 이야기 3장 · 녹슨 나무꾼 (원작 5장)
   힘 카드: tm_path(알아보기)
   ========================================================= */
EASY.push({
  key: `ch3`, num: 3, together: [`scarecrow`], bgm: `bgm_ch3.mp3`, title: `녹슨 나무꾼`, orig: `원작 5장`, origTitle: `양철 나무꾼을 구하다`,
  bgKeys: [`ch3`, `ch3_tin`, `ch3_thicket`, `ch3_deep`],
  endings: {
    canon: {title: `거의 빈 바구니`, label: `원작 결말`},
    imag:  {title: `숲속 열매 잔치`, label: `상상 결말`},
    bal:   {title: `셋이 나눈 걱정`, label: `함께 결말`}
  },
  items: {
    oilCan: {ic: `🛢️`, name: `기름통`, desc: `나무꾼의 오두막에 있던 기름통. 녹슨 마디에 기름을 쳐 주었어요.`}
  },
  album: [
    {id: `e3_song`, ic: `🎶`, name: `양철 북 노래`},
    {id: `e3_fruit`, ic: `🍎`, name: `숲속 열매 따기`},
    {id: `e3_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`나무꾼은 "심장이 없다"고 했어요. 그런데 나무꾼이 한 일 중에 따뜻했던 건 무엇인가요?`,
        `허수아비는 뇌, 나무꾼은 심장을 원해요. 나라면 무엇을 고를까요?`,
        `꼼짝 못 하는 사람을 보면 나는 어떻게 도울 수 있을까요?`],
    l: [`나무꾼은 "심장이 없다"고 했어요. 그런데 나무꾼이 한 일 중에 따뜻했던 건 무엇인가요?`,
        `허수아비는 뇌, 나무꾼은 심장을 원해요. 나라면 무엇을 고를까요?`,
        `꼼짝 못 하는 사람을 보면 나는 어떻게 도울 수 있을까요?`]
  },
  nodes: [
  /* ---------- 신음 소리 ---------- */
  {id: `s1`, bg: `ch3`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `scarecrow`, cam: `out`,
   e: `아침에 맑은 샘에서 세수를 했어.\n허수아비는 먹지 않아도 괜찮대.`},
  {bg: `ch3_tin`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `scarecrow`,
   e: `그때 숲에서 "끄으응…" 소리가 들렸어.\n누가 아픈가 봐!`},
  {w: `tinman`, f: `dorothy_surprised`, o: `tinman`, cam: `in`,
   e: `큰 나무 옆에 양철로 된 사람이 서 있었어.\n도끼를 든 채 꼼짝도 못 하고 있었어.`},
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`,
   e: `"녹이 슬어서 움직일 수가 없어요.\n오두막에 기름통이 있어요…."`},
  {t: `choice`, id: `C1`, kind: `act`, label: `녹슨 나무꾼`, f: `dorothy_surprised`, o: `tinman`,
   q: {e: `나무꾼이 꼼짝 못 해요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 얼른 오두막에 가서 기름통을 가져와요. 그리고 마디마다 기름을 쳐 줘요.`},
   opts: [
    {type: `canon`, go: `c1a`, eff: {heart: {tinman: 1}}, e: `기름통을 가져와요`},
    {type: `imag`, go: `c1b`, eff: {album: `e3_song`}, e: `양철 몸을 북처럼 두드려 노래해요`}
   ]},
  {id: `c1a`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `tinman`, eff: {item: `oilCan`},
   e: `나는 오두막으로 달려가 기름통을 가져왔어.\n"어디부터 칠해 줄까요?"`},
  {t: `goto`, to: `m1`},
  {id: `c1b`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `tinman`, fx: `dream`,
   e: `통통통! 양철 북 소리가 숲에 울렸어.\n나무꾼이 웃고 싶은데 입이 안 움직였어. 얼른 기름통을 가져왔지!`},
  {id: `m1`, w: `tinman`, f: `dorothy_happy`, o: `tinman`, eff: {item: `oilCan`},
   e: `목부터, 팔, 다리까지 기름을 쳤어.\n끼익… 나무꾼이 움직였어!`},
  {w: `tinman`, f: `dorothy_happy`, o: `tinman`, cam: `in`,
   e: `"고마워요! 일 년 동안 여기 서 있었어요.\n당신들이 없었으면 영영 서 있었을 거예요."`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `나무꾼의 마음`, f: `dorothy_happy`, o: `tinman`,
   q: {e: `일 년 만에 움직이게 된 나무꾼.\n나무꾼의 마음은 어떨까요?`},
   note: {e: `나무꾼은 정말 고맙고 기뻤어요. 그리고 일 년 동안 혼자라서 많이 외로웠을 거예요.`},
   opts: [
    {type: `feel`, ic: `🥹`, ok: 1, eff: {album: `e3_feel`, heart: {tinman: 1}}, e: `고맙고 기뻐요`},
    {type: `feel`, ic: `😒`, e: `귀찮아요`},
    {type: `feel`, ic: `😨`, e: `무서워요`}
   ]},
  /* ---------- 나무꾼의 이야기 ---------- */
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`,
   e: `"나는 원래 사람이었어요.\n먼치킨 아가씨를 사랑했지요."`},
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`,
   e: `"그런데 나쁜 마녀가 내 도끼에 마법을 걸었어요.\n다칠 때마다 몸을 양철로 바꿨어요."`},
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`,
   e: `"마지막엔 몸이 다 양철이 되었어요.\n그런데 심장이 없어졌어요."`},
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`,
   e: `"심장이 없으니 사랑할 수가 없어요.\n오즈에게 심장을 부탁하고 싶어요."`},
  {w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `"나는 뇌를 원해요.\n바보는 심장이 있어도 쓸 줄 모르니까요."`},
  {w: `tinman`, f: `dorothy_dreamy`, o: `tinman`,
   e: `"나는 심장이 좋아요.\n뇌는 사람을 행복하게 해 주지 않으니까요."`},
  {t: `name`, id: `N3`, key: `brainOrHeart`, free: true, max: 30, label: `뇌와 심장, 나의 생각`, f: `dorothy_dreamy`, o: `tinman`,
   q: {e: `✍️ 뇌와 심장 중 하나만 고른다면,\n나는 무엇을 고를까요?`},
   pick: [`생각하는 뇌`, `따뜻한 심장`, `둘 다 소중해`],
   ph: `직접 써도 돼요`,
   note: {e: `원작의 도로시는 어느 쪽이 맞는지 모르겠대요. 둘 다 친구가 원하는 걸 얻으면 좋겠다고 생각해요.`}},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, o: `tinman`,
   e: `'{brainOrHeart}'.\n나는 둘 다 원하는 걸 얻었으면 좋겠어.`},
  {t: `choice`, id: `C2`, kind: `talk`, label: `함께 가요`, f: `dorothy_happy`, o: `tinman`,
   q: {e: `나무꾼도 오즈를 만나고 싶대요.\n도로시는 뭐라고 할까요?`},
   note: {e: `원작의 도로시와 허수아비는 기쁘게 말해요. "같이 가요!" 나무꾼은 도끼를 메고 기름통을 챙겨요.`},
   opts: [
    {type: `canon`, go: `m2`, eff: {heart: {tinman: 1}}, e: `"같이 가요!"`},
    {type: `imag`, go: `m2`, e: `"기름통은 내가 들어 줄게요!"`}
   ]},
  {id: `m2`, w: `tinman`, f: `dorothy_happy`, o: `tinman`,
   e: `"비 오면 기름을 꼭 쳐 줘요."\n나무꾼이 기름통을 내 바구니에 넣었어.`},
  /* ---------- 빽빽한 숲 ---------- */
  {bg: `ch3_thicket`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `그런데 나뭇가지가 빽빽해서\n길이 꽉 막혀 버렸어!`},
  {w: `tinman`, f: `dorothy_brave`, o: `tinman`, cam: `shake`,
   e: `나무꾼이 도끼를 들고 앞으로 나갔어.\n쓱싹, 쓱싹! 가지를 잘라 길을 냈어.`},
  {t: `choice`, id: `P1`, kind: `power`, label: `나무꾼의 도끼`, card: `tm_path`, f: `dorothy_happy`, o: `tinman`,
   q: {e: `💡 나무꾼이 모두를 위해 길을 냈어요.\n나무꾼이 보여 준 건 무엇일까요?`},
   note: {e: `자기 혼자가 아니라 친구들 모두가 지나갈 수 있게 길을 냈어요. 친구를 생각하는 따뜻한 마음이에요! 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `💗`, ok: 1, e: `친구들을 생각하는 마음`},
    {type: `feel`, ic: `🪓`, e: `도끼가 날카로운 것`}
   ]},
  {w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `허수아비가 구멍에 또 빠졌어.\n우리는 웃으며 일으켜 주었어.`},
  {t: `choice`, id: `C3`, kind: `act`, label: `숲속 점심`, f: `dorothy_sad`, o: `toto`,
   q: {e: `빵이 얼마 남지 않았어요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 남은 빵을 아껴 먹어요. 허수아비와 나무꾼은 먹지 않아도 되거든요.`},
   opts: [
    {type: `canon`, go: `c3a`, e: `빵을 아껴 먹어요`},
    {type: `imag`, go: `c3b`, eff: {album: `e3_fruit`}, e: `숲에서 열매를 찾아봐요`}
   ]},
  {id: `c3a`, w: `dorothy`, in: 1, f: `dorothy_sad`, o: `toto`,
   e: `나는 빵을 조금만 먹고 토토에게도 나눠 주었어.\n바구니가 점점 가벼워졌어.`},
  {t: `goto`, to: `m3`},
  {id: `c3b`, w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`, fx: `dream`,
   e: `허수아비가 키 큰 나무에서 빨간 열매를 땄어.\n"나는 먹지 않지만, 따는 건 잘해요!"`},
  {id: `m3`, bg: `ch3_deep`, w: `tinman`, f: `dorothy_happy`, o: `tinman`, cam: `out`,
   e: `나무꾼은 개미 한 마리도 밟지 않으려고\n조심조심 걸었어.`},
  {w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `tinman`,
   e: `심장이 없다는데…\n왜 이렇게 다정할까?`},
  {t: `choice`, id: `C4`, kind: `talk`, label: `깊은 숲`, f: `dorothy_dreamy`, o: `scarecrow`,
   q: {e: `숲이 점점 깊어져요.\n도로시는 친구들에게 뭐라고 할까요?`},
   note: {e: `원작에서 일행은 숲속 깊은 곳에서 무서운 소리를 들어요. 하지만 셋이 함께라서 계속 걸어가요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `"계속 걸어가자."`},
    {type: `imag`, go: `E_pre`, e: `"숲 노래를 부르며 가자!"`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch3_deep`, w: `dorothy`, in: 1, f: `dorothy_sad`, o: `toto`,
   e: `바구니에는 빵이 거의 없었어.\n그래도 친구가 둘이나 생겼어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch3_deep`, w: `tinman`, f: `dorothy_happy`, o: `tinman`, fx: `dream`,
   e: `나무꾼이 도끼로 박자를 맞추고,\n허수아비가 춤을 췄어. 숲 노래 잔치야!`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch3_deep`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, eff: {heart: {scarecrow: 1, tinman: 1}},
   e: `"뇌가 없어서 걱정이에요." "심장이 없어서 걱정이에요."\n우리는 서로 걱정을 나누며 걸었어.`},
  {id: `E_last`, bg: `ch3_deep`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `tinman`, cam: `out`,
   e: `그때 숲속에서\n크고 무서운 소리가 들려왔어….`},
  {t: `endcard`}
  ]
});
