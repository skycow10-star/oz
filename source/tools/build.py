# shell.html + work.js + book_ch*.js + script_ch*.js/easy_ch*.js + engine.js → 교사용 원본 HTML 한 파일
import re, glob, colorsys
from work import W, HTML, HOME
d = HOME + '/build/'

# 작품별 색: work.js 의 palette 가 있으면 shell·engine 의 주황/베이지/갈색(따뜻한 색)만 다른 색상으로 돌린다.
# 빨강(원작)·파랑(상상)·보라(상상 장면) 같은 뜻 있는 색은 범위 밖이라 그대로 남는다.
PAL = W.get('palette')
def shift(r, g, b):
    h, l, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255); hd = h * 360
    lo, hi = PAL['from']
    if sat < 0.06 or not (lo <= hd <= hi): return r, g, b
    nh = (PAL['to'] + (hd - (lo + hi) / 2) * PAL.get('spread', 0.5)) % 360
    nr, ng, nb = colorsys.hls_to_rgb(nh / 360, l, min(1, sat * PAL.get('sat', 1)))
    return round(nr * 255), round(ng * 255), round(nb * 255)
def recolor(text):
    if not PAL: return text
    if '/*@@KEEPCOLOR*/' in text:  # 대체 그림(수채화 장면) 색은 그대로 둠
        a, rest = text.split('/*@@KEEPCOLOR*/', 1); keep, b = rest.split('/*@@/KEEPCOLOR*/', 1)
        return recolor(a) + keep + recolor(b)
    def hx(m):
        v = m.group(1)
        if len(v) == 3: v = ''.join(c * 2 for c in v)
        r, g, b = shift(int(v[0:2], 16), int(v[2:4], 16), int(v[4:6], 16))
        return '#%02x%02x%02x' % (r, g, b)
    text = re.sub(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z])', hx, text)
    def rg(m):
        r, g, b = shift(int(m.group(2)), int(m.group(3)), int(m.group(4)))
        return f'{m.group(1)}({r},{g},{b}{m.group(5) or ""}'
    return re.sub(r'(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,[^)]*)?\)', lambda m: rg(m) + ')', text)
s = recolor(open(d + 'shell.html', encoding='utf-8').read())
for k, v in {'TITLE': W['title'], 'SUB': W['sub'], 'EN': W['en'], 'HERO': W['heroFull'], 'THEME': W['theme']}.items():
    s = s.replace('@@' + k + '@@', v)
num = lambda f: int(re.search(r'ch(\d+)', f).group(1))
books = sorted(glob.glob(d + 'book_ch*.js'), key=num)
scripts = sorted(glob.glob(d + 'script_ch*.js'), key=num) + sorted(glob.glob(d + 'easy_ch*.js'), key=num)
parts = [('/*@@WORK@@*/', d + 'work.js')] + [('/*@@BOOK@@*/', b) for b in books] + [('/*@@SCRIPT@@*/', x) for x in scripts] + [('/*@@ENGINE@@*/', d + 'engine.js')]
for ph, f in parts:
    c = open(f, encoding='utf-8').read()
    if f.endswith('engine.js'): c = recolor(c)
    assert '</script' not in c.lower(), f
    s = s.replace(ph, c + '\n' + ph, 1)
for ph in ['/*@@WORK@@*/', '/*@@BOOK@@*/', '/*@@SCRIPT@@*/', '/*@@ENGINE@@*/']: s = s.replace(ph, '')
open(HTML, 'w', encoding='utf-8').write(s)
print(len(books), 'books', len(scripts), 'scripts', len(s.encode('utf-8')) // 1024, 'KB →', HTML)
