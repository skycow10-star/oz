/* =========================================================
   쉬운 이야기 9장 · 남쪽으로 가는 길 (원작 17~21장)
   힘 카드: sc_again(알아보기), tm_careful(알아보기), li_spider(자동) / ✨ R1(사자)
   ========================================================= */
EASY.push({
  key: `ch9`, num: 9, together: [`scarecrow`, `tinman`, `lion`], bgm: `bgm_ch9.mp3`, title: `남쪽으로 가는 길`, orig: `원작 17~21장`, origTitle: `열기구 · 남쪽으로 · 싸우는 나무 · 도자기 나라 · 짐승의 왕`,
  bgKeys: [`ch9`, `ch8_throne`, `ch9_trees`, `ch9_china`, `ch9_forest`],
  endings: {
    canon: {title: `숲의 왕의 약속`, label: `원작 결말`},
    imag:  {title: `짐승들의 대관식`, label: `상상 결말`},
    bal:   {title: `왕이 되어도 친구`, label: `함께 결말`}
  },
  items: {
    towel: {ic: `🧺`, name: `눈물 닦는 수건`, desc: `우는 나무꾼이 녹슬지 않게 눈물을 닦아 준 수건이에요.`},
    ladder: {ic: `🪜`, name: `나무꾼의 사다리`, desc: `도자기 벽을 넘을 때 쓴 사다리예요.`}
  },
  album: [
    {id: `e9_toto`, ic: `🐶`, name: `토토 찾기 대작전`},
    {id: `e9_crown`, ic: `👑`, name: `짐승들의 대관식`},
    {id: `e9_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`도로시는 약속을 못 지킨 오즈를 용서했어요. 나라면 어떻게 했을까요?`,
        `도자기 공주는 "우리나라에 있을 때가 제일 즐거워"라고 했어요. 내가 가장 편한 곳은 어디인가요?`,
        `선물을 받은 뒤에도 친구들은 길에서 계속 힘을 보여 줬어요. 어떤 장면이 기억에 남나요?`],
    l: [`도로시는 약속을 못 지킨 오즈를 용서했어요. 나라면 어떻게 했을까요?`,
        `도자기 공주는 "우리나라에 있을 때가 제일 즐거워"라고 했어요. 내가 가장 편한 곳은 어디인가요?`,
        `선물을 받은 뒤에도 친구들은 길에서 계속 힘을 보여 줬어요. 어떤 장면이 기억에 남나요?`]
  },
  nodes: [
  /* ---------- 열기구 ---------- */
  {id: `s1`, bg: `ch8_back`, w: `oz_man`, f: `dorothy_happy`, o: `oz_man`,
   e: `오즈가 말했어. "열기구를 만들어 하늘로 사막을 건너자.\n나도 같이 캔자스에 갈 거야."`},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, o: `oz_man`,
   e: `나는 초록 비단을 한 폭씩 꿰맸어.\n사흘 만에 커다란 초록 열기구가 완성됐어!`},
  {bg: `ch9`, w: `oz_man`, f: `dorothy_happy`, o: `oz_man`, cam: `out`,
   e: `궁전 앞에서 열기구가 부풀어 올랐어.\n"내가 없는 동안 허수아비가 너희를 다스릴 것이다!"`},
  {w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `toto`,
   e: `"어서 오너라, 도로시!"\n그런데 토토가 고양이를 쫓아 사라졌어!`},
  {t: `choice`, id: `C1`, kind: `act`, label: `사라진 토토`, f: `dorothy_surprised`, o: `toto`,
   q: {e: `열기구가 곧 떠나요!\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 토토를 두고 갈 수 없어서 찾으러 가요. 그런데 돌아오기 직전에 밧줄이 끊어져요!`},
   opts: [
    {type: `canon`, go: `m1`, e: `토토를 찾으러 가요`},
    {type: `imag`, go: `c1b`, eff: {album: `e9_toto`}, e: `친구들에게 같이 찾자고 해요`}
   ]},
  {id: `c1b`, w: `lion`, f: `dorothy_brave`, o: `lion`, fx: `dream`,
   e: `사자가 코를 킁킁, 허수아비는 두리번두리번.\n"저기 있어요!"`},
  {id: `m1`, w: `oz_man`, f: `dorothy_sad`, o: `oz_man`, cam: `shake`,
   e: `토토를 안고 달려갔는데… 툭! 밧줄이 끊어졌어.\n열기구가 나를 두고 하늘로 날아갔어.`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `oz_man`, cam: `out`,
   e: `"돌아와요!" "돌아갈 수가 없구나. 잘 있어라!"\n그게 오즈를 본 마지막이었어.`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `도로시의 마음`, f: `dorothy_sad`, o: `toto`,
   q: {e: `집에 갈 기회가 날아가 버렸어요.\n도로시의 마음은 어떨까요?`},
   note: {e: `도로시는 서럽게 울었어요. 그래도 토토를 두고 가지 않은 건 잘한 일이라고 생각했어요.`},
   opts: [
    {type: `feel`, ic: `😢`, ok: 1, eff: {album: `e9_feel`, heart: {toto: 1}}, e: `슬프지만 토토가 있어 다행이에요`},
    {type: `feel`, ic: `😄`, e: `아무렇지 않아요`},
    {type: `feel`, ic: `😡`, e: `토토가 미워요`}
   ]},
  /* ---------- 다음 길 ---------- */
  {bg: `ch8_throne`, w: `tinman`, f: `dorothy_sad`, o: `tinman`, eff: {item: `towel`, heart: {tinman: 1}},
   e: `나무꾼도 울었어. "녹슬지 않게 눈물 좀 닦아 줄래요?"\n나는 수건으로 꼼꼼히 닦아 주었어.`},
  {w: `scarecrow`, f: `dorothy_sad`, o: `monkeyking`,
   e: `허수아비가 생각했어. "날개 원숭이를 불러요!"\n그런데 원숭이들은 이 나라를 떠날 수 없대.`},
  {w: `scarecrow`, f: `dorothy_dreamy`, o: `scarecrow`,
   e: `허수아비가 머리가 불룩해질 만큼 다시 생각했어.\n"병사에게 물어봅시다!"`},
  {t: `choice`, id: `P1`, kind: `power`, label: `다시 생각한 허수아비`, card: `sc_again`, f: `dorothy_dreamy`, o: `scarecrow`,
   q: {e: `💡 첫 생각이 실패해도 다시 생각했어요.\n허수아비가 보여 준 힘은?`},
   note: {e: `실패해도 다시 생각하고, 모르면 물어봐요. 그게 생각하는 힘이에요. 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `🧠`, ok: 1, e: `포기하지 않고 다시 생각하는 힘`},
    {type: `feel`, ic: `👑`, e: `왕이 된 것`}
   ]},
  {w: `soldier`, f: `dorothy_happy`, o: `soldier`,
   e: `"남쪽의 착한 마녀 글린다라면 도와줄지도 몰라요.\n하지만 남쪽 길은 위험하답니다."`},
  {w: `lion`, f: `dorothy_happy`, o: `lion`,
   e: `"우리도 같이 갈게!"\n왕이 된 허수아비도, 나무꾼도, 사자도 말했어.`},
  /* ---------- 싸우는 나무 ---------- */
  {bg: `ch9_trees`, w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`, cam: `shake`,
   e: `숲에 들어가려는데 나뭇가지가 허수아비를 휘감아\n휙! 던져 버렸어.`},
  {t: `choice`, id: `C2`, kind: `act`, label: `길을 막는 나무`, f: `dorothy_surprised`, o: `tinman`,
   q: {e: `나무들이 길을 막아요!\n어떻게 지나갈까요?`},
   note: {e: `원작에서는 나무꾼이 도끼로 가지를 싹둑 잘라요. 그 사이에 모두 지나가요.`},
   opts: [
    {type: `canon`, go: `m2`, e: `나무꾼이 도끼로 길을 열어요`},
    {type: `imag`, go: `c2b`, e: `"나무님, 지나가게 해 주세요!"`}
   ]},
  {id: `c2b`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `tinman`, fx: `dream`,
   e: `나무들은 가지를 더 세게 흔들었어.\n결국 나무꾼이 "죄송해요" 하고 가지를 잘랐어.`},
  {id: `m2`, w: `tinman`, f: `dorothy_brave`, o: `tinman`, cam: `shake`,
   e: `싹둑! 나무가 부르르 떠는 사이\n우리는 모두 무사히 지나갔어.`},
  /* ---------- 도자기 나라 ---------- */
  {bg: `ch9_china`, w: `scarecrow`, f: `dorothy_surprised`, o: `scarecrow`, eff: {item: `ladder`}, cam: `out`,
   e: `사다리로 하얀 벽을 넘었더니… 와!\n작은 도자기 집, 도자기 사람들이 있었어.`},
  {w: `milkmaid`, f: `dorothy_sad`, o: `milkmaid`, cam: `shake`,
   e: `우리 때문에 놀란 도자기 소가\n와장창 넘어져 다리가 부러졌어. "미안해요!"`},
  {w: `tinman`, f: `dorothy_sad`, o: `tinman`,
   e: `나무꾼이 말했어.\n"여기서는 아주 조심해야겠어요. 작은 사람들이 다칠지도 몰라요."`},
  {t: `choice`, id: `P2`, kind: `power`, label: `조심조심 나무꾼`, card: `tm_careful`, f: `dorothy_dreamy`, o: `tinman`,
   q: {e: `💡 나무꾼은 깨지기 쉬운 도자기 사람들을 걱정했어요.\n나무꾼이 보여 준 건?`},
   note: {e: `작고 약한 이웃을 아끼는 마음이에요. 비단 심장을 받기 전부터 나무꾼은 이랬어요. 힘 카드를 얻었어요.`},
   opts: [
    {type: `feel`, ic: `💗`, ok: 1, e: `작은 이웃을 아끼는 마음`},
    {type: `feel`, ic: `🪓`, e: `도끼가 튼튼한 것`}
   ]},
  {w: `chinaprincess`, f: `dorothy_dreamy`, o: `chinaprincess`,
   e: `예쁜 도자기 공주를 만났어.\n"캔자스에 같이 갈래?" "싫어. 여기 우리나라가 제일 좋아."`},
  {t: `choice`, id: `C3`, kind: `talk`, label: `도자기 공주에게`, f: `dorothy_dreamy`, o: `chinaprincess`,
   q: {e: `공주는 자기 나라가 제일 좋대요.\n도로시는 뭐라고 할까요?`},
   note: {e: `원작의 도로시는 "너를 불행하게 하지는 않을게" 하고 작별 인사를 해요. 도로시도 집이 그리우니까 공주 마음을 알았어요.`},
   opts: [
    {type: `canon`, go: `m3`, e: `"알겠어. 잘 있어!"`},
    {type: `imag`, go: `m3`, e: `"그럼 살금살금 놀러 올게!"`}
   ]},
  {t: `name`, id: `m3`, key: `myHome`, free: true, max: 30, label: `내 마음이 가장 편한 곳`, f: `dorothy_dreamy`, o: `chinaprincess`,
   q: {e: `✍️ 공주에게는 자기 나라가 제일 좋대요.\n내 마음이 가장 편한 곳은 어디인가요?`},
   pick: [`우리 집`, `우리 반 교실`, `할머니 댁`],
   ph: `직접 써도 돼요`,
   note: {e: `도로시에게는 캔자스가 그런 곳이에요. 엠 아주머니와 헨리 아저씨가 있으니까요.`}},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, o: `lion`,
   e: `'{myHome}'.\n나도 그곳을 떠올리며 조심조심 도자기 나라를 지나갔어.`},
  /* ---------- 짐승의 왕 ---------- */
  {bg: `ch9_forest`, w: `tiger`, f: `dorothy_surprised`, o: `tiger`,
   e: `큰 숲에 짐승들이 모여 있었어.\n"짐승의 왕이시여! 거미 괴물을 물리쳐 주세요!"`},
  {w: `lion`, f: `dorothy_surprised`, o: `lion`,
   e: `사자의 갈기가 살짝 떨렸어.\n사자는 지금도 무서운 거야.`},
  {t: `choice`, id: `R1`, kind: `recall`, who: `lion`, label: `거미 괴물 앞의 사자에게`, go: `r1`, f: `dorothy_brave`, o: `lion`,
   q: {e: `✨ 사자가 혼자 괴물에게 가려고 해요.\n어떤 카드를 꺼내 보여 줄까요?`},
   note: {e: `사자는 오즈를 만나기 전에도 무서운데 해냈어요. 카드는 그걸 기억나게 해 줄 뿐이에요.`}},
  {id: `r1`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {heart: {lion: 1}},
   e: `"'{lastCard}'…."\n사자가 씩 웃었어. "내 친구들을 잘 돌봐 다오."`},
  {w: `lion`, f: `dorothy_brave`, o: `lion`, cam: `shake`, eff: {card: `li_spider`},
   e: `사자는 잠든 거미의 가느다란 목을 보고\n펄쩍! 단번에 쾅! 괴물을 물리쳤어.`},
  {t: `choice`, id: `C4`, kind: `talk`, label: `숲의 왕의 대답`, f: `dorothy_happy`, o: `lion`,
   q: {e: `짐승들이 사자를 왕으로 모시려 해요.\n사자는 뭐라고 할까요?`},
   note: {e: `원작의 사자는 약속해요. "도로시가 캔자스로 떠나면 돌아와서 너희를 다스리겠다."`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `"도로시가 떠나면 돌아올게."`},
    {type: `imag`, go: `E_pre`, eff: {album: `e9_crown`}, e: `"오늘은 잔치부터 하자!"`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch9_forest`, w: `lion`, f: `dorothy_happy`, o: `tiger`,
   e: `"도로시가 떠나면 돌아와 너희를 다스리겠다."\n겁쟁이라던 사자가 숲의 왕이 되었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch9_forest`, w: `tiger`, f: `dorothy_happy`, o: `tiger`, fx: `dream`,
   e: `코끼리가 나팔을 불고, 새들이 꽃잎을 뿌렸어.\n허수아비가 나뭇잎 왕관을 씌워 주었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch9_forest`, w: `lion`, f: `dorothy_happy`, o: `lion`, eff: {heart: {scarecrow: 1, tinman: 1, lion: 1}},
   e: `"나 혼자 한 게 아니야. 친구들이 있어서 왔어."\n"왕이 되어도 나는 너희 친구야."`},
  {id: `E_last`, bg: `ch9_forest`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `scarecrow`, cam: `out`,
   e: `허수아비는 에메랄드 시의 왕, 사자는 숲의 왕.\n이제 글린다의 성까지 얼마 안 남았어!`},
  {t: `endcard`}
  ]
});
