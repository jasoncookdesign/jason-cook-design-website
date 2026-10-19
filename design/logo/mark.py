"""JCD mark: single source of truth.
Letters are defined in px inside an 84 x 100 cell. All corner arcs are true circles (radius in px).
Two radii in the system: SMALL=6 (outer corners, counter corners) and BOWL=26 (the D's right corners).
One stripe: a full-width knockout centered on the counter midline (y=50). Its thickness equals the notch
between the J's top beak and the J's stem (stem left edge minus beak right edge = 63 - 55 = 8), so the
stripe's width is the letter's own spacing, not an arbitrary value."""
import math, os, itertools
W,H=84,100; w=21; t=25; bk_h=15; bk_w=21; xt=34
SMALL,BOWL=6,26
ADV=100; WORD_W=2*ADV+W
K=0.5523
INK="#E8EFF5"; NAVY="#0D2438"; CARD="#16324a"; ORANGE="#E8723C"
P_,S_,B_="#FFB48A","#9CCBFF","#5E9BD6"
NOTCH=(W-w)-(xt+bk_w)                    # the J's inner notch: stem left edge minus beak right edge
STRIPE_H=NOTCH
STRIPE_Y=(H-STRIPE_H)//2                 # centered on the counter midline
BANDS=[(0,STRIPE_Y),(STRIPE_Y+STRIPE_H,H)]   # the two bands left by the stripe
BAND2=[S_,INK]                           # optional two-tone: top, bottom
uid=itertools.count()
def sub(a,b): return (a[0]-b[0],a[1]-b[1])
def add(a,b): return (a[0]+b[0],a[1]+b[1])
def mul(a,k): return (a[0]*k,a[1]*k)
def ln(a): return math.hypot(*a)
def unit(a): l=ln(a); return (a[0]/l,a[1]/l)
def area(p): return sum(p[i][0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*p[i][1] for i in range(len(p)))/2
def convex(p,i):
    a,b,c=p[i-1],p[i],p[(i+1)%len(p)]
    return ((b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0]))*area(p)>0
J=[(xt,0),(W,0),(W,H),(0,H),(0,H-t-bk_h),(bk_w,H-t-bk_h),(bk_w,H-t),(W-w,H-t),(W-w,t),(xt+bk_w,t),(xt+bk_w,t+bk_h),(xt,t+bk_h)]
C=[(0,0),(W,0),(W,t+bk_h),(W-bk_w,t+bk_h),(W-bk_w,t),(w,t),(w,H-t),(W-bk_w,H-t),(W-bk_w,H-t-bk_h),(W,H-t-bk_h),(W,H),(0,H)]
Dout=[(0,0),(W,0),(W,H),(0,H)]; Dout_r=[SMALL,BOWL,BOWL,SMALL]
Din=[(w,t),(W-w,t),(W-w,H-t),(w,H-t)]; Din_r=[0,SMALL,SMALL,0]
def radii_auto(p): return [SMALL if convex(p,i) else 0 for i in range(len(p))]
def corners(p,radii):
    """list of (vertex index, circle center, radius, tangent point 1, tangent point 2)"""
    out=[]; n=len(p)
    for i,r in enumerate(radii):
        if r<=0: continue
        a,b,c=p[i-1],p[i],p[(i+1)%n]; v1=sub(a,b); v2=sub(c,b)
        d=min(r,.5*ln(v1),.5*ln(v2)); u1=unit(v1); u2=unit(v2)
        out.append((i,add(b,mul(add(u1,u2),d)),d,add(b,mul(u1,d)),add(b,mul(u2,d))))
    return out
def rpath(p,radii,ox=0,oy=0):
    n=len(p); parts=[]
    cs={i:(t1,t2,d) for i,_,d,t1,t2 in corners(p,radii)}
    for i in range(n):
        b=p[i]
        if i in cs:
            e,x,d=cs[i]
            ce=add(e,mul(sub(b,e),K)); cx=add(x,mul(sub(b,x),K))
            parts.append(("M" if i==0 else "L")+"%.2f,%.2f"%(e[0]+ox,e[1]+oy)+" C%.2f,%.2f %.2f,%.2f %.2f,%.2f"%(ce[0]+ox,ce[1]+oy,cx[0]+ox,cx[1]+oy,x[0]+ox,x[1]+oy))
        else:
            parts.append(("M" if i==0 else "L")+"%.2f,%.2f"%(b[0]+ox,b[1]+oy))
    return " ".join(parts)+" Z"
