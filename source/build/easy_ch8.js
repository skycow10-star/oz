/* =========================================================
   쉬운 이야기 8장 · 위대한 사기꾼 (원작 14~16장)
   힘 카드: sc_learn(알아보기), li_afraid(알아보기) / ✨ 힘 카드 꺼내기 R1(세 친구)
   가짜 선물은 밋밋하게, 진짜 힘은 카드에서
   ========================================================= */
EASY.push({
  key: `ch8`, num: 8, together: [`scarecrow`, `tinman`, `lion`], bgm: `bgm_ch8.mp3`, title: `위대한 사기꾼`, orig: `원작 14~16장`, origTitle: `날개 달린 원숭이 · 오즈의 정체 · 사기꾼의 마법`,
  bgKeys: [`ch8`, `ch8_sky`, `ch8_throne`, `ch8_back`, `ch8_room`],
  endings: {
    canon: {title: `혼자 남은 마법사`, label: `원작 결말`},
    imag:  {title: `선물 자랑 대회`, label: `상상 결말`},
    bal:   {title: `선물보다 먼저 있던 것`, label: `함께 결말`}
  },
  items: {
    newBrains: {ic: `📌`, name: `겨로 만든 새 뇌`, desc: `겨에 핀과 바늘을 섞어 만든 허수아비의 '새 뇌'예요.`},
    silkHeart: {ic: `💚`, name: `비단 심장`, desc: `비단으로 만들고 톱밥을 채운 나무꾼의 '새 심장'이에요.`},
    courage: {ic: `🍶`, name: `초록 병의 '용기'`, desc: `오즈가 접시에 따라 준 마실 것. "용기가 되는 거란다."`}
  },
  album: [
    {id: `e8_ride`, ic: `🐒`, name: `원숭이 하늘길`},
    {id: `e8_toto`, ic: `🐶`, name: `칸막이를 넘어뜨린 토토`},
    {id: `e8_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`오즈는 마법사가 아니었어요. 그런데도 친구들은 선물을 받고 기뻐했어요. 왜 그랬을까요?`,
        `"진짜 용기는 무서울 때 맞서는 것." 내가 무서웠는데도 해낸 일이 있나요?`,
        `도로시는 허수아비에게 "지금 그대로의 네가 좋아"라고 했어요. 내가 친구에게 해 주고 싶은 말은?`],
    l: [`오즈는 마법사가 아니었어요. 그런데도 친구들은 선물을 받고 기뻐했어요. 왜 그랬을까요?`,
        `"진짜 용기는 무서울 때 맞서는 것." 내가 무서웠는데도 해낸 일이 있나요?`,
        `도로시는 허수아비에게 "지금 그대로의 네가 좋아"라고 했어요. 내가 친구에게 해 주고 싶은 말은?`]
  },
  nodes: [
  /* ---------- 길을 잃다 ---------- */
  {id: `s1`, bg: `ch8`, w: `dorothy`, in: 1, f: `dorothy_sad`, o: `toto`, cam: `out`,
   e: `에메랄드 시로 가는 길이 없었어.\n며칠을 걸어도 빨간 꽃 들판뿐이야.`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `scarecrow`,
   e: `우리는 길을 잃었어.\n모두 지쳐서 풀밭에 주저앉았어.`},
  {t: `choice`, id: `C1`, kind: `act`, label: `길 잃은 들판`, f: `dorothy_sad`, o: `toto`,
   q: {e: `모두 지쳤어요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 들쥐 여왕이 준 호루라기를 불어요. 예전에 도와준 친구가 이번엔 도로시를 도와줘요.`},
   opts: [
    {type: `canon`, go: `m1`, e: `들쥐 여왕의 호루라기를 불어요`},
    {type: `imag`, go: `c1b`, e: `사자 등에 올라 멀리 봐요`}
   ]},
  {id: `c1b`, w: `lion`, f: `dorothy_dreamy`, o: `lion`, fx: `dream`,
   e: `사자 등에서 까치발을 들어도 꽃뿐이야.\n사자가 펄쩍 뛰자 호루라기가 삑! 울렸어.`},
  {id: `m1`, w: `mousequeen`, f: `dorothy_surprised`, o: `mousequeen`,
   e: `들쥐 여왕이 달려왔어!\n"황금 모자로 날개 원숭이를 불러요. 데려다줄 거예요."`},
  {w: `dorothy`, in: 1, f: `dorothy_brave`, o: `monkeyking`,
   e: `모자 안에 주문이 있었어.\n"에페, 페페, 카케! 힐로, 홀로, 헬로! 지지, 주지, 직!"`},
  {bg: `ch8_sky`, w: `monkeyking`, f: `dorothy_happy`, o: `monkeyking`, cam: `up`, eff: {album: `e8_ride`},
   e: `원숭이들이 우리를 안고 하늘을 날았어.\n이번엔 아무도 다치지 않았어!`},
  {w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `금방 에메랄드 시에 도착했어.\n"정말 멋진 비행이었어!"`},
  /* ---------- 오즈의 정체 ---------- */
  {bg: `ch8_throne`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `oz`, cam: `in`,
   e: `알현실에 들어갔는데 아무도 없었어.\n목소리만 들렸어. "나는 위대한 오즈다."`},
  {w: `tinman`, f: `dorothy_brave`, o: `oz`,
   e: `"약속을 지켜 주세요!"\n"내일 다시 오너라." 우리는 화가 났어.`},
  {t: `choice`, id: `C2`, kind: `predict`, label: `목소리의 주인`, f: `dorothy_surprised`, o: `lion`,
   q: {e: `사자가 "어흥!" 울부짖어요.\n오즈는 진짜 어디 있을까요?`},
   note: {e: `원작에서 사자 소리에 놀란 토토가 펄쩍 뛰다가 구석의 칸막이를 넘어뜨려요. 그 뒤에 작은 할아버지가 있었어요!`},
   opts: [
    {type: `canon`, go: `m2`, eff: {album: `e8_toto`}, e: `구석 칸막이 뒤에 있어요`},
    {type: `imag`, go: `m2`, e: `천장 위에 거인이 있어요`}
   ]},
  {id: `m2`, w: `toto`, f: `dorothy_surprised`, o: `toto`, cam: `shake`,
   e: `"어흥!" 놀란 토토가 펄쩍 뛰다가\n구석 칸막이를 쿵! 넘어뜨렸어.`},
  {w: `oz_man`, f: `dorothy_surprised`, o: `oz_man`, cam: `in`,
   e: `칸막이 뒤에 머리가 벗어진 작은 할아버지가 있었어.\n"나, 나는 오즈다. 때리지 마라!"`},
  {w: `oz_man`, f: `dorothy_sad`, o: `oz_man`,
   e: `"나는 마법사가 아니야.\n그냥 평범한 사람이야."`},
  {w: `scarecrow`, f: `dorothy_sad`, o: `scarecrow`,
   e: `"당신은 사기꾼이에요!"\n허수아비가 슬프게 말했어.`},
  {w: `oz_man`, f: `dorothy_dreamy`, o: `oz_man`,
   e: `오즈는 원래 열기구를 타던 서커스 사람이었대.\n바람에 날려 이 나라에 왔대.`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `친구들의 마음`, f: `dorothy_sad`, o: `scarecrow`,
   q: {e: `오즈가 가짜 마법사래요.\n친구들의 마음은 어떨까요?`},
   note: {e: `친구들은 실망하고 슬펐어요. 뇌, 심장, 용기를 받으려고 먼 길을 왔으니까요.`},
   opts: [
    {type: `feel`, ic: `😞`, ok: 1, eff: {album: `e8_feel`}, e: `실망하고 슬퍼요`},
    {type: `feel`, ic: `😂`, e: `재밌어요`},
    {type: `feel`, ic: `😌`, e: `편안해요`}
   ]},
  /* ---------- 오즈가 알아본 것 ---------- */
  {w: `oz_man`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `오즈가 허수아비에게 말했어.\n"너는 뇌가 필요 없어. 날마다 무언가를 배우고 있잖니."`},
  {t: `choice`, id: `P1`, kind: `power`, label: `날마다 배우는 허수아비`, card: `sc_learn`, f: `dorothy_dreamy`, o: `scarecrow`,
   q: {e: `💡 허수아비가 이미 가진 건\n무엇일까요?`},
   note: {e: `허수아비는 길에서 늘 새로운 걸 배웠어요. 날마다 배우는 것, 그게 생각하는 힘이에요. 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `🧠`, ok: 1, e: `날마다 배우는 힘`},
    {type: `feel`, ic: `📌`, e: `머리에 꽂을 바늘`}
   ]},
  {w: `oz_man`, f: `dorothy_dreamy`, o: `lion`,
   e: `오즈가 사자에게 말했어.\n"진짜 용기는 무서울 때 맞서는 거란다."`},
  {t: `choice`, id: `P2`, kind: `power`, label: `무서워도 맞서는 사자`, card: `li_afraid`, f: `dorothy_brave`, o: `lion`,
   q: {e: `💡 사자가 이미 가진 용기는\n어떤 용기일까요?`},
   note: {e: `무섭지 않은 게 용기가 아니라, 무서운데도 하는 게 용기예요. 사자는 늘 그랬어요. 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `🦁`, ok: 1, e: `무서워도 친구 앞에 서는 용기`},
    {type: `feel`, ic: `🍶`, e: `약을 마셔야 생기는 용기`}
   ]},
  {w: `oz_man`, f: `dorothy_sad`, o: `oz_man`,
   e: `그래도 친구들은 선물을 원했어.\n"좋다. 내일 오너라." 오즈가 말했어.`},
  /* ---------- 밤 ---------- */
  {bg: `ch8_room`, w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `그날 밤, 친구들은 걱정했어.\n"가짜 마법사가 주는 선물이 진짜일까요?"`},
  {t: `choice`, id: `R1`, kind: `recall`, who: [`scarecrow`, `tinman`, `lion`], label: `선물 전날 밤 꺼낸 카드`, go: `r1`, f: `dorothy_brave`, o: `scarecrow`,
   q: {e: `✨ 친구들이 이미 해낸 일을 보여 주세요!\n어떤 카드를 꺼낼까요?`},
   note: {e: `이 카드들은 오즈의 선물보다 먼저 있었어요. 친구들은 오즈를 만나기 전에 이미 해냈어요.`}},
  {id: `r1`, w: `tinman`, f: `dorothy_happy`, o: `tinman`, eff: {heart: {scarecrow: 1, tinman: 1, lion: 1}},
   e: `"'{lastCard}'…."\n"이건 우리가 오즈를 만나기 전 일이잖아요!"`},
  /* ---------- 가짜 선물 ---------- */
  {bg: `ch8_throne`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `다음 날 허수아비가 말했어.\n"뇌를 받으면 나도 다른 사람들처럼 될 거예요."`},
  {t: `choice`, id: `C3`, kind: `talk`, label: `허수아비에게 한 말`, f: `dorothy_happy`, o: `scarecrow`,
   q: {e: `도로시는 허수아비에게\n뭐라고 말할까요?`},
   note: {e: `원작의 도로시는 말해요. "나는 언제나 지금 그대로의 네가 좋았어."`},
   opts: [
    {type: `canon`, go: `m3`, eff: {heart: {scarecrow: 1}}, e: `"나는 지금 그대로의 네가 좋아."`},
    {type: `imag`, go: `m3`, e: `"새 뇌로 처음 무슨 생각 할 거야?"`}
   ]},
  {id: `m3`, w: `oz_man`, f: `dorothy_dreamy`, o: `scarecrow`, eff: {item: `newBrains`},
   e: `오즈는 허수아비 머리에\n겨와 핀과 바늘을 넣어 주었어.`},
  {w: `oz_man`, f: `dorothy_dreamy`, o: `tinman`, eff: {item: `silkHeart`},
   e: `나무꾼 가슴엔\n비단으로 만든 심장을 넣어 주었어.`},
  {w: `oz_man`, f: `dorothy_dreamy`, o: `lion`, eff: {item: `courage`},
   e: `사자에겐 초록 병에 든 걸 마시게 했어.\n"이게 용기가 될 거란다."`},
  {w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `친구들은 모두 기뻐했어.\n"용기로 가득해요!"`},
  {t: `name`, id: `N8`, key: `toOz`, free: true, max: 30, label: `오즈에게 하고 싶은 말`, f: `dorothy_dreamy`, o: `oz_man`,
   q: {e: `✍️ 가짜 마법사 오즈에게\n하고 싶은 말이 있나요?`},
   pick: [`속인 건 잘못이에요`, `친구들 마음은 알아줬네요`, `이제 솔직하게 살아요`],
   ph: `직접 써도 돼요`,
   note: {e: `원작의 친구들은 오즈가 가짜인 걸 알면서도 선물에 기뻐해요.`}},
  {w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `oz_man`,
   e: `'{toOz}'.\n그런데 정말 선물이 친구들을 바꾼 걸까?`},
  {t: `choice`, id: `C4`, kind: `act`, label: `혼자 남은 오즈`, f: `dorothy_dreamy`, o: `oz_man`,
   q: {e: `알현실에 오즈 혼자 남았어요.\n이제 어떻게 될까요?`},
   note: {e: `원작의 오즈는 혼자 중얼거려요. "셋을 행복하게 하는 건 쉬웠지. 하지만 도로시를 집에 보내는 건…."`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `오즈가 혼자 중얼거려요`},
    {type: `imag`, go: `E_pre`, e: `친구들이 선물 자랑 대회를 열어요`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch8_throne`, w: `oz_man`, f: `dorothy_dreamy`, o: `oz_man`,
   e: `"다들 내가 뭐든 할 수 있다고 믿었지.\n하지만 도로시를 캔자스로 보내는 건 어쩌지?"`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch8_room`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, fx: `dream`,
   e: `허수아비는 수수께끼를 풀고, 나무꾼은 개미 때문에 울고,\n사자는 그림자를 보고도 안 도망갔어. 원래 다 할 수 있던 거잖아!`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch8_room`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {heart: {scarecrow: 1, tinman: 1, lion: 1}},
   e: `우리는 카드를 바닥에 펼쳤어.\n"선물은 오늘 받았는데, 카드는 그 전부터 있었네!"`},
  {id: `E_last`, bg: `ch8_room`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`, cam: `out`, cards: [`scarecrow`, `tinman`, `lion`], cardsTitle: `선물보다 먼저 있던 힘`,
   e: `친구들은 소원을 이루었어.\n이제 남은 건 나 하나. 나는 집에 갈 수 있을까?`},
  {t: `endcard`}
  ]
});
