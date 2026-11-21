# 저장소/index.html → 저장소/easy/index.html (쉬운 이야기 주소). 그림·음악·sw는 상위 폴더 것을 함께 씀.
import os, json
from work import W, REPO
src = open(REPO + '/index.html', encoding='utf-8').read()
assert src.count('window.STUDENT_MODE = true;') == 1
s = src.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<base href="../">', 1)
s = s.replace('window.STUDENT_MODE = true;', 'window.STUDENT_MODE = true; window.EASY_MODE = true;', 1)
s = s.replace('<link rel="manifest" href="manifest.webmanifest">', '<link rel="manifest" href="easy/manifest.webmanifest">', 1)
s = s.replace(f"<title>{W['title']} — {W['sub']}</title>", f"<title>{W['easyTitle']}</title>", 1)
os.makedirs(REPO + '/easy', exist_ok=True)
open(REPO + '/easy/index.html', 'w', encoding='utf-8').write(s)
icons = [{"src": f"../{n}", "sizes": z, "type": "image/png", "purpose": p} for n, z, p in [("icon-192.png", "192x192", "any"), ("icon-512.png", "512x512", "any"), ("icon-maskable-512.png", "512x512", "maskable")]]
man = lambda name, short, desc, start, scope, ic, theme: json.dumps({"name": name, "short_name": short, "description": desc, "lang": "ko", "start_url": start, "scope": scope,
    "display": "standalone", "orientation": "any", "background_color": "#fbf6ec", "theme_color": theme, "icons": ic}, ensure_ascii=False, indent=2) + "\n"
open(REPO + '/easy/manifest.webmanifest', 'w', encoding='utf-8').write(man(W['easyTitle'], W['easyShort'], '쉬운 말로 읽는 선택형 ' + W['title'], './', '../', icons, '#e0a84a'))
open(REPO + '/manifest.webmanifest', 'w', encoding='utf-8').write(man(f"{W['title']} — {W['sub']}", W['title'], W['desc'], './index.html', './', [dict(i, src=i['src'][3:]) for i in icons], W['theme']))
print('easy page + manifests ok')
