import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=await b.new_page(viewport={"width":1280,"height":800}); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    for ci,keys in [(5,["ch6","ch6_snow","ch6_barry","ch6_morning"]),(6,["ch7","ch7_spring","ch7_garden"])]:
      await pg.evaluate(f"window.__vn.start({ci},null)"); await pg.wait_for_timeout(1500)
      ids=await pg.evaluate("window.__vn.state().ch")
      print("chapter idx",ids)
      for k in keys:
        r=await pg.evaluate("""k=>{const st=window.__vn.state(); st.bg=k; window.__vn.process && 0; const img=new Image(); return new Promise(res=>{const src=(window.IMAGE_FILES||{})[k]; if(!src) return res('nofile'); img.onload=()=>res('ok '+img.naturalWidth+'x'+img.naturalHeight); img.onerror=()=>res('err'); img.src=src;});}""",k)
        print(k,r)
    print("bgm", await pg.evaluate("window.__vn.bgm && JSON.stringify(window.__vn.bgm())"))
    print("errs",errs); await b.close()
asyncio.run(main())
