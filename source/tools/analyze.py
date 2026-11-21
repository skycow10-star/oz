import sys
from PIL import Image
import numpy as np
from scipy import ndimage
for n in sys.argv[1:]:
    im=Image.open(n+'.png').convert('RGB'); sc=min(1,1200/im.width,1000/im.height)
    im=im.resize((round(im.width*sc),round(im.height*sc)),Image.BILINEAR)
    rgb=np.array(im).astype(int); mn=rgb.min(2); mx=rgb.max(2)
    isbg=(mn>226)&(mx-mn<26)
    lab,k=ndimage.label(isbg)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    seen=np.isin(lab,list(border))
    bgc=rgb[seen].mean(0)
    strict=(~seen)&(mn>212)&(mx-mn<20)&(np.abs(rgb-bgc).max(2)<16)
    l2,k2=ndimage.label(strict)
    lum=rgb.mean(2)
    print('==',n,bgc.round(1))
    for i in range(1,k2+1):
        m=l2==i; a=m.sum()
        if a<40: continue
        c=rgb[m].mean(0); warm=(c[0]-c[2])-(bgc[0]-bgc[2]); dim=bgc.min()-c.min()
        ring=ndimage.binary_dilation(m,iterations=3)&~m
        dark=(lum[ring]<90).mean(); redh=((rgb[...,0]-rgb[...,2])[ring]>60).mean()
        ys,xs=np.nonzero(m)
        print(a,(int(xs.mean()),int(ys.mean())),'warm',round(warm,1),'dim',round(dim,1),'dark',round(dark,2),'red',round(redh,2))
