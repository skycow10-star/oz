import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    ctx=await b.new_context(viewport={"width":1280,"height":800}, service_workers="allow")
    pg=await ctx.new_page(); errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(2500)
    print("sw controller:", await pg.evaluate("navigator.serviceWorker.controller ? 'yes' : 'no'"))
    await pg.reload(); await pg.wait_for_timeout(1500)
    print("sw controller after reload:", await pg.evaluate("navigator.serviceWorker.controller ? 'yes' : 'no'"))
    man = await pg.evaluate("fetch('manifest.webmanifest').then(r=>r.json())")
    print("manifest:", man["short_name"], len(man["icons"]))
    cdp = await ctx.new_cdp_session(pg)
    r = await cdp.send("Page.getAppManifest"); print("manifest errors:", r.get("errors"))
    try:
      inst = await cdp.send("Page.getInstallabilityErrors"); print("installability errors:", inst)
    except Exception as e: print("installability check n/a", e)
    await ctx.set_offline(True)
    await pg.reload(); await pg.wait_for_timeout(1500)
    print("offline title:", await pg.title(), "| cover visible:", await pg.is_visible("#cover"))
    await pg.click("#btnStart"); await pg.wait_for_timeout(1500)
    print("offline play ok:", await pg.evaluate("window.__vn.state().phase"))
    print("errors", errs)
    await b.close()
asyncio.run(main())
