import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=await b.new_page(viewport={"width":1280,"height":800})
    await pg.goto("file:///home/claude/imgs/index_student.html"); await pg.wait_for_timeout(800)
    await pg.screenshot(path="/home/claude/imgs/s0.png")
    vis=await pg.evaluate("[...document.querySelectorAll('.teacher-only')].map(e=>getComputedStyle(e).display)")
    print(vis)
    await pg.click("#cover button, #cover .big", timeout=5000)
    for i in range(6): await pg.wait_for_timeout(700); await pg.click("#dialog")
    await pg.wait_for_timeout(1500); await pg.screenshot(path="/home/claude/imgs/s1.png")
    await b.close()
asyncio.run(main())
