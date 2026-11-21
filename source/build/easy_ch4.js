/* =========================================================
   쉬운 이야기 4장 · 겁쟁이 사자 (원작 6~7장)
   힘 카드: tm_beetle(알아보기), li_jump(자동), li_face(알아보기), sc_bridge(자동)
   ========================================================= */
EASY.push({
  key: `ch4`, num: 4, together: [`scarecrow`, `tinman`], bgm: `bgm_ch4.mp3`, title: `겁쟁이 사자`, orig: `원작 6~7장`, origTitle: `겁쟁이 사자 · 위대한 오즈를 찾아가는 길`,
  bgKeys: [`ch4`, `ch4_camp`, `ch4_ditch`, `ch4_bridge`, `ch4_river`],
  endings: {
    canon: {title: `에메랄드 시의 꿈`, label: `원작 결말`},
    imag:  {title: `갈기 위의 별빛 여행`, label: `상상 결말`},
    bal:   {title: `무서운 것 하나씩`, label: `함께 결말`}
  },
  items: {
    lionMane: {ic: `🦁`, name: `사자 갈기 한 가닥`, desc: `골짜기를 뛰어넘을 때 붙잡았던 사자의 갈기. 부드럽고 따뜻했어요.`}
  },
  album: [
    {id: `e4_hug`, ic: `🤗`, name: `토토와 사자의 화해`},
    {id: `e4_star`, ic: `🌟`, name: `모닥불 별 이야기`},
    {id: `e4_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`사자는 "나는 겁쟁이야"라고 했어요. 그런데 골짜기와 칼리다 앞에서 어떻게 했나요?`,
        `나무꾼은 딱정벌레를 밟고 울었어요. 심장이 없다는 나무꾼이 왜 울었을까요?`,
        `내가 생각하는 진짜 용기는 무엇인가요?`],
    l: [`사자는 "나는 겁쟁이야"라고 했어요. 그런데 골짜기와 칼리다 앞에서 어떻게 했나요?`,
        `나무꾼은 딱정벌레를 밟고 울었어요. 심장이 없다는 나무꾼이 왜 울었을까요?`,
        `내가 생각하는 진짜 용기는 무엇인가요?`]
  },
  nodes: [
  /* ---------- 사자 ---------- */
  {id: `s1`, bg: `ch4`, w: `lion`, f: `dorothy_surprised`, o: `lion`, cam: `shake`,
   e: `"어흐흥!"\n커다란 사자가 길로 뛰어나왔어!`},
  {w: `lion`, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `사자가 앞발로 허수아비를 툭 쳐서 넘어뜨렸어.\n나무꾼도 쿵 넘어졌어.`},
  {w: `toto`, f: `dorothy_surprised`, o: `toto`, cam: `shake`,
   e: `토토가 왈왈 짖으며 사자에게 달려갔어.\n사자가 입을 쩍 벌렸어!`},
  {t: `choice`, id: `C1`, kind: `act`, label: `토토를 지켜라`, f: `dorothy_brave`, o: `lion`,
   q: {e: `사자가 토토를 물려고 해요!\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 달려가서 사자 코를 찰싹 때려요. "작은 강아지를 괴롭히다니, 부끄러운 줄 알아!"`},
   opts: [
    {type: `canon`, go: `c1a`, e: `사자 코를 찰싹 때려요`},
    {type: `imag`, go: `c1b`, eff: {album: `e4_hug`}, e: `토토를 안고 "그만!" 외쳐요`}
   ]},
  {id: `c1a`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `lion`, cam: `shake`,
   e: `나는 사자 코를 찰싹 때렸어.\n"작은 강아지를 괴롭히다니, 부끄러운 줄 알아!"`},
  {t: `goto`, to: `m1`},
  {id: `c1b`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `lion`, fx: `dream`,
   e: `나는 토토를 꼭 안고 외쳤어. "그만!"\n사자가 깜짝 놀라 뒤로 물러섰어.`},
  {id: `m1`, w: `lion`, f: `dorothy_surprised`, o: `lion`, cam: `in`,
   e: `사자가 코를 문지르며 울먹였어.\n"안 물었잖아… 아파…."`},
  {w: `lion`, f: `dorothy_sad`, o: `lion`,
   e: `"사실 나는 겁쟁이야.\n무서워서 크게 소리 지르는 거야."`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `사자의 마음`, f: `dorothy_sad`, o: `lion`,
   q: {e: `"나는 겁쟁이야."\n사자의 마음은 어떨까요?`},
   note: {e: `사자는 짐승의 왕인데 겁이 많아서 부끄럽고 슬펐어요. 그래서 일부러 크게 소리를 질렀대요.`},
   opts: [
    {type: `feel`, ic: `😢`, ok: 1, eff: {album: `e4_feel`, heart: {lion: 1}}, e: `부끄럽고 슬퍼요`},
    {type: `feel`, ic: `😁`, e: `재밌어요`},
    {type: `feel`, ic: `😤`, e: `자랑스러워요`}
   ]},
  {w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `"오즈가 나에게 용기를 줄 수 있을까?"\n"같이 가자!" 우리가 말했어.`},
  /* ---------- 딱정벌레 ---------- */
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`,
   e: `그런데 걷다가 나무꾼이\n작은 딱정벌레를 밟고 말았어.`},
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`, cam: `in`,
   e: `나무꾼이 엉엉 울었어.\n눈물 때문에 턱이 녹슬어 버렸어!`},
  {t: `choice`, id: `P1`, kind: `power`, label: `나무꾼의 눈물`, card: `tm_beetle`, f: `dorothy_dreamy`, o: `tinman`,
   q: {e: `💡 심장이 없다는 나무꾼이\n작은 벌레 때문에 울었어요. 왜일까요?`},
   note: {e: `작은 생명도 소중히 여기는 따뜻한 마음! 심장이 없다는 나무꾼은 사실 누구보다 다정해요. 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `💗`, ok: 1, e: `작은 생명도 아끼는 마음`},
    {type: `feel`, ic: `🛢️`, e: `기름이 모자라서`}
   ]},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, o: `tinman`, eff: {heart: {tinman: 1}},
   e: `나는 기름통으로 턱에 기름을 쳐 주었어.\n"이제 조심해서 걸을게요."`},
  /* ---------- 밤 ---------- */
  {bg: `ch4_camp`, w: `lion`, f: `dorothy_happy`, o: `lion`, cam: `out`,
   e: `밤에는 큰 나무 아래 모닥불을 피웠어.\n사자의 털이 따뜻했어.`},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`,
   e: `허수아비는 불이 무서워서\n멀찍이 떨어져 앉았어.`},
  {t: `name`, id: `N4`, key: `courageIs`, free: true, max: 30, label: `내가 생각하는 진짜 용기`, f: `dorothy_dreamy`, o: `lion`,
   q: {e: `✍️ 사자는 용기가 없대요.\n내가 생각하는 진짜 용기는 무엇일까요?`},
   pick: [`무서워도 해 보는 것`, `친구를 지키는 것`, `미안하다고 말하는 것`],
   ph: `직접 써도 돼요`,
   note: {e: `원작의 사자는 무서운 일 앞에서 자주 떨지만, 그래도 친구들을 위해 나서요.`}},
  {w: `lion`, f: `dorothy_dreamy`, o: `lion`,
   e: `"'{courageIs}'…."\n사자가 내 말을 오래 생각했어.`},
  /* ---------- 골짜기 ---------- */
  {bg: `ch4_ditch`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `다음 날, 땅이 쩍 갈라진 깊은 골짜기가 나왔어.\n바닥엔 뾰족한 바위가 가득해!`},
  {w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `허수아비가 생각했어.\n"사자가 우리를 하나씩 태우고 뛰어넘으면 어때요?"`},
  {w: `lion`, f: `dorothy_surprised`, o: `lion`,
   e: `"무섭지만… 해 볼게."\n사자가 몸을 웅크렸어.`},
  {t: `choice`, id: `C2`, kind: `act`, label: `골짜기 뛰어넘기`, f: `dorothy_brave`, o: `lion`,
   q: {e: `사자가 뛰어넘을 거래요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작에서는 허수아비가 먼저 타요. 떨어져도 안 다치니까요. 사자는 무서웠지만 모두를 한 명씩 건네줘요.`},
   opts: [
    {type: `canon`, go: `c2a`, e: `허수아비가 먼저 타요`},
    {type: `imag`, go: `c2b`, e: `"하나, 둘, 셋!" 다 같이 응원해요`}
   ]},
  {id: `c2a`, w: `lion`, f: `dorothy_brave`, o: `lion`, cam: `up`, eff: {item: `lionMane`, card: `li_jump`},
   e: `허수아비, 나, 나무꾼 차례로\n사자가 휙! 휙! 휙! 뛰어넘었어.`},
  {t: `goto`, to: `m2`},
  {id: `c2b`, w: `lion`, f: `dorothy_happy`, o: `lion`, fx: `dream`, cam: `up`, eff: {item: `lionMane`, card: `li_jump`},
   e: `"하나, 둘, 셋!" 응원 소리에 맞춰\n사자가 휙! 휙! 휙! 뛰어넘었어.`},
  {id: `m2`, w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `사자가 헉헉거리며 웃었어.\n"무서웠는데… 해냈어!"`},
  /* ---------- 칼리다 ---------- */
  {bg: `ch4_bridge`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `lion`, cam: `shake`,
   e: `또 골짜기가 나왔어. 이번엔 너무 넓어!\n그때 "크르릉!" 칼리다가 나타났어.`},
  {w: `lion`, f: `dorothy_surprised`, o: `lion`,
   e: `곰 몸에 호랑이 머리를 한 괴물이야.\n사자도 덜덜 떨었어.`},
  {w: `lion`, f: `dorothy_brave`, o: `lion`, cam: `in`,
   e: `그런데 사자가 돌아서서 말했어.\n"내 뒤에 서! 내가 막을게."`},
  {t: `choice`, id: `P2`, kind: `power`, label: `사자의 앞발`, card: `li_face`, f: `dorothy_brave`, o: `lion`,
   q: {e: `💡 무서워서 떨면서도 "내 뒤에 서!"\n사자가 보여 준 건 무엇일까요?`},
   note: {e: `무서운데도 친구들 앞에 섰어요. 무섭지 않은 게 아니라, 무서워도 하는 것. 그게 용기예요! 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `🦁`, ok: 1, e: `무서워도 친구를 지키는 용기`},
    {type: `feel`, ic: `💪`, e: `힘이 센 것`}
   ]},
  {w: `scarecrow`, f: `dorothy_brave`, o: `scarecrow`, eff: {card: `sc_bridge`},
   e: `허수아비가 외쳤어. "나무꾼, 큰 나무를 베어 다리를 만들어요!"\n우리는 나무 다리를 건넜어.`},
  {w: `tinman`, f: `dorothy_surprised`, o: `tinman`, cam: `shake`,
   e: `칼리다가 따라 건너오자\n나무꾼이 다리를 쿵! 끊었어. 휴, 살았다!`},
  /* ---------- 강 ---------- */
  {bg: `ch4_river`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `scarecrow`, cam: `out`,
   e: `숲을 나오니 넓은 강이 있었어.\n강 건너엔 꽃이 가득한 초록 들판!`},
  {t: `choice`, id: `C3`, kind: `predict`, label: `강을 건너려면`, f: `dorothy_dreamy`, o: `scarecrow`,
   q: {e: `강을 어떻게 건널까요?\n원작에서는 어떻게 했을까요?`},
   note: {e: `원작에서는 허수아비가 뗏목을 만들자고 해요. 나무꾼이 통나무를 잘라 뗏목을 만들어요.`},
   opts: [
    {type: `canon`, go: `m3`, e: `뗏목을 만들어요`},
    {type: `imag`, go: `m3`, e: `커다란 연잎을 타요`}
   ]},
  {id: `m3`, w: `tinman`, f: `dorothy_happy`, o: `tinman`,
   e: `나무꾼이 통나무로 뗏목을 만들기 시작했어.\n하지만 해가 져서 내일 건너기로 했어.`},
  {t: `choice`, id: `C4`, kind: `talk`, label: `강가의 밤`, f: `dorothy_dreamy`, o: `lion`,
   q: {e: `내일이면 강을 건너요.\n도로시는 친구들에게 뭐라고 할까요?`},
   note: {e: `원작의 도로시는 에메랄드 시와 오즈를 꿈꾸며 잠들어요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `"오즈를 만나는 꿈을 꾸자."`},
    {type: `imag`, go: `E_pre`, eff: {album: `e4_star`}, e: `"사자 갈기 위에서 별을 보자!"`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch4_river`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`, fx: `dream`,
   e: `나는 반짝이는 초록 도시 꿈을 꾸었어.\n오즈가 나를 집에 보내 주는 꿈.`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch4_camp`, w: `lion`, f: `dorothy_dreamy`, o: `lion`, fx: `dream`, cam: `up`,
   e: `사자 갈기에 누워 별을 보았어.\n갈기가 구름처럼 폭신폭신했어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch4_camp`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {heart: {lion: 1, scarecrow: 1, tinman: 1}},
   e: `"나는 불이 무서워." "나는 녹이 무서워요." "나는 다 무서워."\n우리는 무서운 걸 하나씩 말하고 웃었어.`},
  {id: `E_last`, bg: `ch4_river`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `lion`, cam: `out`,
   e: `겁쟁이라는 사자가 오늘 우리를 두 번이나 구했어.\n정말 겁쟁이일까?`},
  {t: `endcard`}
  ]
});
