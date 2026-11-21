import asyncio
from playwright.async_api import async_playwright
SNAP={"canon":60,"imag":40,"hearts":{"matthew":5,"marilla":4,"diana":5,"barry":2,"gilbert":1,"lynde":2},"met":{"matthew":True,"marilla":True,"diana":True,"barry":True,"gilbert":True,"lynde":True},
 "items":["carpetbag","auburn","vow","slate","lock","bookmark"],"flags":{},"names":{"avenue":"기쁨의 하얀 길","pond":"반짝이는 호수","spring":"요정의 거울","vale":"보랏빛 요람","together":"책 읽기","advice":"잘했어"},
 "hist":{"ch1":{"ending":"canon","tally":{"canon":4,"imag":1,"bal":1}},"ch2":{"ending":"imag","tally":{"canon":1,"imag":4,"bal":1}},"ch3":{"ending":"bal","tally":{"canon":1,"imag":1,"bal":4}},"ch4":{"ending":"canon","tally":{"canon":4,"imag":1,"bal":1}},"ch5":{"ending":"bal","tally":{"canon":2,"imag":1,"bal":3}}}}
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    ctx=await b.new_context(viewport={"width":390,"height":844},device_scale_factor=2,is_mobile=True,has_touch=True)
    pg=await ctx.new_page(); errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
    await pg.goto("http://localhost:8765/"); await pg.wait_for_timeout(1000)
    await pg.evaluate("s=>window.__vn.start(4,s)", SNAP); await pg.wait_for_timeout(800)
    await pg.evaluate("document.getElementById('stage').hidden=true; document.getElementById('report').hidden=false; window.__vn.mid()")
    await pg.wait_for_timeout(600)
    await pg.fill("#midName","김앤")
    tas=pg.locator(".mid-ans")
    await tas.nth(0).click(); await pg.keyboard.type("다이애나에게 진심으로 사과했던 장면이요. 말 대신 행동으로 보여 주기로 했으니까요.")
    await tas.nth(2).fill("다시 친구가 될 것 같아요!\n길버트와는 계속 경쟁할 것 같아요.")
    await pg.wait_for_timeout(500)
    await pg.evaluate("document.querySelector('.mid-q').scrollIntoView()")
    await pg.screenshot(path="/home/claude/test4/mid_m.png")
    await pg.reload(); await pg.wait_for_timeout(1000)
    await pg.evaluate("document.getElementById('stage').hidden=true; document.getElementById('report').hidden=false; window.__vn.mid()")
    await pg.wait_for_timeout(400)
    print("after reload:", await pg.evaluate("[document.getElementById('midName').value, ...[...document.querySelectorAll('.mid-ans')].map(t=>t.value)]"))
    await pg.emulate_media(media="print"); await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('.mid-q').scrollIntoView()")
    await pg.screenshot(path="/home/claude/test4/mid_print.png")
    print("errors", errs)
    await b.close()
asyncio.run(main())
