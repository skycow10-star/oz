/* =========================================================
   쉬운 이야기 10장 · 다시 집으로 (원작 22~24장) + 최종 보고서
   힘 카드: do_shoes(도로시, 알아보기) / ✨ R1(세 친구, 작별)
   ========================================================= */
EASY.push({
  key: `ch10`, num: 10, together: [`scarecrow`, `tinman`, `lion`], midReport: true, finalReport: true, bgm: `bgm_ch10.mp3`, title: `다시 집으로`, orig: `원작 22~24장`, origTitle: `쿼들링의 나라 · 착한 마녀 글린다 · 다시 집으로`,
  bgKeys: [`ch10`, `ch10_red`, `ch10_castle`, `ch10_home`],
  endings: {
    canon: {title: `다시 집에 오니 정말 좋아요`, label: `원작 결말`},
    imag:  {title: `캔자스 하늘의 초록 별`, label: `상상 결말`},
    bal:   {title: `회색 집의 이야기꾼`, label: `함께 결말`}
  },
  items: {
    cookies: {ic: `🍪`, name: `쿼들링 아주머니의 과자`, desc: `빨간 농가 아주머니가 차려 준 케이크와 과자예요.`}
  },
  album: [
    {id: `e10_joke`, ic: `😂`, name: `망치머리를 웃긴 날`},
    {id: `e10_star`, ic: `⭐`, name: `캔자스 하늘의 초록 별`},
    {id: `e10_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`도로시는 첫날 집에 갈 수 있었어요. 그랬다면 친구들은 어떻게 되었을까요?`,
        `허수아비, 나무꾼, 사자가 처음부터 가지고 있던 힘은 무엇이었나요? 카드를 보며 이야기해 봐요.`,
        `내가 이미 가지고 있는데 아직 잘 모르는 힘이 있을까요? 친구에게 물어봐도 좋아요.`],
    l: [`도로시는 첫날 집에 갈 수 있었어요. 그랬다면 친구들은 어떻게 되었을까요?`,
        `허수아비, 나무꾼, 사자가 처음부터 가지고 있던 힘은 무엇이었나요? 카드를 보며 이야기해 봐요.`,
        `내가 이미 가지고 있는데 아직 잘 모르는 힘이 있을까요? 친구에게 물어봐도 좋아요.`]
  },
  nodes: [
  /* ---------- 망치머리 언덕 ---------- */
  {id: `s1`, bg: `ch10`, w: `hammerhead`, f: `dorothy_surprised`, o: `hammerhead`, cam: `shake`,
   e: `바위 언덕에서 팔 없는 사람들이 나왔어.\n목이 쭉 늘어나서 머리로 쾅! 들이받았어.`},
  {w: `lion`, f: `dorothy_sad`, o: `lion`, cam: `shake`,
   e: `허수아비도, 사자도 데굴데굴 굴러떨어졌어.\n"튀어나오는 머리랑은 못 싸워."`},
  {t: `choice`, id: `C1`, kind: `act`, label: `망치머리 언덕`, f: `dorothy_sad`, o: `tinman`,
   q: {e: `힘으로는 못 이겨요.\n어떻게 언덕을 넘을까요?`},
   note: {e: `원작에서는 나무꾼이 생각해 내요. "날개 원숭이를 불러요! 한 번 더 부를 수 있잖아요."`},
   opts: [
    {type: `canon`, go: `m1`, e: `날개 원숭이를 불러요`},
    {type: `imag`, go: `c1b`, eff: {album: `e10_joke`}, e: `웃긴 이야기를 해 줘요`}
   ]},
  {id: `c1b`, w: `hammerhead`, f: `dorothy_dreamy`, o: `hammerhead`, fx: `dream`,
   e: `망치머리들이 깔깔 웃었지만 길은 안 열렸어.\n나무꾼이 속삭였어. "원숭이를 불러요!"`},
  {id: `m1`, bg: `ch8_sky`, w: `monkeyking`, f: `dorothy_happy`, o: `monkeyking`, cam: `up`,
   e: `황금 모자의 마지막 소원!\n원숭이들이 우리를 안고 언덕 너머로 날아갔어.`},
  {bg: `ch10_red`, w: `farmwife`, f: `dorothy_happy`, o: `farmwife`, eff: {item: `cookies`},
   e: `빨간 집, 빨간 다리, 빨간 옷의 쿼들링 나라!\n아주머니가 케이크와 과자를 주셨어.`},
  {w: `quadgirl`, f: `dorothy_happy`, o: `quadgirl`,
   e: `빨간 제복의 소녀 병사가\n글린다의 성으로 안내해 주었어.`},
  /* ---------- 글린다 ---------- */
  {bg: `ch10_castle`, w: `glinda`, f: `dorothy_surprised`, o: `glinda`, cam: `in`,
   e: `루비 왕좌에 아름다운 글린다가 앉아 있었어.\n"무엇을 도와줄까, 얘야?"`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `glinda`,
   e: `"집에 가고 싶어요.\n엠 아주머니가 걱정하실 거예요."`},
  {w: `glinda`, f: `dorothy_happy`, o: `glinda`,
   e: `"방법을 알려 주마.\n대신 황금 모자를 나에게 주렴."`},
  {t: `choice`, id: `C2`, kind: `talk`, label: `황금 모자`, f: `dorothy_happy`, o: `glinda`,
   q: {e: `글린다가 황금 모자를 달래요.\n도로시는 뭐라고 할까요?`},
   note: {e: `원작의 도로시는 "기꺼이요!" 하고 줘요. 글린다는 모자로 친구들을 각자 나라로 보내 주고, 원숭이들을 자유롭게 해 줘요.`},
   opts: [
    {type: `canon`, go: `m2`, e: `"기꺼이요!"`},
    {type: `imag`, go: `m2`, e: `"한 발로 서서 주문 외우는 거 해 보세요!"`}
   ]},
  {id: `m2`, w: `glinda`, f: `dorothy_happy`, o: `scarecrow`,
   e: `글린다가 친구들에게 물었어.\n"도로시가 떠나면 너희는 어떻게 하겠니?"`},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `"에메랄드 시로 돌아갈래요."\n"원숭이들이 데려다줄 거란다. 너는 특별하단다."`},
  {w: `tinman`, f: `dorothy_happy`, o: `tinman`,
   e: `"저는 윙키들에게 갈래요."\n"너는 잘 닦여 있을 때 가장 빛난단다."`},
  {w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `"나는 숲으로 돌아갈래요."\n"원숭이들이 너를 숲에 데려다줄 거야."`},
  {w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `glinda`, cam: `in`,
   e: `"그런데 저는 어떻게 가요?"\n글린다가 내 발을 가리켰어. "그 은 구두가 데려다줄 거란다."`},
  {w: `glinda`, f: `dorothy_surprised`, o: `glinda`,
   e: `"그 힘을 알았다면,\n너는 첫날 바로 집에 갈 수 있었을 거야."`},
  {t: `choice`, id: `P1`, kind: `power`, label: `도로시의 은 구두`, card: `do_shoes`, f: `dorothy_dreamy`, o: `glinda`,
   q: {e: `💡 집으로 가는 힘은 처음부터 도로시 발에 있었어요!\n이건 누구 이야기와 닮았을까요?`},
   note: {e: `허수아비, 나무꾼, 사자처럼 도로시도 처음부터 힘을 가지고 있었어요. 몰랐을 뿐이에요. 도로시의 힘 카드를 얻었어요!`},
   opts: [
    {type: `feel`, ic: `🥈`, ok: 1, e: `처음부터 힘을 가진 세 친구 이야기`},
    {type: `feel`, ic: `🎩`, e: `가짜 마법사 오즈 이야기`}
   ]},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `"하지만 첫날 갔으면 나는 아직 옥수수밭에 있었을 거예요!"\n"저는 녹슬어 있었겠죠." "나는 겁쟁이였을 거야."`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `도로시의 마음`, f: `dorothy_dreamy`, o: `scarecrow`,
   q: {e: `먼 길을 돌아온 도로시.\n도로시의 마음은 어떨까요?`},
   note: {e: `원작의 도로시는 친구들에게 도움이 되어서 기쁘대요. 돌아온 길이 헛되지 않았어요.`},
   opts: [
    {type: `feel`, ic: `🥰`, ok: 1, eff: {album: `e10_feel`, heart: {scarecrow: 1, tinman: 1, lion: 1}}, e: `친구들을 만나서 기뻐요`},
    {type: `feel`, ic: `😤`, e: `괜히 고생해서 억울해요`},
    {type: `feel`, ic: `😐`, e: `아무 느낌 없어요`}
   ]},
  /* ---------- 작별 ---------- */
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `scarecrow`,
   e: `이제 헤어질 시간이야.\n나는 모아 온 카드들을 꺼냈어.`},
  {t: `choice`, id: `R1`, kind: `recall`, who: [`scarecrow`, `tinman`, `lion`], label: `작별할 때 꺼낸 카드`, go: `r1`, f: `dorothy_brave`, o: `scarecrow`,
   q: {e: `✨ 마지막 카드예요.\n친구들이 꼭 기억했으면 하는 카드는?`},
   note: {e: `도로시가 떠나도 카드 속 일은 사라지지 않아요. 친구들이 직접 해낸 일이니까요.`}},
  {id: `r1`, w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, eff: {heart: {scarecrow: 1, tinman: 1, lion: 1}},
   e: `"'{lastCard}'."\n"이 카드는 도로시가 가져가요. 우리는 기억하니까요."`},
  {t: `name`, id: `N10`, key: `farewell`, free: true, max: 30, label: `세 친구에게 하는 마지막 인사`, f: `dorothy_sad`, o: `lion`,
   q: {e: `✍️ 허수아비, 나무꾼, 사자에게\n마지막 인사를 해 주세요.`},
   pick: [`너희는 처음부터 멋졌어`, `잊지 않을게`, `고마워, 사랑해`],
   ph: `직접 써도 돼요`,
   note: {e: `원작의 도로시는 친구들을 한 명씩 꼭 안아 주며 함께 울어요.`}},
  {w: `lion`, f: `dorothy_sad`, o: `lion`,
   e: `"'{farewell}'"\n나는 사자, 나무꾼, 허수아비를 차례로 꼭 안았어.`},
  {t: `choice`, id: `C3`, kind: `act`, label: `세 번 딱딱딱`, f: `dorothy_brave`, o: `toto`,
   q: {e: `토토를 안고 뒤꿈치를 세 번 부딪쳐요.\n도로시는 뭐라고 말할까요?`},
   note: {e: `원작의 도로시는 외쳐요. "엠 아주머니에게 데려다줘!" 도로시에게 집은 사랑하는 사람이 있는 곳이었어요.`},
   opts: [
    {type: `canon`, go: `C4x`, e: `"엠 아주머니에게 데려다줘!"`},
    {type: `imag`, go: `C4x`, eff: {album: `e10_star`}, e: `"집으로! 친구들 꿈도 꾸게 해 줘!"`}
   ]},
  {id: `C4x`, t: `choice`, kind: `predict`, label: `캔자스에 도착하면`, f: `dorothy_dreamy`, o: `toto`,
   q: {e: `휘이잉! 바람이 불어요.\n은 구두는 어떻게 될까요?`},
   note: {e: `원작에서 은 구두는 날아오다가 사막에 떨어져 영영 사라져요. 도로시는 양말만 신고 캔자스에 도착해요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `사막에 떨어져 사라져요`},
    {type: `imag`, go: `E_pre`, e: `도로시 방에 반짝이며 남아요`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch10_home`, w: `em`, f: `dorothy_happy`, o: `em`, cam: `shake`,
   e: `세 걸음 만에 캔자스! 은 구두는 사라졌어.\n"엠 아주머니! 다시 집에 오니 정말 좋아요!"`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch10_home`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `em`, fx: `dream`,
   e: `그날 밤 회색 하늘에 초록 별이 반짝였어.\n꿈속에서 친구들이 손을 흔들었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch10_home`, w: `henry`, f: `dorothy_happy`, o: `henry`,
   e: `저녁 식탁에서 친구들 이야기를 들려주었어.\n헨리 아저씨가 크게 웃었어. 회색 집이 따뜻해졌어.`},
  {id: `E_last`, bg: `ch10_home`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `toto`, cam: `out`, cards: [`scarecrow`, `tinman`, `lion`, `dorothy`], cardsTitle: `처음부터 가지고 있던 힘`,
   e: `은 구두는 사라졌지만 카드는 남았어.\n생각, 마음, 용기, 집으로 가는 힘. 모두 처음부터 우리 안에 있었어.`},
  {t: `endcard`}
  ]
});
