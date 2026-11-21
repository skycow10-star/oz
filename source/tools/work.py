# 작품 설정(build/work.js)을 파이썬 도구에서 읽기 위한 도우미. node 로 WORK 객체를 JSON 으로 꺼낸다.
import json, subprocess
HOME = '/home/claude'
def load():
    js = "const fs=require('fs');eval(fs.readFileSync('%s/build/work.js','utf8')+';globalThis.W=WORK');console.log(JSON.stringify(W))" % HOME
    return json.loads(subprocess.check_output(['node', '-e', js]))
W = load()
ID = W['id']
REPO = f"{HOME}/{ID}"                       # 배포 저장소 (clone 위치)
HTML = f"{HOME}/{ID}_visual_novel.html"     # 교사용 원본 (빌드 결과)
