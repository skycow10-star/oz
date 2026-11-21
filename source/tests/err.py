import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome"); pg=await b.new_page(); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e))); pg.on("console",lambda m: errs.append(m.text) if m.type=="error" else None)
    await pg.goto("file:///home/claude/oz_visual_novel.html"); await pg.wait_for_timeout(1500); print(errs); await b.close()
asyncio.run(main())
