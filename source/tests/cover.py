import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for q,name in [("","n"),("?easy","e")]:
      pg=await b.new_page(viewport={"width":390,"height":844}); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto("file:///home/claude/oz_visual_novel.html"+q); await pg.wait_for_timeout(1000)
      await pg.evaluate("window.__vn.start(0,null)"); await pg.wait_for_timeout(800)
      for i in range(12): await pg.click("#dialog"); await pg.wait_for_timeout(80)
      await pg.reload(); await pg.wait_for_timeout(1800)
      await pg.screenshot(path=f"test4/cover_{name}.png"); print(name,errs)
    await b.close()
asyncio.run(main())
