# 사용법: python3 extract.py <Standard Ebooks src/epub/text 폴더 또는 .epub> <출력 폴더>
# 장마다 chNN.txt (문단 사이 빈 줄) 생성
import zipfile, re, sys, html, os, glob
src, out = sys.argv[1], sys.argv[2]
if src.endswith('.epub'):
    z = zipfile.ZipFile(src); names = [n for n in z.namelist() if re.search(r'chapter-\d+\.xhtml$', n)]
    read = lambda n: z.read(n).decode('utf-8')
else:
    names = glob.glob(os.path.join(src, 'chapter-*.xhtml')); read = lambda n: open(n, encoding='utf-8').read()
names.sort(key=lambda n: int(re.search(r'chapter-(\d+)', n).group(1)))
for n in names:
    i = int(re.search(r'chapter-(\d+)', n).group(1)); x = read(n)
    x = re.sub(r'<hgroup>.*?</hgroup>', '', x, flags=re.S)
    clean = []
    for p in re.findall(r'<p[^>]*>(.*?)</p>', x, re.S):
        t = re.sub(r'<br\s*/?>', ' / ', p); t = re.sub(r'<[^>]+>', '', t); t = html.unescape(re.sub(r'\s+', ' ', t)).replace('⁠', '').strip()
        if t: clean.append(t)
    open(f'{out}/ch{i:02d}.txt', 'w', encoding='utf-8').write('\n\n'.join(clean))
    print(i, len(clean), sum(len(c.split()) for c in clean))
