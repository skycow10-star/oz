import asyncio, sys, os, shutil
CI=int(os.environ.get("CI","0"))
from playwright.async_api import async_playwright
OUT=os.environ.get("OZ_HOME","/home/claude")+"/out"
URL=sys.argv[1] if len(sys.argv)>1 else "http://localhost:8765/"
async def run(b, want, level, shot):
  pg=await b.new_page(viewport={"width":1200,"height":800}); errs=[]
  pg.on("pageerror", lambda e: errs.append(str(e)))
  await pg.goto(URL); await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(600)
  await pg.click("#btnStart"); await pg.wait_for_timeout(1500)
  if CI: await pg.evaluate(f"window.__vn.start({CI}, null)"); await pg.wait_for_timeout(2000)
  if level=="lit" and await pg.locator("#btnLevel").is_visible(): await pg.click("#btnLevel"); await pg.wait_for_timeout(300)
  seen=0; texts=[]
  for i in range(300):
    ph=await pg.evaluate("window.__vn.state().phase")
    if ph=="report": break
    if await pg.locator(".cardfx").count():
      if shot and not os.path.exists(OUT+f"/{shot}_cardfx.png"): await pg.wait_for_timeout(900); await pg.screenshot(path=OUT+f"/{shot}_cardfx.png")
      try: await pg.locator(".cardfx").first.click(timeout=1500)
      except Exception: pass
      await pg.wait_for_timeout(700); continue
    if ph=="choice":
      n=await pg.evaluate("window.__vn.node()"); order=await pg.evaluate("window.__vn.state().order")
      types=[n["opts"][k]["type"] for k in order] if n.get("opts") else []
      j=types.index(want) if want in types else 0
      if seen==int(os.environ.get("SHOT","3")) and shot: await pg.screenshot(path=OUT+f"/{shot}_choice.png")
      seen+=1
      await pg.click(f"#choiceList .choice >> nth={j}"); await pg.wait_for_timeout(1100); continue
    if ph=="name":
      if await pg.locator(".pickname").count(): await pg.locator(".pickname").first.click(); await pg.wait_for_timeout(1000); continue
      await pg.fill("#nameInput","꼭 돌아갈게요"); await pg.click("#nameOk"); await pg.wait_for_timeout(1000); continue
    t=await pg.evaluate("document.getElementById('dlgText').textContent")
    texts.append(t)
    if '{' in t or 'undefined' in t: errs.append("TEXT:"+t[:60])
    await pg.mouse.click(600,700); await pg.wait_for_timeout(120)
    await pg.mouse.click(600,700); await pg.wait_for_timeout(250)
  st=await pg.evaluate("window.__vn.state()")
  if shot: await pg.screenshot(path=OUT+f"/{shot}_report.png", full_page=True)
  print(want, level, "phase", st["phase"], "ending", st["ending"], "tally", st["tally"], "hearts", st["hearts"], "items", st["items"], "flags", list(st["flags"]), "cards", st.get("cards"), "scenes", len(texts), errs[:4])
  await pg.close()
async def main():
  async with async_playwright() as p:
    ch=os.environ.get("CHROME") or shutil.which("google-chrome") or shutil.which("chromium")
    b=await (p.chromium.launch(executable_path=ch) if ch else p.chromium.launch())
    for want,level,shot in [("canon","easy","c"),("imag","lit","i"),("bal","easy","b")]:
      await run(b,want,level,shot)
    await b.close()
asyncio.run(main())
