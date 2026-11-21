import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome"); errs=[]
    for vp,name in [({"width":1280,"height":800},"pc"),({"width":390,"height":844},"phone")]:
      pg=await b.new_page(viewport=vp); pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto("file:///home/claude/oz_visual_novel.html"); await pg.wait_for_timeout(1200)
      await pg.click("#coverChapters"); await pg.wait_for_timeout(500)
      await pg.screenshot(path=f"test4/pick_{name}.png")
      await pg.click(".chgrid button[data-ci='7']"); await pg.wait_for_timeout(1500)
      print(name, await pg.evaluate("window.__vn.state().ch"))
      await pg.click("#btnChapters"); await pg.wait_for_timeout(500)
      await pg.click(".chgrid button[data-ci='2']"); await pg.wait_for_timeout(1500)
      print(name, await pg.evaluate("window.__vn.state().ch"))
      await pg.screenshot(path=f"test4/pick2_{name}.png")
    print("errs",errs); await b.close()
asyncio.run(main())
