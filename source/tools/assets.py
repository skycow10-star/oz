# 그림을 앱이 쓰는 모양(배경 JPEG/투명 스프라이트)으로 처리한 뒤 WebP 파일로 저장하고, IMAGE_FILES 목록을 넣은 index.html을 만든다.
import os as _os; OZH = _os.environ.get('OZ_HOME', '/home/claude')   # 작업 폴더(기본 /home/claude)
import asyncio, glob, json, base64, os, re, sys
sys.path.insert(0, OZH + "/tools")
from work import REPO, HTML
from playwright.async_api import async_playwright
OUT=REPO
def write_index(manifest, total, errs):
  os.makedirs(OUT+"/img", exist_ok=True)
  # 그림 없는 판(그림은 img/*.webp 별도 파일)으로 학생용 index.html 을 만든다
  base=open(HTML,encoding="utf-8").read()
  tag='<script id="embedded-images">window.EMBEDDED_IMAGES = {}; window.STUDENT_MODE = false;</script>'
  assert tag in base
  base=base.replace(tag,'<script id="embedded-images">window.EMBEDDED_IMAGES = {}; window.STUDENT_MODE = true; window.IMAGE_FILES = '+json.dumps(manifest)+';</script>')
  if not base.lstrip().lower().startswith("<!doctype"): base="<!DOCTYPE html>\n"+base
  open(OUT+"/index.html","w",encoding="utf-8").write(base)
  print(len(manifest),"images", round(total/1048576,2),"MB; index", round(len(base.encode())/1024),"KB", errs)
async def main():
  files=sorted(glob.glob(OZH + "/imgs/in/*"))
  if not files: return write_index({}, 0, [])
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
    pg=await b.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.goto("file://"+HTML); await pg.wait_for_timeout(500)
    await pg.set_input_files("#fileInput", files)
    await pg.wait_for_function(f"Object.keys(window.__vn.uploaded()).length>={len(files)}", timeout=180000)
    keys=await pg.evaluate("Object.keys(window.__vn.uploaded()).sort()")
    os.makedirs(OUT+"/img", exist_ok=True)
    for f in glob.glob(OUT+"/img/*"): os.remove(f)
    manifest={}; total=0
    for k in keys:
      q = 0.82 if re.match(r"^ch\d", k) else 0.9
      d=await pg.evaluate("""([k,q])=>new Promise(res=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d').drawImage(im,0,0);res(c.toDataURL('image/webp',q));};im.src=window.__vn.uploaded()[k];})""",[k,q])
      raw=base64.b64decode(d.split(",")[1]); open(f"{OUT}/img/{k}.webp","wb").write(raw); total+=len(raw)
      manifest[k]=f"img/{k}.webp"
    await b.close()
  write_index(manifest, total, errs)
asyncio.run(main())
