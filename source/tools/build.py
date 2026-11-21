# shell.html + work.js + book_ch*.js + script_ch*.js/easy_ch*.js + engine.js → 교사용 원본 HTML 한 파일
import re, glob
from work import W, HTML, HOME
d = HOME + '/build/'
s = open(d + 'shell.html', encoding='utf-8').read()
for k, v in {'TITLE': W['title'], 'SUB': W['sub'], 'EN': W['en'], 'HERO': W['heroFull'], 'THEME': W['theme']}.items():
    s = s.replace('@@' + k + '@@', v)
num = lambda f: int(re.search(r'ch(\d+)', f).group(1))
books = sorted(glob.glob(d + 'book_ch*.js'), key=num)
scripts = sorted(glob.glob(d + 'script_ch*.js'), key=num) + sorted(glob.glob(d + 'easy_ch*.js'), key=num)
parts = [('/*@@WORK@@*/', d + 'work.js')] + [('/*@@BOOK@@*/', b) for b in books] + [('/*@@SCRIPT@@*/', x) for x in scripts] + [('/*@@ENGINE@@*/', d + 'engine.js')]
for ph, f in parts:
    c = open(f, encoding='utf-8').read()
    assert '</script' not in c.lower(), f
    s = s.replace(ph, c + '\n' + ph, 1)
for ph in ['/*@@WORK@@*/', '/*@@BOOK@@*/', '/*@@SCRIPT@@*/', '/*@@ENGINE@@*/']: s = s.replace(ph, '')
open(HTML, 'w', encoding='utf-8').write(s)
print(len(books), 'books', len(scripts), 'scripts', len(s.encode('utf-8')) // 1024, 'KB →', HTML)
