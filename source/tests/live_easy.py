import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    ctx=await b.new_context(viewport={"width":1280,"height":800}); pg=await ctx.new_page(); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e)))
    for url in ["http://localhost:8765/easy/","http://localhost:8765/easy/","http://localhost:8765/index.html"]:
      await pg.goto(url); await pg.wait_for_timeout(2500)
      print(url, await pg.evaluate("document.title"), await pg.evaluate("document.documentElement.classList.contains('easy')"), await pg.evaluate("window.__vn.persist && Object.keys(window.__vn.persist()).length"))
    await pg.goto("http://localhost:8765/easy/"); await pg.wait_for_timeout(1500)
    await pg.screenshot(path="test4/easy_cover.png")
    await pg.click("#btnStart"); await pg.wait_for_timeout(2500)
    for i in range(3): await pg.click("#dialog"); await pg.wait_for_timeout(200)
    await pg.wait_for_timeout(1500)
    await pg.screenshot(path="test4/easy_play.png")
    print("bgm", await pg.evaluate("JSON.stringify(window.__vn.bgm())"), "sw", await pg.evaluate("!!navigator.serviceWorker.controller"))
    print("errs",errs); await b.close()
asyncio.run(main())
