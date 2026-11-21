import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for q,n,vp in [("","n",{"width":390,"height":844}),("?easy","e",{"width":390,"height":844}),("","pc",{"width":1280,"height":800})]:
      pg=await b.new_page(viewport=vp); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto("file:///home/claude/oz_visual_novel.html"+q); await pg.wait_for_timeout(900)
      await pg.evaluate("window.__vn.start(0,null)"); await pg.wait_for_timeout(1000); k=0
      for i in range(500):
        ph=await pg.evaluate("window.__vn.state().phase")
        if ph=="report": break
        if ph=="choice": await pg.click(f"#choiceList .choice >> nth={k%2}"); k+=1; await pg.wait_for_timeout(800); continue
        if ph=="name": await pg.fill("#nameInput","꽃길"); await pg.click("#nameOk"); await pg.wait_for_timeout(800); continue
        await pg.click("#dialog"); await pg.wait_for_timeout(40)
      await pg.wait_for_timeout(600); await pg.screenshot(path=f"test4/rep_{n}.png")
      await pg.evaluate("document.getElementById('report').scrollTop=600"); await pg.wait_for_timeout(300); await pg.screenshot(path=f"test4/rep_{n}2.png")
      print(n,errs, await pg.evaluate("document.documentElement.scrollWidth"))
    await b.close()
asyncio.run(main())
