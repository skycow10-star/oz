import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=await b.new_page(viewport={"width":390,"height":844})
    await pg.goto("file:///home/claude/oz_visual_novel.html"); await pg.wait_for_timeout(1000)
    await pg.evaluate("window.__vn.start(0,null)"); await pg.wait_for_timeout(1500)
    for i in range(60):
      if await pg.evaluate("window.__vn.state().phase")=="choice": break
      await pg.click("#dialog"); await pg.wait_for_timeout(60)
    await pg.wait_for_timeout(500); await pg.screenshot(path="test4/port_choice.png"); await b.close()
asyncio.run(main())
