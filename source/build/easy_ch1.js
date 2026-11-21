/* =========================================================
   쉬운 이야기 1장 · 회오리바람 (원작 1~2장)
   - 한 장면에 1~2문장, 짧고 쉬운 말
   - 선택지 2개: 📖 원작(canon) / ✨ 상상(imag)
   - 💗 마음 읽기(kind:`feel`), 보기에서 고르는 말 짓기(pick)
   ========================================================= */
EASY.push({
  key: `ch1`, num: 1, bgm: `bgm_ch1.mp3`, title: `회오리바람`, orig: `원작 1~2장`, origTitle: `회오리바람 · 먼치킨들과의 회의`,
  bgKeys: [`ch1`, `ch1_storm`, `ch1_sky`, `ch1_munchkin`, `ch1_road`],
  endings: {
    canon: {title: `노란 벽돌 길 위로`, label: `원작 결말`},
    imag:  {title: `은 구두의 첫걸음`, label: `상상 결말`},
    bal:   {title: `먼치킨들의 배웅`, label: `함께 결말`}
  },
  items: {
    silverShoes: {ic: `🥈`, name: `은 구두`, desc: `동쪽 마녀가 신던 반짝이는 은 구두예요. 어떤 힘이 있는지는 아직 아무도 몰라요.`},
    kissMark: {ic: `✨`, name: `이마의 반짝이는 자국`, desc: `북쪽 마녀가 입 맞춰 준 자리예요. 이 자국이 있으면 아무도 도로시를 해치지 못해요.`},
    note: {ic: `💌`, name: `엠 아주머니께 보내는 마음`, desc: `내가 고른 한마디: '{toEm}'`}
  },
  album: [
    {id: `e1_bed`, ic: `🛏️`, name: `침대 위의 토토`},
    {id: `e1_fly`, ic: `🌪️`, name: `하늘을 나는 집`},
    {id: `e1_feel`, ic: `💗`, name: `마음 읽기 성공`}
  ],
  talk: {
    e: [`캔자스는 온통 회색이었어요. 그래도 도로시는 왜 집에 가고 싶을까요?`,
        `도로시는 마녀를 해치려고 한 게 아니었어요. 그런데 먼치킨들은 고맙다고 했어요. 도로시의 기분은 어땠을까요?`,
        `처음 보는 곳에서 길을 떠나야 한다면, 나는 무엇을 챙기고 싶나요?`],
    l: [`캔자스는 온통 회색이었어요. 그래도 도로시는 왜 집에 가고 싶을까요?`,
        `도로시는 마녀를 해치려고 한 게 아니었어요. 그런데 먼치킨들은 고맙다고 했어요. 도로시의 기분은 어땠을까요?`,
        `처음 보는 곳에서 길을 떠나야 한다면, 나는 무엇을 챙기고 싶나요?`]
  },
  nodes: [
  /* ---------- 회색 캔자스 ---------- */
  {id: `s1`, bg: `ch1`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `toto`, cam: `out`,
   e: `나는 도로시야.\n캔자스의 넓은 들판에 살아.`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `em`,
   e: `우리 집은 방 하나뿐인 작은 집이야.\n들판도, 집도, 하늘도 다 회색이야.`},
  {w: `em`, f: `dorothy_sad`, o: `em`,
   e: `엠 아주머니는 잘 웃지 않으셔.\n헨리 아저씨도 늘 바쁘셔.`},
  {w: `toto`, f: `dorothy_happy`, o: `toto`,
   e: `그래도 토토가 있어.\n까만 털의 작은 강아지, 내 친구야.`},
  {t: `choice`, id: `F1`, kind: `feel`, label: `도로시의 마음`, f: `dorothy_happy`, o: `toto`,
   q: {e: `회색 집에서 토토와 노는 도로시.\n도로시의 마음은 어떨까요?`},
   note: {e: `원작의 도로시는 토토 덕분에 웃어요. 회색 집에서도 토토는 늘 즐거웠거든요.`},
   opts: [
    {type: `feel`, ic: `😊`, ok: 1, eff: {album: `e1_feel`, heart: {toto: 1}}, e: `토토가 있어서 즐거워요`},
    {type: `feel`, ic: `😠`, e: `화가 나요`},
    {type: `feel`, ic: `😴`, e: `졸려요`}
   ]},
  /* ---------- 회오리바람 ---------- */
  {bg: `ch1_storm`, w: `henry`, f: `dorothy_surprised`, o: `henry`, cam: `shake`,
   e: `"회오리바람이 온다!"\n헨리 아저씨가 외쳤어.`},
  {w: `em`, f: `dorothy_surprised`, o: `em`, cam: `shake`,
   e: `"도로시, 빨리 지하실로!"\n엠 아주머니가 바닥 문을 열었어.`},
  {w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `toto`,
   e: `그런데 토토가 침대 밑으로 숨었어!\n나는 토토를 잡으러 갔어.`},
  {t: `choice`, id: `C1`, kind: `act`, label: `회오리바람`, f: `dorothy_surprised`, o: `toto`,
   q: {e: `바람이 집을 흔들어요!\n도로시는 어떻게 할까요?`},
   note: {e: `원작의 도로시는 토토를 꼭 안아요. 그 순간 집이 붕 떠올라요!`},
   opts: [
    {type: `canon`, go: `c1a`, e: `토토를 꼭 안아요`},
    {type: `imag`, go: `c1b`, eff: {album: `e1_bed`}, e: `토토랑 침대 위로 올라가요`}
   ]},
  {id: `c1a`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `toto`, cam: `shake`,
   e: `나는 토토를 꼭 안았어.\n그때 집이 붕 떠올랐어!`},
  {t: `goto`, to: `m1`},
  {id: `c1b`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`, fx: `dream`, cam: `up`,
   e: `우리는 침대 위로 올라갔어.\n침대가 배처럼 둥실둥실 흔들렸어.`},
  {id: `m1`, bg: `ch1_sky`, w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `toto`, cam: `up`, eff: {album: `e1_fly`},
   e: `집이 하늘로 날아가!\n빙글빙글, 바람 한가운데로.`},
  {w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`,
   e: `처음엔 무서웠어.\n그런데 시간이 지나니 조금 괜찮아졌어.`},
  {w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`,
   e: `나는 토토를 안고 침대에 누웠어.\n그리고 스르르 잠이 들었어.`},
  /* ---------- 먼치킨 나라 ---------- */
  {bg: `ch1_munchkin`, w: `dorothy`, in: 1, f: `dorothy_surprised`, cam: `shake`,
   e: `쿵!\n집이 땅에 내려앉았어.`},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, cam: `out`,
   e: `문을 열었더니… 와!\n초록 풀, 예쁜 꽃, 반짝이는 시냇물!`},
  {w: `munchkin`, f: `dorothy_surprised`, o: `munchkin`,
   e: `파란 옷을 입은 작은 사람들이 왔어.\n먼치킨이래.`},
  {w: `northwitch`, f: `dorothy_surprised`, o: `northwitch`,
   e: `하얀 옷을 입은 할머니도 있었어.\n북쪽의 착한 마녀래.`},
  {w: `northwitch`, f: `dorothy_surprised`, o: `northwitch`,
   e: `"동쪽의 나쁜 마녀를 없애 줘서 고마워요!\n먼치킨들이 이제 자유로워졌어요."`},
  {w: `dorothy`, in: 1, f: `dorothy_surprised`, o: `northwitch`, cam: `in`,
   e: `우리 집 아래에 마녀의 발이 보였어.\n집이 마녀 위에 떨어진 거야!`},
  {t: `choice`, id: `F2`, kind: `feel`, label: `도로시의 마음`, f: `dorothy_surprised`, o: `northwitch`,
   q: {e: `일부러 한 게 아닌데 고맙대요.\n도로시의 마음은 어떨까요?`},
   note: {e: `원작의 도로시는 깜짝 놀라고 당황해요. "저는 아무도 해치지 않았어요!" 하고 말하지요.`},
   opts: [
    {type: `feel`, ic: `😳`, ok: 1, e: `깜짝 놀라고 당황스러워요`},
    {type: `feel`, ic: `😎`, e: `뿌듯하고 자랑스러워요`},
    {type: `feel`, ic: `😂`, e: `웃겨요`}
   ]},
  {w: `northwitch`, f: `dorothy_happy`, o: `northwitch`, eff: {item: `silverShoes`},
   e: `마녀는 사라지고 은 구두만 남았어.\n"이 구두는 이제 네 거란다."`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `northwitch`,
   e: `"고맙습니다.\n그런데 저는 캔자스 집에 가고 싶어요."`},
  {w: `northwitch`, f: `dorothy_sad`, o: `northwitch`,
   e: `"오즈의 나라는 큰 사막에 둘러싸여 있어.\n건너갈 수가 없단다."`},
  {w: `dorothy`, in: 1, f: `dorothy_sad`, o: `toto`,
   e: `나는 울음이 터졌어.\n엠 아주머니가 걱정하실 텐데….`},
  {t: `name`, id: `N1`, key: `toEm`, free: true, max: 30, label: `엠 아주머니께 보내는 한마디`, f: `dorothy_sad`, o: `em`,
   q: {e: `✍️ 엠 아주머니께 마음을 보낸다면,\n어떤 말을 보낼까요?`},
   pick: [`걱정 마세요, 꼭 갈게요`, `보고 싶어요`, `토토랑 잘 있어요`],
   ph: `직접 써도 돼요`,
   note: {e: `원작의 도로시는 엠 아주머니가 걱정하실까 봐 집에 가고 싶어 해요.`}},
  {w: `dorothy`, in: 1, f: `dorothy_brave`, o: `em`, eff: {item: `note`},
   e: `'{toEm}'\n나는 마음속으로 말했어.`},
  /* ---------- 오즈를 찾아서 ---------- */
  {w: `northwitch`, f: `dorothy_surprised`, o: `northwitch`,
   e: `"에메랄드 시에 가렴.\n위대한 마법사 오즈가 도와줄지도 몰라."`},
  {t: `choice`, id: `C4`, kind: `talk`, label: `북쪽 마녀에게`, f: `dorothy_sad`, o: `northwitch`,
   q: {e: `혼자 먼 길을 가야 해요.\n도로시는 마녀에게 뭐라고 할까요?`},
   note: {e: `원작의 도로시는 "같이 가 주시면 안 돼요?" 하고 물어요. 마녀는 같이 갈 수 없지만, 대신 이마에 입을 맞춰 줘요.`},
   opts: [
    {type: `canon`, go: `m4`, e: `"같이 가 주시면 안 돼요?"`},
    {type: `imag`, go: `m4`, e: `"마녀님 모자 한 번만 써 봐도 돼요?"`}
   ]},
  {id: `m4`, w: `northwitch`, f: `dorothy_happy`, o: `northwitch`, eff: {item: `kissMark`}, cam: `in`,
   e: `마녀가 내 이마에 입을 맞췄어.\n이마에 반짝이는 자국이 생겼어.`},
  {w: `northwitch`, f: `dorothy_happy`, o: `northwitch`,
   e: `"이 자국이 있으면 아무도 너를 해치지 못해.\n노란 벽돌 길을 따라가렴."`},
  {t: `choice`, id: `C2`, kind: `predict`, label: `떠날 준비`, f: `dorothy_brave`, o: `toto`,
   q: {e: `먼 길을 떠나요.\n원작의 도로시는 무엇을 했을까요?`},
   note: {e: `원작의 도로시는 깨끗한 원피스로 갈아입고, 빵을 바구니에 담고, 은 구두를 신어요.`},
   opts: [
    {type: `canon`, go: `c2a`, e: `빵을 챙기고 은 구두를 신어요`},
    {type: `imag`, go: `c2b`, e: `토토에게 지도를 그려 달래요`}
   ]},
  {id: `c2a`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `toto`,
   e: `나는 빵을 바구니에 담았어.\n그리고 은 구두를 신었어. 딱 맞았어!`},
  {t: `goto`, to: `m2`},
  {id: `c2b`, w: `toto`, f: `dorothy_dreamy`, o: `toto`, fx: `dream`,
   e: `토토가 발로 땅에 쓱쓱 그림을 그렸어.\n꼬불꼬불, 노란 길 그림이야!`},
  {w: `dorothy`, in: 1, f: `dorothy_happy`, o: `toto`,
   e: `나는 웃으며 빵을 챙기고,\n은 구두를 신었어.`},
  {id: `m2`, bg: `ch1_road`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `toto`, cam: `out`,
   e: `노란 벽돌 길이 저 멀리까지 이어져 있어.\n"가자, 토토!"`},
  {t: `choice`, id: `C3`, kind: `act`, label: `첫걸음`, f: `dorothy_brave`, o: `munchkin`,
   q: {e: `먼치킨들이 손을 흔들어요.\n도로시는 어떻게 출발할까요?`},
   note: {e: `원작의 도로시는 씩씩하게 걸어가요. 은 구두가 노란 벽돌 길 위에서 짤깍짤깍 소리를 내요.`},
   opts: [
    {type: `canon`, go: `E_pre`, e: `씩씩하게 걸어가요`},
    {type: `imag`, go: `E_pre`, e: `은 구두로 깡충 뛰어 봐요`}
   ]},
  {id: `E_pre`, t: `ending`},
  /* ---------- 결말 ---------- */
  {id: `E_canon`, bg: `ch1_road`, w: `dorothy`, in: 1, f: `dorothy_brave`, o: `toto`,
   e: `짤깍, 짤깍.\n은 구두 소리를 들으며 나는 노란 길을 걸었어.`},
  {t: `goto`, to: `E_last`},
  {id: `E_imag`, bg: `ch1_road`, w: `dorothy`, in: 1, f: `dorothy_dreamy`, o: `toto`, fx: `dream`, cam: `up`,
   e: `깡충! 은 구두가 반짝 빛났어.\n구두에 정말 무슨 힘이 있는 걸까?`},
  {t: `goto`, to: `E_last`},
  {id: `E_bal`, bg: `ch1_munchkin`, w: `munchkin`, f: `dorothy_happy`, o: `munchkin`,
   e: `"잘 가요, 도로시!"\n먼치킨들이 웃으며 배웅해 주었어.`},
  {id: `E_last`, bg: `ch1_road`, w: `dorothy`, in: 1, f: `dorothy_happy`, o: `toto`, cam: `out`,
   e: `에메랄드 시는 어디쯤 있을까?\n길에서 누구를 만나게 될까?`},
  {t: `endcard`}
  ]
});
