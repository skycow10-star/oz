import sys
# usage: mkbook.py key title orig tr_file:chnum [tr_file:chnum ...]
key,title,orig=sys.argv[1:4]
out=[f"/* 원문 책장: {orig} — 이 앱을 위해 새로 우리말로 옮김 */",f"BOOK.{key} = {{",f"  title: `{title}`,",f"  orig: `{orig}`,","  paras: ["]
for spec in sys.argv[4:]:
    f,n=spec.split(':'); 
    if '|' in n: n,h=n.split('|',1); out.append(f"[`h`, `{h}`],")
    lines=[l.strip() for l in open(f,encoding='utf-8') if l.strip()]
    for i,l in enumerate(lines,1):
        assert '`' not in l and '${' not in l
        out.append(f"[`{n}-{i}`, `{l}`],")
out+=["  ]","};"]
open(f'/home/claude/build/book_{key}.js','w',encoding='utf-8').write('\n'.join(out)+'\n')
print(key, sum(1 for x in out if x.startswith('[`')))
