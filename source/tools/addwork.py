# work.js 의 /*+구역*/ 표시 앞에 줄을 덧붙인다.  사용: python3 addwork.py 파일.json  ({"who": "...", "tag": "...", ...})
import os as _os; OZH = _os.environ.get('OZ_HOME', '/home/claude')   # 작업 폴더(기본 /home/claude)
import json, sys
p = OZH + '/build/work.js'; s = open(p, encoding='utf-8').read()
for k, v in json.load(open(sys.argv[1], encoding='utf-8')).items():
    m = f'/*+{k}*/'; assert m in s, m
    s = s.replace(m, v.rstrip() + '\n    ' + m if k not in ('av',) else v + ' ' + m, 1)
open(p, 'w', encoding='utf-8').write(s); print('work.js 갱신')
