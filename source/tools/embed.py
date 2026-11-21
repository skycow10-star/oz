import asyncio, glob, json, sys
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
    pg=await b.new_page(viewport={"width":1280,"height":800})
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.goto("file:///home/claude/oz_visual_novel.html"); await pg.wait_for_timeout(500)
    await pg.set_input_files("#fileInput", sorted(glob.glob("/home/claude/imgs/in/*")))
    await pg.wait_for_function("Object.keys(window.__vn.uploaded()).length>=31", timeout=120000)
    keys=await pg.evaluate("Object.keys(window.__vn.uploaded()).sort()")
    html=await pg.evaluate("window.__vn.exportHTML(true)")
    open("/home/claude/imgs/index_student.html","w").write(html)
    for k in ["phillips"]:
      d=await pg.evaluate(f"window.__vn.uploaded()['{k}']")
      import base64; open(f"/home/claude/imgs/chk_{k}.png","wb").write(base64.b64decode(d.split(",")[1]))
    print(keys, len(html)/1048576, errs)
    await b.close()
asyncio.run(main())
