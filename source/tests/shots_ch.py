# 한 장을 처음부터 넘기며 배경·인물이 바뀔 때마다 화면을 찍는다 (그림 확인용)
# 사용법: CI=0 python3 shots_ch.py http://127.0.0.1:8776/   → $OZ_HOME/out/shots/chN_00.png …  (휴대폰 가로 844×390 도 같이)
import asyncio, os, sys, shutil
from playwright.async_api import async_playwright
CI = int(os.environ.get("CI", "0")); URL = sys.argv[1]
OUT = os.environ.get("OZ_HOME", "/home/claude") + f"/out/shots"
async def run(b, vw, vh, tag):
  pg = await b.new_page(viewport={"width": vw, "height": vh}); errs = []
  pg.on("pageerror", lambda e: errs.append(str(e)))
  await pg.goto(URL); await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(800)
  await pg.click("#btnStart"); await pg.wait_for_timeout(1200)
  if CI: await pg.evaluate(f"window.__vn.start({CI}, null)"); await pg.wait_for_timeout(1500)
  last = None; n = 0
  for i in range(260):
    ph = await pg.evaluate("window.__vn.state().phase")
    if ph == "report": break
    if await pg.locator(".cardfx").count():
      try: await pg.locator(".cardfx").first.click(timeout=1500)
      except Exception: pass
      await pg.wait_for_timeout(600); continue
    sig = await pg.evaluate("[document.getElementById('sprL').getAttribute('src')||'', document.getElementById('sprR').getAttribute('src')||'', (window.__vn.node()||{}).bg||''].map(s=>s.slice(-40)).join('|')")
    if sig != last:
      await pg.wait_for_timeout(700); await pg.screenshot(path=f"{OUT}/ch{CI+1}_{tag}_{n:02d}.png"); n += 1; last = sig
    if ph == "choice":
      await pg.click("#choiceList .choice >> nth=0"); await pg.wait_for_timeout(1000); continue
    if ph == "name":
      if await pg.locator(".pickname").count(): await pg.locator(".pickname").first.click(); await pg.wait_for_timeout(900); continue
      await pg.fill("#nameInput", "토토"); await pg.click("#nameOk"); await pg.wait_for_timeout(900); continue
    await pg.mouse.click(vw // 2, vh - 60); await pg.wait_for_timeout(120)
    await pg.mouse.click(vw // 2, vh - 60); await pg.wait_for_timeout(250)
  print(tag, "찍은 장면", n, errs[:3]); await pg.close()
async def main():
  os.makedirs(OUT, exist_ok=True)
  async with async_playwright() as p:
    ch = os.environ.get("CHROME") or shutil.which("google-chrome")
    b = await (p.chromium.launch(executable_path=ch) if ch else p.chromium.launch())
    await run(b, 1280, 760, "pc"); await run(b, 844, 390, "ph")
    await b.close()
asyncio.run(main())
