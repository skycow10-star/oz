import asyncio, sys
from playwright.async_api import async_playwright
ROUTES=["canon","imag","bal","canon","bal"]
async def play(pg, route):
  for step in range(3000):
    ph = await pg.evaluate("window.__vn.state().phase")
    if ph=="report": return
    if ph=="choice" and await pg.evaluate("!!(window.__vn.node()||{}).opts && !!document.querySelector('#choices:not([hidden]) .choice:not([disabled])')"):
      await pg.wait_for_timeout(350)
      types = await pg.evaluate("Array.from(document.querySelectorAll('.choice')).map(b=>window.__vn.node().opts[+b.dataset.oi].type)")
      await pg.click(f".choice >> nth={types.index(route)}"); await pg.wait_for_timeout(600); continue
    if ph=="name":
      await pg.wait_for_selector("#nameInput", state="visible")
      await pg.fill("#nameInput", "기쁨의 하얀 길" if route=="canon" else "별빛 오솔길")
      await pg.press("#nameInput","Enter"); await pg.wait_for_timeout(600); continue
    await pg.click(".dlg-head"); await pg.wait_for_timeout(25)
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=await b.new_page(viewport={"width":1100,"height":900}); errs=[]
    pg.on("pageerror",lambda e: errs.append(str(e)))
    await pg.goto("http://localhost:8765/"); await pg.wait_for_timeout(1200)
    await pg.click("#btnStart"); await pg.wait_for_timeout(1800)
    for i,r in enumerate(ROUTES):
      await play(pg, r)
      st=await pg.evaluate("window.__vn.state()")
      print(i+1, r, st["ending"], flush=True)
      if i<4: await pg.click("#rpNext", timeout=5000); await pg.wait_for_timeout(1800)
    await pg.screenshot(path="/home/claude/test4/r5.png")
    await pg.click("#rpMid"); await pg.wait_for_timeout(800)
    h=await pg.evaluate("document.getElementById('report').scrollHeight")
    await pg.set_viewport_size({"width":1100,"height":h+40}); await pg.wait_for_timeout(500)
    await pg.screenshot(path="/home/claude/test4/mid.png")
    print("errors", errs)
    await b.close()
asyncio.run(main())
