import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for u in ["index.html","easy/index.html"]:
      pg=await b.new_page(viewport={"width":1280,"height":800}); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto("file:///home/claude/out/off/빨강머리앤/"+u); await pg.wait_for_timeout(1500)
      await pg.click("#btnStart"); await pg.wait_for_timeout(3000)
      ok=await pg.evaluate("Array.from(document.images).filter(i=>i.src&&i.complete&&i.naturalWidth>0).length")
      print(u,"imgs",ok,"bgm",await pg.evaluate("JSON.stringify(window.__vn.bgm())"),errs)
      await pg.screenshot(path="/home/claude/test4/file_"+u.replace('/','_')+".png")
    await b.close()
asyncio.run(main())