def letter_d(i,ox=0,oy=0):
    if i==0: return rpath(J,radii_auto(J),ox+0,oy)
    if i==1: return rpath(C,radii_auto(C),ox+ADV,oy)
    return rpath(Dout,Dout_r,ox+2*ADV,oy)+" "+rpath(Din,Din_r,ox+2*ADV,oy)
def word_d(ox=0,oy=0,k=1.0):
    d=" ".join(letter_d(i,ox,oy) for i in range(3)); return d
def mark_svg(fill=None,band_cols=None,bands=True,vb_pad=0,card=None,w_card=340,h_card=140,scale=None):
    """letters only, or on a card. fill: single color; band_cols: list of 7 colors. bands=False -> solid."""
    i=next(uid)
    if card:
        s=1.0 if scale is None else scale; ox=(w_card-WORD_W*s)/2/s; oy=(h_card-H*s)/2/s
        head=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w_card} {h_card}"><rect width="{w_card}" height="{h_card}" rx="10" fill="{card}"/><g transform="scale({s})">'
        tail='</g></svg>'
    else:
        ox=oy=vb_pad; head=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WORD_W+2*vb_pad} {H+2*vb_pad}">'; tail='</svg>'
    d=word_d(ox,oy)
    if bands:
        cols=band_cols or [fill]*len(BANDS)
        rects="".join(f'<rect x="{ox-2}" y="{oy+b0}" width="{WORD_W+4}" height="{b1-b0}" fill="{cols[k]}"/>' for k,(b0,b1) in enumerate(BANDS))
    else:
        rects=f'<rect x="{ox-2}" y="{oy-2}" width="{WORD_W+4}" height="{H+4}" fill="{fill}"/>'
    return head+f'<defs><clipPath id="m{i}"><path d="{d}" clip-rule="evenodd"/></clipPath></defs><g clip-path="url(#m{i})">{rects}</g>'+tail
def favicon():
    sc=.31; lw=WORD_W*sc; lh=H*sc
    return mark_svg(fill=INK,bands=False,card=CARD,w_card=100,h_card=100,scale=sc).replace('rx="10"','rx="14"')
def stack(rows,card=NAVY):
    w_,h_=340,336; sc=.52; rowh=H*sc; gap=6; y=22; out=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w_} {h_}"><rect width="{w_}" height="{h_}" rx="10" fill="{card}"/>'
    ox=(w_-WORD_W*sc)/2
    for k,col in enumerate(rows):
        i=next(uid); d=word_d(0,0)
        out+=f'<g transform="translate({ox:.2f},{y:.2f}) scale({sc})"><clipPath id="s{i}"><path d="{d}" clip-rule="evenodd"/></clipPath><g clip-path="url(#s{i})">'+"".join(f'<rect x="-2" y="{b0}" width="{WORD_W+4}" height="{b1-b0}" fill="{col}"/>' for b0,b1 in BANDS)+'</g></g>'
        y+=rowh+gap
    return out+'</svg>'
if __name__=="__main__":
    os.makedirs("svg",exist_ok=True)
    out={
     "mark-solid-ivory":mark_svg(INK,bands=False),"mark-solid-navy":mark_svg(NAVY,bands=False),"mark-solid-orange":mark_svg(ORANGE,bands=False),
     "mark-stripe-ivory":mark_svg(INK),"mark-stripe-navy":mark_svg(NAVY),"mark-stripe-two-tone":mark_svg(band_cols=BAND2),
     "card-navy-stripe":mark_svg(INK,card=CARD),"card-navy-two-tone":mark_svg(band_cols=BAND2,card=NAVY),
     "card-orange-stripe":mark_svg(NAVY,card=ORANGE),"card-orange-reversed-stripe":mark_svg(INK,card=ORANGE),"card-solid-navy":mark_svg(INK,bands=False,card=CARD),
     "favicon":favicon(),
     "stack-blue":stack(["#5E9BD6","#7FB2E4","#9CCBFF","#C7E1FF","#E8EFF5"]),"stack-warm":stack(["#E8723C","#F09062","#FFB48A","#FFD3B8","#E8EFF5"]),
    }
    for k,v in out.items(): open(f"svg/{k}.svg","w").write(v)
    print(len(out),"svgs")
