import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for name,vw,vh,clicks in [("p",390,844,[0]),("l",844,390,[0,6,30])]:
      ctx=await b.new_context(viewport={"width":vw,"height":vh},device_scale_factor=2,is_mobile=True,has_touch=True)
      pg=await ctx.new_page()
      await pg.goto("file:///home/claude/imgs/index_student.html"); await pg.wait_for_timeout(800)
      await pg.screenshot(path=f"/home/claude/imgs/m{name}_cover.png")
      await pg.click("#cover .big"); n=0
      for target in clicks:
        while n<target:
          ph=await pg.evaluate("document.querySelector('#dialog .choice')?1:0")
          if ph: await pg.click("#dialog .choice")
          else: await pg.click("#dialog")
          await pg.wait_for_timeout(250); n+=1
        await pg.wait_for_timeout(1800)
        await pg.click("#dialog") if not await pg.evaluate("document.querySelector('#dialog .choice')?1:0") else None
        await pg.wait_for_timeout(1200)
        await pg.screenshot(path=f"/home/claude/imgs/m{name}_{target}.png")
      await ctx.close()
    await b.close()
asyncio.run(main())
