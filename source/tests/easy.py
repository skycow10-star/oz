import asyncio,sys
from playwright.async_api import async_playwright
ROUTE=sys.argv[1] if len(sys.argv)>1 else "canon"; CI=int(sys.argv[2]) if len(sys.argv)>2 else 0
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    vp={"width":1280,"height":800} if ROUTE!="phone" else {"width":390,"height":844}
    pg=await b.new_page(viewport=vp); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("file:///home/claude/oz_visual_novel.html?easy"); await pg.wait_for_timeout(1200)
    await pg.evaluate(f"window.__vn.start({CI},null)"); await pg.wait_for_timeout(1500)
    shots=0
    for step in range(400):
      st=await pg.evaluate("window.__vn.state().phase")
      if st=="report": break
      if st in("choice","name") and shots<6 and step>0:
        await pg.screenshot(path=f"test4/e{CI}_{ROUTE}_{shots}.png"); shots+=1
      if st=="choice":
        await pg.wait_for_timeout(300)
        types=await pg.evaluate("Array.from(document.querySelectorAll('#choiceList .choice')).map(b=>window.__vn.node().opts[+b.dataset.oi].type)")
        r = "imag" if ROUTE=="imag" else "canon"
        idx = types.index(r) if r in types else 0
        await pg.click(f"#choiceList .choice >> nth={idx}"); await pg.wait_for_timeout(900); continue
      if st=="name":
        await pg.wait_for_timeout(300)
        if await pg.evaluate("!!window.__vn.node().pick"):
          await pg.click("#choiceList .choice >> nth=1")
        else:
          await pg.fill("#nameInput","책 읽기"); await pg.click("#nameOk")
        await pg.wait_for_timeout(900); continue
      await pg.click("#dialog"); await pg.wait_for_timeout(60)
    s=await pg.evaluate("JSON.stringify({e:window.__vn.state().ending,t:window.__vn.state().tally,n:window.__vn.state().names,picks:window.__vn.state().picks.length})")
    print(ROUTE,s,"steps",step,"errs",errs)
    await pg.screenshot(path=f"test4/e{CI}_{ROUTE}_report.png")
    await b.close()
asyncio.run(main())
