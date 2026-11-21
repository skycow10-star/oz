import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for url,n in [("http://localhost:8765/index.html","n"),("http://localhost:8765/easy/","e")]:
      ctx=await b.new_context(viewport={"width":844,"height":390}); pg=await ctx.new_page(); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto(url); await pg.wait_for_timeout(2000)
      await pg.evaluate("window.__vn.start(0,null)"); await pg.wait_for_timeout(1800)
      await pg.screenshot(path=f"test4/land_{n}_play.png")
      shots={"choice":0,"name":0}
      for i in range(300):
        ph=await pg.evaluate("window.__vn.state().phase")
        if ph in shots and shots[ph]==0:
          await pg.wait_for_timeout(500); await pg.screenshot(path=f"test4/land_{n}_{ph}.png"); shots[ph]=1
          if ph=="name":
            await pg.click("#btnPeek"); await pg.wait_for_timeout(400); await pg.screenshot(path=f"test4/land_{n}_peek.png"); await pg.click("#peekBack", force=True); await pg.wait_for_timeout(300)
            break
        if ph=="choice":
          await pg.click("#choiceList .choice >> nth=0"); await pg.wait_for_timeout(900); continue
        if ph=="name": break
        await pg.click("#dialog"); await pg.wait_for_timeout(60)
      print(n,errs); await ctx.close()
    await b.close()
asyncio.run(main())
