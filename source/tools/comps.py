import sys
from PIL import Image
import numpy as np
from scipy import ndimage
n=sys.argv[1]
o=np.array(Image.open(f'out_{n}.png').convert('RGBA')).astype(int)
a=o[...,3]; rgb=o[...,:3]
mn=rgb.min(2); spread=rgb.max(2)-mn
near=(a>200)&(mn>232)&(spread<22)
lab,k=ndimage.label(near)
res=[]
for i in range(1,k+1):
    m=lab==i; area=m.sum()
    if area<40: continue
    ys,xs=np.nonzero(m)
    col=rgb[m].mean(0); sd=rgb[m].std(0).mean()
    res.append((area,int(xs.mean()),int(ys.mean()),col.round(1).tolist(),round(sd,1)))
res.sort(reverse=True)
print(n, o.shape)
for r in res[:25]: print(r)
