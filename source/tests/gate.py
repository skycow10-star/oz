import asyncio,json,sys
from playwright.async_api import async_playwright
async def run(pg,ci,hearts):
    await pg.evaluate(f"window.__vn.start({ci},{json.dumps({'hearts':hearts,'met':{k:True for k in hearts}})})"); await pg.wait_for_timeout(1200)
    seen=[]
    for i in range(600):
      ph=await pg.evaluate("window.__vn.state().phase")
      if ph in("report","endcard"): break
      if ph=="choice": await pg.click("#choiceList .choice >> nth=0"); await pg.wait_for_timeout(800); continue
      if ph=="name": await pg.fill("#nameInput","책"); await pg.click("#nameOk"); await pg.wait_for_timeout(800); continue
      t=await pg.evaluate("(window.__vn.node().e||'')")
      if '💗' in t and t[:20] not in seen: seen.append(t[:20])
      await pg.click("#dialog"); await pg.wait_for_timeout(40)
    return seen
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome"); pg=await b.new_page(viewport={"width":1280,"height":800}); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("file:///home/claude/oz_visual_novel.html"); await pg.wait_for_timeout(1000)
    for ci in [4,8,9]:
      hi=await run(pg,ci,{"matthew":5,"marilla":5,"diana":5,"lynde":3,"allan":3,"gilbert":3,"barry":2})
      lo=await run(pg,ci,{"matthew":1,"marilla":1,"diana":1,"lynde":0,"allan":0,"gilbert":0,"barry":0})
      print(ci,"HIGH",hi,"LOW",lo)
    print(errs); await b.close()
asyncio.run(main())
