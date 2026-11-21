/* =========================================================
   쉬운 이야기 5장 · 양귀비 꽃밭 (원작 8~9장)
   힘 카드: li_swim(자동), tm_mouse(알아보기), sc_mice(알아보기)
   ========================================================= */
EASY.push({
  key: `ch5`, num: 5, together: [`scarecrow`, `tinman`, `lion`], bgm: `bgm_ch5.mp3`, title: `양귀비 꽃밭`, orig: `원작 8~9장`, origTitle: `죽음의 양귀비 꽃밭 · 들쥐 여왕`,
  bgKeys: [`ch5`, `ch5_river`, `ch5_bank`, `ch5_poppy`, `ch5_meadow`],
  endings: {
    canon: {title: `사자가 깨어나기를`, label: `원작 결말`},
    imag:  {title: `들쥐 왕국의 행진`, label: `상상 결말`},
    bal:   {title: `작은 친구들과의 약속`, label: `함께 결말`}
  },
  items: {
    storkFeather: {ic: `🪶`, name: `황새 깃털`, desc: `강에서 허수아비를 구해 준 황새의 하얀 깃털이에요.`},
    poppy: {ic: `🌺`, name: `양귀비 꽃 한 송이`, desc: `향기를 맡으면 잠이 드는 진홍빛 꽃이에요. 조심!`}
  },
  album: [
    {id: `e5_wave`, ic: `👋`, name: `장대 위 허수아비에게 손 흔들기`},
    {id: `e5_parade`, ic: `🐭`, name: `들쥐 수레 행진`},
    {id: `e5_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`작은 들쥐들이 커다란 사자를 구했어요. 어떻게 할 수 있었을까요?`,
        `나무꾼은 처음 보는 작은 들쥐를 구해 주었어요. 그게 나중에 어떻게 되었나요?`,
        `내가 고마운 사람에게 보내고 싶은 말은 무엇인가요?`],
    l: [`작은 들쥐들이 커다란 사자를 구했어요. 어떻게 할 수 있었을까요?`,
        `나무꾼은 처음 보는 작은 들쥐를 구해 주었어요. 그게 나중에 어떻게 되었나요?`,
        `내가 고마운 사람에게 보내고 싶은 말은 무엇인가요?`]
  },
  nodes: [
  /* ---------- 강 ---------- */
  {id: `s1`, bg: `ch5`, w: `tinman`, f: `dorothy_happy`, o: `tinman`, cam: `out`,
   e: `아침에 뗏목이 다 만들어졌어.\n우리는 뗏목을 타고 강으로 나갔어.`},
  {bg: `ch5_river`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `그런데 물살이 너무 빨라!\n뗏목이 자꾸 떠내려갔어.`},
  {w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `허수아비가 장대를 강바닥에 꽂고 밀었어.\n그런데 장대가 박혀 빠지지 않았어!`},
  {w: `scarecrow`, f: `dorothy_sad`, o: `scarecrow`,
   e: `허수아비는 장대에 매달린 채\n강 한가운데 남고 말았어.`},
  {t: `choice`, id: `C1`, kind: `act`, label: `강 한가운데`, f: `dorothy_sad`, o: `scarecrow`,
   q: {e: `허수아비가 강 한가운데 남았어요!\n도로시는 어떻게 할까요?`},
   note: {e: `원작에서는 사자가 강에 뛰어들어요. 나무꾼이 사자 꼬리를 잡고, 사자가 헤엄쳐서 뗏목을 강가로 끌어가요.`},
   opts: [
    {type: `canon`, go: `c1a`, e: `사자가 헤엄쳐 뗏목을 끌어요`},
    {type: `imag`, go: `c1b`, eff: {album: `e5_wave`}, e: `"꼭 데리러 갈게!" 손을 흔들어요`}
   ]},
  {id: `c1a`, w: `lion`, f: `dorothy_brave`, o: `lion`, cam: `shake`,
   e: `사자가 풍덩 뛰어들었어.\n"내 꼬리를 꽉 잡아!"`},
  {t: `goto`, to: `m1`},
  {id: `c1b`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `scarecrow`, fx: `dream`,
   e: `"허수아비! 꼭 데리러 갈게!"\n그때 사자가 풍덩 뛰어들었어.`},
  {id: `m1`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {card: `li_swim`, heart: {lion: 1}},
   e: `나무꾼이 꼬리를 잡고, 사자가 힘껏 헤엄쳤어.\n뗏목이 강가에 닿았어!`},
  {bg: `ch5_bank`, w: `stork`, f: `dorothy_sad`, o: `stork`,
   e: `그런데 허수아비는 아직 강 한가운데야.\n그때 하얀 황새가 날아왔어.`},
  {w: `stork`, f: `dorothy_happy`, o: `stork`, eff: {item: `storkFeather`},
   e: `"내가 데려올게요.\n짚이라서 가벼울 거예요."`},
  {w: `scarecrow`, f: `dorothy_happy`, o: `scarecrow`, cam: `in`, eff: {heart: {scarecrow: 1}},
   e: `황새가 허수아비를 발로 잡고 날아왔어!\n허수아비가 기뻐서 춤을 추었어.`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `허수아비의 마음`, f: `dorothy_happy`, o: `scarecrow`,
   q: {e: `다시 친구들에게 돌아온 허수아비.\n허수아비의 마음은 어떨까요?`},
   note: {e: `허수아비는 영영 장대에 매달려 있을까 봐 무서웠어요. 다시 친구들을 만나서 정말 기뻤어요.`},
   opts: [
    {type: `feel`, ic: `🥳`, ok: 1, eff: {album: `e5_feel`, heart: {scarecrow: 1}}, e: `안심되고 기뻐요`},
    {type: `feel`, ic: `😑`, e: `심심해요`},
    {type: `feel`, ic: `😠`, e: `화나요`}
   ]},
  /* ---------- 양귀비 꽃밭 ---------- */
  {bg: `ch5_poppy`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, cam: `out`,
   e: `빨간 양귀비 꽃이 끝없이 피어 있었어.\n향기가 아주 진했어.`},
  {w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`, fx: `dream`, eff: {item: `poppy`},
   e: `눈이 점점 감겼어.\n나랑 토토는 꽃밭에 스르르 쓰러져 잠들었어.`},
  {w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `허수아비가 말했어. "이 꽃 향기를 맡으면 잠이 들어요!\n빨리 데리고 나가야 해요."`},
  {w: `lion`, f: `dorothy_dreamy`, o: `lion`,
   e: `"나는 먼저 뛰어갈게!"\n사자가 달려갔어.`},
  {w: `tinman`, f: `dorothy_dreamy`, o: `tinman`,
   e: `허수아비와 나무꾼은 꽃 향기에 잠들지 않아.\n둘이 나와 토토를 안고 꽃밭을 나갔어.`},
  {w: `lion`, f: `dorothy_dreamy`, o: `lion`, cam: `in`,
   e: `그런데 꽃밭 끝에서\n사자가 잠들어 쓰러져 있었어!`},
  {w: `tinman`, f: `dorothy_dreamy`, o: `tinman`,
   e: `사자는 너무 무거워서 들 수가 없었어.\n"미안해, 사자야…."`},
  /* ---------- 들쥐 여왕 ---------- */
  {bg: `ch5_meadow`, w: `mousequeen`, f: `dorothy_dreamy`, o: `mousequeen`, cam: `shake`,
   e: `그때 작은 들쥐가 달려왔어.\n사나운 살쾡이가 쫓아오고 있었어!`},
  {w: `tinman`, f: `dorothy_dreamy`, o: `tinman`, cam: `shake`,
   e: `나무꾼은 생각할 틈도 없이 도끼를 휘둘렀어.\n들쥐가 살았어!`},
  {t: `choice`, id: `P1`, kind: `power`, label: `나무꾼과 들쥐`, card: `tm_mouse`, f: `dorothy_dreamy`, o: `tinman`,
   q: {e: `💡 나무꾼은 처음 보는 작은 들쥐를 구했어요.\n나무꾼이 보여 준 건 무엇일까요?`},
   note: {e: `작고 약한 생명을 그냥 두지 못하는 따뜻한 마음이에요! 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `💗`, ok: 1, e: `작은 생명을 지키는 마음`},
    {type: `feel`, ic: `🪓`, e: `도끼질을 잘하는 것`}
   ]},
  {w: `mousequeen`, f: `dorothy_happy`, o: `mousequeen`,
   e: `"고마워요! 나는 들쥐 여왕이에요.\n무엇이든 도와줄게요."`},
  {w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `허수아비가 머리를 톡톡 두드렸어.\n"좋은 생각이 났어요!"`},
  {t: `choice`, id: `P2`, kind: `power`, label: `허수아비의 작전`, card: `sc_mice`, f: `dorothy_dreamy`, o: `scarecrow`,
   q: {e: `💡 "나무 수레에 사자를 태우고,\n들쥐 수천 마리가 끌면 돼요!" 허수아비가 보여 준 건?`},
   note: {e: `작은 들쥐들이 힘을 모으면 큰 사자도 옮길 수 있다는 걸 생각해 냈어요. 생각하는 힘이에요! 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `🧠`, ok: 1, e: `모두 힘을 모으는 방법을 생각한 힘`},
    {type: `feel`, ic: `🐭`, e: `들쥐가 힘이 센 것`}
   ]},
  {w: `tinman`, f: `dorothy_dreamy`, o: `tinman`,
   e: `나무꾼이 나무로 수레를 뚝딱 만들었어.\n들쥐 수천 마리가 몰려왔어.`},
  {t: `choice`, id: `C2`, kind: `predict`, label: `사자 옮기기`, f: `dorothy_dreamy`, o: `mousequeen`,
   q: {e: `들쥐들이 실로 수레를 끌어요.\n어떻게 될까요?`},
   note: {e: `원작에서 들쥐들은 영차영차 수레를 끌어서 사자를 꽃밭 밖으로 옮겨요. 허수아비와 나무꾼도 뒤에서 밀어요.`},
   opts: [
    {type: `canon`, go: `m2`, e: `영차영차, 사자를 옮겨요`},
    {type: `imag`, go: `c2b`, eff: {album: `e5_parade`}, e: `들쥐들이 노래하며 행진해요`}
   ]},
  {id: `c2b`, w: `mousequeen`, f: `dorothy_dreamy`, o: `mousequeen`, fx: `dream`,
   e: `"찍찍, 영차! 찍찍, 영차!"\n들쥐들이 노래하며 행진했어.`},
  {id: `m2`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {heart: {lion: 1}},
   e: `수레가 꽃밭 밖으로 나왔어.\n사자가 살았어!`},
  {w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `mousequeen`,
   e: `그때 나도 잠에서 깼어.\n"작은 들쥐들이 사자를 구했다고?"`},
  {t: `name`, id: `N5`, key: `toQueen`, free: true, max: 30, label: `들쥐 여왕에게 보내는 감사`, f: `dorothy_happy`, o: `mousequeen`,
   q: {e: `✍️ 들쥐 여왕에게\n어떤 고마운 말을 할까요?`},
   pick: [`우리 사자를 구해 줘서 고마워요`, `작아도 정말 대단해요`, `꼭 다시 만나요`],
   ph: `직접 써도 돼요`,
   note: {e: `원작의 도로시는 들쥐들에게 고맙다고 인사해요. 여왕은 "필요하면 불러요" 하고 말해요.`}},
  {w: `mousequeen`, f: `dorothy_happy`, o: `mousequeen`,
   e: `"'{toQueen}'."\n여왕이 수염을 씰룩이며 웃었어. "필요하면 언제든 불러요."`},
  {t: `choice`, id: `C3`, kind: `act`, label: `사자를 기다리며`, f: `dorothy_happy`, o: `lion`,
   q: {e: `사자는 아직 자고 있어요.\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 사자 곁에서 깨어나기를 기다려요. 과일을 따 먹으며 쉬어요.`},
   opts: [
    {type: `canon`, go: `C4x`, e: `사자 곁에서 기다려요`},
    {type: `imag`, go: `C4x`, e: `들쥐들과 꽃 왕관을 만들어요`}
   ]},
  {id: `C4x`, t: `choice`, kind: `talk`, label: `깨어난 사자에게`, f: `dorothy_happy`, o: `lion`,
   q: {e: `사자가 눈을 떠요!\n도로시는 뭐라고 할까요?`},
   note: {e: `원작의 사자는 깨어나서 깜짝 놀라요. "작은 들쥐들이 나를 구했다고?" 하고요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `"들쥐들이 너를 구했어!"`},
    {type: `imag`, go: `E_pre`, e: `"잘 잤어? 꽃 왕관 써 봐!"`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch5_meadow`, w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `사자가 눈을 떴어.\n"작은 들쥐들이 나를? 고마워라…."`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch5_meadow`, w: `mousequeen`, f: `dorothy_dreamy`, o: `mousequeen`, fx: `dream`,
   e: `들쥐들이 꽃 왕관을 사자 머리에 씌웠어.\n사자가 깨어나 "에취!" 재채기를 했어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch5_meadow`, w: `mousequeen`, f: `dorothy_happy`, o: `mousequeen`, eff: {heart: {tinman: 1, lion: 1}},
   e: `"다음엔 우리가 도와줄게요."\n작은 친구들과 약속했어.`},
  {id: `E_last`, bg: `ch5_meadow`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `lion`, cam: `out`,
   e: `다시 넷이 함께 노란 벽돌 길을 찾았어.\n에메랄드 시가 가까워지고 있어!`},
  {t: `endcard`}
  ]
});
