import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    ctx=await b.new_context(service_workers="allow"); pg=await ctx.new_page(); errs=[]
    pg.on("pageerror",lambda e: errs.append(str(e)))
    await pg.goto("http://localhost:8765/"); await pg.wait_for_timeout(1200)
    await pg.click("#btnStart"); await pg.wait_for_timeout(2500)
    print("ch1:", await pg.evaluate("window.__vn.bgm()"))
    await pg.evaluate("window.__vn.start(1, null)"); await pg.wait_for_timeout(3000)
    print("ch2:", await pg.evaluate("window.__vn.bgm()"))
    await pg.evaluate("window.__vn.start(2, null)"); await pg.wait_for_timeout(1500)
    await pg.evaluate("window.__vn.start(4, null)"); await pg.wait_for_timeout(2500)
    print("ch5:", await pg.evaluate("window.__vn.bgm()"), errs)
    await b.close()
asyncio.run(main())
