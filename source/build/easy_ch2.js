/* =========================================================
   쉬운 이야기 2장 · 옥수수밭의 허수아비 (원작 3~4장)
   힘 카드: sc_road(알아보기)
   ========================================================= */
EASY.push({
  key: `ch2`, num: 2, bgm: `bgm_ch2.mp3`, title: `옥수수밭의 허수아비`, orig: `원작 3~4장`, origTitle: `도로시, 허수아비를 구하다 · 숲으로 가는 길`,
  bgKeys: [`ch2`, `ch2_feast`, `ch2_corn`, `ch2_rough`, `ch2_forest`],
  endings: {
    canon: {title: `어둠 속의 길잡이`, label: `원작 결말`},
    imag:  {title: `별자리를 짓는 허수아비`, label: `상상 결말`},
    bal:   {title: `둘이 드는 바구니`, label: `함께 결말`}
  },
  items: {
    breadBasket: {ic: `🧺`, name: `빵 바구니`, desc: `여행길에 먹을 빵이 든 바구니예요.`},
    strawTuft: {ic: `🌾`, name: `허수아비의 지푸라기 한 줌`, desc: `허수아비의 몸에서 빠진 지푸라기. 다시 넣어 주었어요.`}
  },
  album: [
    {id: `e2_dance`, ic: `💃`, name: `먼치킨 잔치의 춤`},
    {id: `e2_crow`, ic: `🐦`, name: `까마귀에게 한 인사`},
    {id: `e2_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`허수아비는 "뇌가 없다"고 했어요. 그런데 길에서 어떤 생각을 해냈나요?`,
        `도로시는 왜 허수아비를 장대에서 내려 주었을까요?`,
        `친구가 넘어졌을 때 나는 어떻게 도와줄 수 있을까요?`],
    l: [`허수아비는 "뇌가 없다"고 했어요. 그런데 길에서 어떤 생각을 해냈나요?`,
        `도로시는 왜 허수아비를 장대에서 내려 주었을까요?`,
        `친구가 넘어졌을 때 나는 어떻게 도와줄 수 있을까요?`]
  },
  nodes: [
  /* ---------- 먼치킨 마을 ---------- */
  {id: `s1`, bg: `ch2`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `toto`, cam: `out`, eff: {item: `breadBasket`},
   e: `나는 빵 바구니를 들고 노란 벽돌 길을 걸었어.\n토토가 앞에서 깡충깡충 뛰었어.`},
  {w: `dorothy`, in: 1, f: `dorothy_happy`,
   e: `길가에 파란 울타리, 파란 집이 있었어.\n먼치킨들은 파란색을 좋아한대.`},
  {bg: `ch2_feast`, w: `boq`, f: `dorothy_happy`, o: `boq`,
   e: `저녁에 부자 먼치킨 보크 아저씨 집에서 잔치가 열렸어.\n"마녀를 없앤 분이 오셨다!"`},
  {t: `choice`, id: `C1`, kind: `act`, label: `먼치킨 잔치`, f: `dorothy_happy`, o: `boq`,
   q: {e: `잔치에 초대받았어요.\n도로시는 무엇을 할까요?`},
   note: {e: `원작의 도로시는 맛있게 저녁을 먹고, 먼치킨들이 춤추는 걸 구경해요.`},
   opts: [
    {type: `canon`, go: `c1a`, e: `맛있게 먹고 춤을 구경해요`},
    {type: `imag`, go: `c1b`, eff: {album: `e2_dance`}, e: `먼치킨들과 같이 춤춰요`}
   ]},
  {id: `c1a`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `boq`,
   e: `나는 맛있는 저녁을 먹었어.\n먼치킨들이 빙글빙글 춤을 추었어.`},
  {t: `goto`, to: `m1`},
  {id: `c1b`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `munchkin`, fx: `dream`,
   e: `나도 먼치킨들 손을 잡고 빙글빙글!\n은 구두가 반짝반짝 빛났어.`},
  {id: `m1`, w: `boq`, f: `dorothy_surprised`, o: `boq`,
   e: `"파란색과 흰색 옷에, 은 구두라니.\n당신은 착한 마녀가 틀림없어요!"`},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, o: `boq`,
   e: `"아니에요, 저는 그냥 평범한 아이예요."\n나는 웃으며 말했어.`},
  /* ---------- 허수아비 ---------- */
  {bg: `ch2_corn`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `toto`, cam: `out`,
   e: `다음 날, 옥수수밭 옆에서 잠깐 쉬었어.\n장대 위에 허수아비가 있었어.`},
  {w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`, cam: `in`,
   e: `그런데 허수아비가 나에게 윙크를 했어!\n"안녕하세요!"`},
  {w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `scarecrow`,
   e: `"말을 할 줄 알아요?"\n"그럼요. 기분이 어떠세요?"`},
  {w: `scarecrow`, f: `dorothy_sad`, o: `scarecrow`,
   e: `"나는 별로예요.\n밤낮으로 여기 매달려서 까마귀만 쫓거든요."`},
  {t: `choice`, id: `C2`, kind: `act`, label: `장대 위의 허수아비`, f: `dorothy_sad`, o: `scarecrow`,
   q: {e: `허수아비가 장대에서 내려가고 싶대요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 두 팔을 뻗어 허수아비를 장대에서 내려 줘요. 짚으로 만들어서 아주 가벼웠어요.`},
   opts: [
    {type: `canon`, go: `c2a`, eff: {heart: {scarecrow: 1}}, e: `두 팔로 장대에서 내려 줘요`},
    {type: `imag`, go: `c2b`, e: `토토에게 장대를 흔들어 보래요`}
   ]},
  {id: `c2a`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `scarecrow`,
   e: `나는 두 팔을 뻗어 허수아비를 내려 주었어.\n짚이라서 아주 가벼웠어.`},
  {t: `goto`, to: `m2`},
  {id: `c2b`, w: `toto`, f: `dorothy_dreamy`, o: `toto`, fx: `dream`,
   e: `토토가 장대를 낑낑 밀었어.\n어림도 없어! 결국 내가 내려 주었어.`},
  {id: `m2`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, cam: `in`,
   e: `"고마워요! 새사람이 된 것 같아요."\n허수아비가 기지개를 켰어.`},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `"어디 가는 길이에요?"\n"에메랄드 시에 오즈를 만나러 가."`},
  {w: `scarecrow`, f: `dorothy_sad`, o: `scarecrow`,
   e: `"나도 데려가 줄래요?\n내 머리엔 짚만 있어요. 뇌가 없어요."`},
  {w: `scarecrow`, f: `dorothy_sad`, o: `scarecrow`,
   e: `"오즈가 나에게 뇌를 주면 좋겠어요.\n바보라는 말을 듣고 싶지 않아요."`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `허수아비의 마음`, f: `dorothy_sad`, o: `scarecrow`,
   q: {e: `"나는 바보예요."\n허수아비의 마음은 어떨까요?`},
   note: {e: `허수아비는 자기가 똑똑하지 않다고 생각해서 속상해요. 사실은 그렇지 않은데 말이에요!`},
   opts: [
    {type: `feel`, ic: `😢`, ok: 1, eff: {album: `e2_feel`, heart: {scarecrow: 1}}, e: `속상하고 쓸쓸해요`},
    {type: `feel`, ic: `😆`, e: `신나요`},
    {type: `feel`, ic: `😡`, e: `화나요`}
   ]},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, o: `scarecrow`, eff: {heart: {scarecrow: 1}},
   e: `"같이 가자!\n오즈에게 같이 부탁하자."`},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `"고마워요! 나는 배도 안 고프고, 피곤하지도 않아요.\n무서운 건 딱 하나, 성냥불뿐이에요."`},
  {t: `name`, id: `N2`, key: `toScarecrow`, free: true, max: 30, label: `허수아비에게 해 주고 싶은 말`, f: `dorothy_happy`, o: `scarecrow`,
   q: {e: `✍️ 새 친구 허수아비에게\n어떤 말을 해 줄까요?`},
   pick: [`넌 바보가 아니야`, `만나서 반가워`, `같이 가서 좋아`],
   ph: `직접 써도 돼요`,
   note: {e: `원작의 도로시는 허수아비를 새 친구로 반갑게 맞아요.`}},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `"'{toScarecrow}'…."\n허수아비가 수줍게 웃었어.`},
  /* ---------- 험한 길 ---------- */
  {bg: `ch2_rough`, w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`, eff: {item: `strawTuft`},
   e: `길이 점점 울퉁불퉁해졌어.\n허수아비가 구멍에 발이 걸려 쿵! 넘어졌어.`},
  {t: `choice`, id: `C3`, kind: `act`, label: `넘어진 허수아비`, f: `dorothy_surprised`, o: `scarecrow`,
   q: {e: `허수아비가 또 넘어졌어요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 허수아비를 일으켜 세워 줘요. 허수아비는 아프지 않다며 웃어요.`},
   opts: [
    {type: `canon`, go: `c3a`, eff: {heart: {scarecrow: 1}}, e: `일으켜 세워 줘요`},
    {type: `imag`, go: `c3b`, eff: {album: `e2_crow`}, e: `날아가는 까마귀에게 길을 물어요`}
   ]},
  {id: `c3a`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `scarecrow`,
   e: `나는 허수아비를 일으켜 주었어.\n"괜찮아요, 하나도 안 아파요!"`},
  {t: `goto`, to: `m3`},
  {id: `c3b`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `scarecrow`, fx: `dream`,
   e: `"까마귀야, 구멍 없는 길 좀 알려 줘!"\n까마귀는 허수아비를 보고 놀라 도망갔어.`},
  {id: `m3`, w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `허수아비가 옛이야기를 해 주었어.\n늙은 까마귀가 말했대. "뇌만 있으면 너도 멋질 텐데."`},
  /* ---------- 어두운 숲 ---------- */
  {bg: `ch2_forest`, w: `dorothy`, in: 1, f: `dorothy_sad`, o: `toto`, cam: `out`,
   e: `해가 지고 깜깜한 숲이 나왔어.\n앞이 하나도 안 보여.`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `scarecrow`,
   e: `"이렇게 깜깜한데 숲을 나갈 수 있을까?"\n나는 무서웠어.`},
  {w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`,
   e: `허수아비가 말했어.\n"길이 숲으로 들어왔으면, 나가는 길도 있을 거예요."`},
  {t: `choice`, id: `P1`, kind: `power`, label: `허수아비의 생각`, card: `sc_road`, f: `dorothy_dreamy`, o: `scarecrow`,
   q: {e: `💡 "들어온 길은 나가게 돼 있어요."\n허수아비가 보여 준 건 무엇일까요?`},
   note: {e: `뇌가 없다던 허수아비가 깜깜한 숲에서 좋은 생각을 해냈어요. 생각하는 힘이에요! 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `🧠`, ok: 1, e: `좋은 생각을 해내는 힘`},
    {type: `feel`, ic: `🌾`, e: `짚이 많은 것`}
   ]},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `허수아비는 어둠 속에서도 잘 보인대.\n내 손을 잡고 앞장서 주었어.`},
  {t: `choice`, id: `C4`, kind: `talk`, label: `어두운 숲길`, f: `dorothy_happy`, o: `scarecrow`,
   q: {e: `허수아비가 앞장서 줘요.\n도로시는 뭐라고 할까요?`},
   note: {e: `원작의 도로시는 허수아비 팔을 잡고 걸어요. 그리고 쉴 곳을 찾아 달라고 부탁해요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `"쉴 곳을 찾으면 알려 줘."`},
    {type: `imag`, go: `E_pre`, e: `"별을 보면서 이름 붙이자!"`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch2_forest`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `허수아비가 작은 오두막을 찾았어.\n나는 토토를 안고 마른 잎 위에서 잠들었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch2_forest`, w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`, fx: `dream`, cam: `up`,
   e: `"저 별 세 개는 '도로시 별'이에요!"\n허수아비가 별마다 이름을 붙였어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch2_forest`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, eff: {heart: {scarecrow: 1}},
   e: `우리는 바구니를 같이 들었어.\n"둘이 드니까 가볍네!"`},
  {id: `E_last`, bg: `ch2_forest`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `scarecrow`, cam: `out`,
   e: `허수아비는 뇌가 없대.\n그런데 오늘 길을 찾은 건 허수아비야.`},
  {t: `endcard`}
  ]
});
