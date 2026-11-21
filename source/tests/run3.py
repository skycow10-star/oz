import asyncio, json, sys, os
CI=int(os.environ.get("CI","2"))
from playwright.async_api import async_playwright
F=sys.argv[1] if len(sys.argv)>1 else "file:///home/claude/oz_visual_novel.html"
SNAP={"canon":4,"imag":3,"hearts":{"matthew":3,"marilla":3,"lynde":2,"diana":3,"barry":1,"gilbert":1},"met":{"matthew":True,"marilla":True,"lynde":True},
 "items":["carpetbag","auburn","narcissi","poem","lock"],"flags":{"castle":True,"poem":True,"quiet":True,"wreath":True,"vow":True,"missSchool":True,"mailbox":True,"factsOnly":True},"names":{"avenue":"기쁨의 하얀 길","pond":"반짝이는 호수","advice":"잘했어","spring":"드라이어드의 샘","together":"소꿉놀이 집 짓기"},"hist":[]}
async def play(pg, route, tag, shots):
  n=0; seen=set()
  for step in range(3000):
    ph = await pg.evaluate("window.__vn.state().phase")
    if ph=="report": break
    if ph=="choice" and await pg.evaluate("!!(window.__vn.node()||{}).opts && !!document.querySelector('#choices:not([hidden]) .choice:not([disabled])')"):
      await pg.wait_for_timeout(400)
      types = await pg.evaluate("Array.from(document.querySelectorAll('.choice')).map(b=>window.__vn.node().opts[+b.dataset.oi].type)")
      await pg.click(f".choice >> nth={types.index(route)}"); await pg.wait_for_timeout(700); continue
    if ph=="name":
      v = "" if route=="canon" else ("요정의 거울" if route=="imag" else "책 같이 읽기")
      await pg.wait_for_selector("#nameInput", state="visible", timeout=10000); await pg.fill("#nameInput", v or "자작나무 숲에 소꿉놀이 집 짓기")
      await pg.press("#nameInput","Enter"); await pg.wait_for_timeout(700); continue
    bg = await pg.evaluate("window.__vn.state().bg")
    if shots and bg not in seen:
      seen.add(bg); await pg.wait_for_timeout(1300); await pg.click(".dlg-head"); await pg.wait_for_timeout(300)
      await pg.screenshot(path=f"/home/claude/test4/c{CI}_{tag}_{bg}.png")
    await pg.click(".dlg-head"); await pg.wait_for_timeout(30)
  return await pg.evaluate("window.__vn.state()")
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=await b.new_page(viewport={"width":1280,"height":800}); errs=[]
    pg.on("pageerror",lambda e: errs.append(str(e)))
    await pg.goto(F); await pg.wait_for_timeout(600)
    for r in ["canon","imag","bal"]:
      await pg.evaluate("([c,s])=>window.__vn.start(c,s)", [CI,SNAP]); await pg.wait_for_timeout(1800)
      st=await play(pg,r,r,r=="imag")
      print(r, st["ending"], st["tally"] if "tally" in st else "", st["items"], st["hearts"], st["names"])
      if r=="bal":
        await pg.screenshot(path="/home/claude/test4/report.png")
    # unresolved templates / missing book ids
    bad = await pg.evaluate("""(()=>{const out=[];const ch=CHAPTERS[%d];const ids=new Set(BOOK[ch.key].paras.map(p=>p[0]));
      ch.nodes.forEach(n=>{(n.bk||[]).forEach(b=>{if(!ids.has(b))out.push('bk '+b)});});return out})()""" % CI)
    print("bad", bad, "errors", errs)
    await b.close()
asyncio.run(main())
