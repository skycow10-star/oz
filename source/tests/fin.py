import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=await b.new_page(viewport={"width":1280,"height":900}); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("file:///home/claude/oz_visual_novel.html"); await pg.wait_for_timeout(1200)
    await pg.evaluate("window.__vn.start(9,null)"); await pg.wait_for_timeout(1200)
    await pg.evaluate("window.__vn.mid()"); await pg.wait_for_timeout(800)
    await pg.screenshot(path="fin.png",full_page=False)
    t=await pg.evaluate("document.getElementById('report').innerText.slice(0,600)")
    print(t); print("errs",errs); await b.close()
asyncio.run(main())
