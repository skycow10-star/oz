/* =========================================================
   쉬운 이야기 7장 · 서쪽 마녀의 성 (원작 12~13장) + 중간 보고서
   힘 카드: sc_bees(알아보기), li_no(자동) / ✨ 힘 카드 꺼내기 R1(사자)
   ========================================================= */
EASY.push({
  key: `ch7`, num: 7, together: [`scarecrow`, `tinman`, `lion`], midReport: true, bgm: `bgm_ch7.mp3`, title: `서쪽 마녀의 성`, orig: `원작 12~13장`, origTitle: `나쁜 마녀를 찾아서 · 구출`,
  bgKeys: [`ch7`, `ch7_castle`, `ch7_kitchen`, `ch7_yard`, `ch7_hall`],
  endings: {
    canon: {title: `노란 나라의 작별`, label: `원작 결말`},
    imag:  {title: `윙키 축제의 밤`, label: `상상 결말`},
    bal:   {title: `다시 넷이 함께`, label: `함께 결말`}
  },
  items: {
    waterBucket: {ic: `🪣`, name: `물 한 동이`, desc: `마녀에게 끼얹은 부엌의 물 양동이. 도로시는 물이 마녀의 약점인 줄 몰랐어요.`},
    goldenCap: {ic: `👑`, name: `황금 모자`, desc: `마녀의 찬장에 있던 예쁜 모자. 어떤 마법이 있는지는 아직 몰라요.`}
  },
  album: [
    {id: `e7_drum`, ic: `🥁`, name: `냄비 북 노래`},
    {id: `e7_party`, ic: `🎉`, name: `윙키 축제`},
    {id: `e7_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`늑대, 까마귀, 벌이 왔을 때 친구들은 각자 어떻게 모두를 지켰나요?`,
        `도로시는 마녀를 없애려고 물을 끼얹은 게 아니었어요. 이 장면을 어떻게 생각하나요?`,
        `망가진 친구를 다시 찾아 고쳐 주었을 때, 친구들의 기분은 어땠을까요?`],
    l: [`늑대, 까마귀, 벌이 왔을 때 친구들은 각자 어떻게 모두를 지켰나요?`,
        `도로시는 마녀를 없애려고 물을 끼얹은 게 아니었어요. 이 장면을 어떻게 생각하나요?`,
        `망가진 친구를 다시 찾아 고쳐 주었을 때, 친구들의 기분은 어땠을까요?`]
  },
  nodes: [
  /* ---------- 서쪽으로 ---------- */
  {id: `s1`, bg: `ch7`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `lion`, cam: `out`,
   e: `서쪽으로 가는 길엔 나무도, 집도 없었어.\n해가 뜨겁게 내리쬐었어.`},
  {bg: `ch7_castle`, w: `witch`, f: `dorothy_surprised`, o: `witch`, cam: `in`,
   e: `서쪽 마녀는 눈이 하나뿐이야.\n그런데 그 눈으로 아주 멀리까지 본대.`},
  {w: `witch`, f: `dorothy_surprised`, o: `witch`, cam: `shake`,
   e: `"내 땅에 들어오다니!"\n마녀가 늑대 마흔 마리를 보냈어.`},
  {t: `choice`, id: `C1`, kind: `predict`, label: `늑대 떼`, f: `dorothy_dreamy`, o: `tinman`,
   q: {e: `밤에 늑대들이 몰려와요!\n누가 막을까요?`},
   note: {e: `원작에서는 나무꾼이 나서요. "이건 제 싸움이에요!" 양철 몸엔 늑대 이빨이 안 들어가거든요.`},
   opts: [
    {type: `canon`, go: `c1a`, e: `나무꾼이 막아요`},
    {type: `imag`, go: `c1b`, e: `사자가 잠꼬대로 "어흥!"`}
   ]},
  {id: `c1a`, w: `tinman`, f: `dorothy_brave`, o: `tinman`, cam: `shake`,
   e: `"이건 제 싸움이에요!"\n나무꾼이 도끼로 늑대들을 모두 물리쳤어.`},
  {t: `goto`, to: `m1`},
  {id: `c1b`, w: `lion`, f: `dorothy_dreamy`, o: `lion`, fx: `dream`, cam: `shake`,
   e: `사자가 잠꼬대로 "어흥!"\n늑대들이 멈칫한 사이 나무꾼이 다 물리쳤어.`},
  {id: `m1`, w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `다음엔 까마귀 떼가 왔어.\n허수아비가 두 팔을 쫙 벌리자 까마귀들이 무서워했어!`},
  {w: `witch`, f: `dorothy_surprised`, o: `witch`, cam: `shake`,
   e: `화가 난 마녀가 이번엔\n검은 벌 떼를 보냈어!`},
  {w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`,
   e: `허수아비가 말했어.\n"내 짚을 꺼내서 도로시랑 토토랑 사자를 덮어요!"`},
  {t: `choice`, id: `P1`, kind: `power`, label: `허수아비의 짚`, card: `sc_bees`, f: `dorothy_surprised`, o: `scarecrow`,
   q: {e: `💡 허수아비가 자기 몸의 짚으로\n친구들을 덮었어요. 허수아비가 보여 준 건?`},
   note: {e: `벌은 짚도 양철도 못 뚫는다는 걸 생각해 냈어요. 그리고 자기 몸을 비워 친구들을 지켰어요. 생각하는 힘이에요! 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `🧠`, ok: 1, e: `친구를 지키는 방법을 생각한 힘`},
    {type: `feel`, ic: `😴`, e: `그냥 쉬고 싶었던 것`}
   ]},
  {w: `tinman`, f: `dorothy_happy`, o: `tinman`,
   e: `벌들은 나무꾼을 쏘다가 침이 다 부러졌어.\n우리는 허수아비에게 짚을 다시 채워 주었어.`},
  /* ---------- 날개 원숭이 ---------- */
  {bg: `ch7_castle`, w: `monkeyking`, f: `dorothy_sad`, o: `monkeyking`, cam: `shake`,
   e: `마녀가 황금 모자로 날개 원숭이들을 불렀어.\n원숭이들이 하늘에서 내려왔어!`},
  {w: `monkeyking`, f: `dorothy_sad`, o: `monkeyking`, cam: `shake`,
   e: `원숭이들이 나무꾼을 바위에 떨어뜨리고,\n허수아비의 짚을 다 빼 버렸어.`},
  {w: `lion`, f: `dorothy_sad`, o: `lion`, cam: `shake`,
   e: `사자는 밧줄에 묶여 마녀의 성으로 끌려갔어.\n친구들이… 다 흩어졌어.`},
  {w: `monkeyking`, f: `dorothy_surprised`, o: `monkeyking`,
   e: `그런데 원숭이들은 내 이마 자국을 보고 멈췄어.\n"이 아이는 해칠 수 없다."`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `도로시의 마음`, f: `dorothy_sad`, o: `toto`,
   q: {e: `친구들이 모두 흩어졌어요.\n도로시의 마음은 어떨까요?`},
   note: {e: `도로시는 너무 슬프고 무서웠어요. 친구들이 어떻게 되었는지 몰랐으니까요.`},
   opts: [
    {type: `feel`, ic: `😭`, ok: 1, eff: {album: `e7_feel`}, e: `슬프고 무서워요`},
    {type: `feel`, ic: `😊`, e: `편안해요`},
    {type: `feel`, ic: `🤩`, e: `신나요`}
   ]},
  /* ---------- 마녀의 성 ---------- */
  {bg: `ch7_kitchen`, w: `witch`, f: `dorothy_sad`, o: `witch`,
   e: `마녀는 나에게 부엌일을 시켰어.\n"냄비를 닦고, 불을 피워라!"`},
  {t: `choice`, id: `C2`, kind: `act`, label: `마녀의 부엌`, f: `dorothy_sad`, o: `witch`,
   q: {e: `마녀가 일을 시켜요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 얌전히 열심히 일해요. 사실 마녀는 이마 자국 때문에 도로시를 해칠 수 없었는데, 도로시는 그걸 몰랐어요.`},
   opts: [
    {type: `canon`, go: `m2`, e: `얌전히 일해요`},
    {type: `imag`, go: `c2b`, eff: {album: `e7_drum`}, e: `냄비를 북처럼 두드리며 노래해요`}
   ]},
  {id: `c2b`, w: `dorothy`, in: 1, f: `dorothy_brave`, fx: `dream`,
   e: `통통, 냄비 북을 치며 노래했어.\n그러니까 조금 덜 무서웠어.`},
  {id: `m2`, bg: `ch7_yard`, w: `witch`, f: `dorothy_sad`, o: `lion`,
   e: `마녀는 사자를 마당에 가두고 밥을 주지 않았어.\n"마구를 차고 내 마차를 끌어라!"`},
  {w: `lion`, f: `dorothy_sad`, o: `lion`,
   e: `밤에 몰래 사자에게 갔어.\n사자는 배가 고파서 힘이 없었어.`},
  {t: `choice`, id: `R1`, kind: `recall`, who: `lion`, label: `사자에게 꺼내 보인 카드`, go: `r1`, f: `dorothy_brave`, o: `lion`,
   q: {e: `✨ 사자가 포기하려고 해요.\n사자가 예전에 해낸 일을 떠올리게 해 줄 카드는?`},
   note: {e: `카드가 사자에게 힘을 주는 게 아니에요. 사자가 이미 해낸 일을 기억하게 해 줄 뿐이에요.`}},
  {id: `r1`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {card: `li_no`, heart: {lion: 1}},
   e: `"'{lastCard}'… 맞아, 나 그때 해냈지."\n다음 날 사자가 마녀에게 말했어. "절대 안 해!"`},
  /* ---------- 은 구두와 물 ---------- */
  {bg: `ch7_kitchen`, w: `witch`, f: `dorothy_surprised`, o: `witch`, cam: `shake`,
   e: `마녀는 내 은 구두가 갖고 싶었어.\n안 보이는 막대로 나를 넘어뜨리고, 구두 한 짝을 빼앗았어!`},
  {w: `witch`, f: `dorothy_brave`, o: `witch`,
   e: `"이제 이 구두는 내 거다! 히히히!"\n마녀가 나를 비웃었어.`},
  {t: `choice`, id: `C3`, kind: `act`, label: `빼앗긴 구두`, f: `dorothy_brave`, o: `witch`,
   q: {e: `구두를 빼앗겼어요!\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 화가 나서 옆에 있던 물 양동이를 마녀에게 끼얹어요. 물이 마녀의 약점인 줄은 몰랐어요!`},
   opts: [
    {type: `canon`, go: `c3a`, e: `물 양동이를 끼얹어요`},
    {type: `imag`, go: `c3b`, e: `"왜 이렇게 못되게 굴어요?" 물어요`}
   ]},
  {id: `c3a`, w: `dorothy`, f: `dorothy_brave`, o: `witch`, eff: {item: `waterBucket`}, cam: `shake`,
   e: `나는 물 양동이를 번쩍 들어\n마녀에게 촤악! 끼얹었어.`},
  {t: `goto`, to: `m3`},
  {id: `c3b`, w: `witch`, f: `dorothy_brave`, o: `witch`, fx: `dream`, eff: {item: `waterBucket`},
   e: `"왜 그래요?" 마녀가 화가 나서 펄쩍 뛰다가\n물 양동이를 걷어찼어. 촤악!`},
  {id: `m3`, w: `witch`, f: `dorothy_surprised`, o: `witch`, cam: `shake`,
   e: `"으악! 내가 녹는다!"\n마녀가 점점 작아지더니… 사라졌어!`},
  {w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `toto`,
   e: `나는 은 구두를 다시 신었어.\n그리고 사자에게 달려갔어. "사자야, 이제 자유야!"`},
  /* ---------- 친구 구하기 ---------- */
  {bg: `ch7_hall`, w: `winkie`, f: `dorothy_happy`, o: `winkie`,
   e: `마녀의 일꾼이던 노란 윙키들도 자유가 되었어.\n윙키들이 만세를 불렀어!`},
  {w: `tinman`, f: `dorothy_happy`, o: `tinman`, eff: {heart: {tinman: 1}},
   e: `윙키들과 함께 찌그러진 나무꾼을 찾아\n망치로 똑딱똑딱 고쳤어.`},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, eff: {heart: {scarecrow: 1}},
   e: `허수아비의 옷도 찾아서\n새 짚을 가득 채웠어. "다시 태어난 것 같아요!"`},
  {t: `name`, id: `N7`, key: `reunion`, free: true, max: 30, label: `다시 만난 친구에게 하고 싶은 말`, f: `dorothy_happy`, o: `scarecrow`,
   q: {e: `✍️ 다시 넷이 모였어요!\n친구들에게 어떤 말을 할까요?`},
   pick: [`다시는 헤어지지 말자`, `보고 싶었어`, `고쳐 줘서 다행이야`],
   ph: `직접 써도 돼요`,
   note: {e: `원작에서 넷은 노란 성에서 며칠 동안 행복하게 지내요.`}},
  {w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `"'{reunion}'"\n친구들이 모두 고개를 끄덕였어.`},
  {w: `winkie`, f: `dorothy_happy`, o: `winkie`, eff: {item: `goldenCap`},
   e: `마녀의 찬장에서 예쁜 황금 모자를 찾았어.\n나는 그냥 예뻐서 썼어.`},
  {t: `choice`, id: `C4`, kind: `talk`, label: `떠나기 전 인사`, f: `dorothy_happy`, o: `winkie`,
   q: {e: `윙키들과 헤어질 시간이에요.\n도로시는 뭐라고 인사할까요?`},
   note: {e: `원작에서는 모두 윙키들과 팔이 아플 때까지 악수를 했대요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `"고마워요!" 악수해요`},
    {type: `imag`, go: `E_pre`, eff: {album: `e7_party`}, e: `"우리 축제해요!"`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch7_hall`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `winkie`,
   e: `팔이 아플 때까지 악수를 했어.\n윙키들이 만세를 세 번 불러 주었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch7_hall`, w: `winkie`, f: `dorothy_happy`, o: `winkie`, fx: `dream`,
   e: `노란 깃발이 펄럭이는 윙키 축제!\n사자는 윙키 아이들을 등에 태워 주었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch7_hall`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {heart: {scarecrow: 1, tinman: 1, lion: 1}},
   e: `"혼자서는 못 했을 거야. 너희가 있어서 버텼어."\n사자가 말했어. 우리 넷은 손을 포갰어.`},
  {id: `E_last`, bg: `ch7`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `scarecrow`, cam: `out`,
   e: `이제 오즈에게 가서 약속을 지켜 달라고 하자!\n내 머리 위에서 황금 모자가 반짝였어.`},
  {t: `endcard`}
  ]
});
