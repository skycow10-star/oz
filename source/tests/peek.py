import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    ctx=await b.new_context(viewport={"width":844,"height":390}); pg=await ctx.new_page()
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    await pg.evaluate("window.__vn.start(0,null)"); await pg.wait_for_timeout(1500)
    for i in range(200):
      ph=await pg.evaluate("window.__vn.state().phase")
      if ph=="choice": await pg.click("#choiceList .choice >> nth=0"); await pg.wait_for_timeout(900); continue
      if ph=="name": break
      await pg.click("#dialog"); await pg.wait_for_timeout(50)
    await pg.wait_for_timeout(500); await pg.click("#btnPeek"); await pg.wait_for_timeout(400)
    print(await pg.evaluate("""(()=>{const b=document.getElementById('peekBack').getBoundingClientRect();const e=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2);return JSON.stringify([b.x,b.y,b.width,b.height,e&&(e.id||e.className)])})()"""))
    await b.close()
asyncio.run(main())
