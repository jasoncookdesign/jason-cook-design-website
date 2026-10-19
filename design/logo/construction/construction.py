import sys; sys.path.insert(0,'../final')
import mark as M
RULE="#6F93AD"; FAINT="#2E5470"; ACC="#FF9B6B"; INK=M.INK; NAVY=M.NAVY
MONO="IBM Plex Mono,ui-monospace,monospace"
def build(hero=False):
    OX,OY=(70,40) if hero else (60,70)
    fs=7.2 if hero else 4.4
    G=lambda cls,items:f'<g class="{cls}">{"".join(items)}</g>'
    X=lambda i,x:OX+i*M.ADV+x; Y=lambda y:OY+y
    def line(a,b,c=RULE,w=.5,dash=None):
        d=f' stroke-dasharray="{dash}"' if dash else ''
        return f'<line x1="{a[0]:.2f}" y1="{a[1]:.2f}" x2="{b[0]:.2f}" y2="{b[1]:.2f}" stroke="{c}" stroke-width="{w}"{d}/>'
    def text(x,y,t,c=RULE,anchor="start",sz=None):
        return f'<text x="{x:.2f}" y="{y:.2f}" fill="{c}" font-family="{MONO}" font-size="{sz or fs}" text-anchor="{anchor}" letter-spacing=".05em">{t}</text>'
    lw=.7 if hero else .5
    frame=[];grid=[];center=[];fillets=[];bowl=[];dims=[];bands=[]
    for i in range(3):
        frame.append(f'<rect x="{X(i,0)}" y="{Y(0)}" width="{M.W}" height="{M.H}" fill="none" stroke="{RULE}" stroke-width="{lw}"/>')
        for k in (1,2,3):
            grid.append(line((X(i,k*M.W/4),Y(0)),(X(i,k*M.W/4),Y(M.H)),FAINT,.4)); grid.append(line((X(i,0),Y(k*M.H/4)),(X(i,M.W),Y(k*M.H/4)),FAINT,.4))
    def cl(i,pts): return f'<polyline points="{" ".join("%.2f,%.2f"%(X(i,x),Y(y)) for x,y in pts)}" fill="none" stroke="{RULE}" stroke-width=".5" stroke-dasharray="6 2 1 2" opacity=".75"/>'
    center.append(cl(0,[(M.xt+8,12.5),(M.W-M.w/2,12.5),(M.W-M.w/2,87.5),(8,87.5)]))
    center.append(cl(1,[(M.W-8,12.5),(M.w/2,12.5),(M.w/2,87.5),(M.W-8,87.5)]))
    for i,(p,r) in enumerate([(M.J,M.radii_auto(M.J)),(M.C,M.radii_auto(M.C))]):
        for (v,c,d,t1,t2) in M.corners(p,r):
            fillets.append(f'<circle cx="{X(i,c[0]):.2f}" cy="{Y(c[1]):.2f}" r="{d}" fill="none" stroke="{RULE}" stroke-width=".5"/>')
    for (v,c,d,t1,t2) in M.corners(M.Dout,M.Dout_r):
        col,wd=(ACC,.9) if d>10 else (RULE,.5)
        (bowl if d>10 else fillets).append(f'<circle cx="{X(2,c[0]):.2f}" cy="{Y(c[1]):.2f}" r="{d}" fill="none" stroke="{col}" stroke-width="{wd}"/>')
    for (v,c,d,t1,t2) in M.corners(M.Din,M.Din_r):
        fillets.append(f'<circle cx="{X(2,c[0]):.2f}" cy="{Y(c[1]):.2f}" r="{d}" fill="none" stroke="{RULE}" stroke-width=".5"/>')
    # band edge lines across the word, faint
    for (b0,b1) in M.BANDS:
        for yy in (b0,b1): bands.append(line((OX-12,Y(yy)),(OX+M.WORD_W+12,Y(yy)),FAINT,.35))
    ty=OY-18
    def dh(x0,x1,y,label): return line((x0,y),(x1,y),INK,.6)+line((x0,y-3),(x0,y+3),INK,.6)+line((x1,y-3),(x1,y+3),INK,.6)+text((x0+x1)/2,y-3,label,INK,"middle")
    def dv(x,y0,y1,label): return line((x,y0),(x,y1),INK,.6)+line((x-3,y0),(x+3,y0),INK,.6)+line((x-3,y1),(x+3,y1),INK,.6)+f'<text transform="translate({x-3:.2f},{(y0+y1)/2:.2f}) rotate(-90)" fill="{INK}" font-family="{MONO}" font-size="{fs}" text-anchor="middle" letter-spacing=".05em">{label}</text>'
    dims.append(dh(X(0,0),X(0,M.W),ty,"84 = 4 x 21"))
    dims.append(dh(X(1,0),X(1,M.w),ty,"w 21"))
    dims.append(dh(X(2,M.W-M.w),X(2,M.W),ty,"w 21"))
    dims.append(dv(OX-20,Y(0),Y(M.H),"100 = 4 x 25"))
    dims.append(dv(OX-8,Y(0),Y(M.t),"t 25"))
    rx=OX+M.WORD_W+22
    dims.append(dv(rx,Y(M.STRIPE_Y),Y(M.STRIPE_Y+M.STRIPE_H),"8"))
    dims.append(dh(X(0,55),X(0,63),Y(33),"8"))
    # leaders
    cx,cy=X(2,M.W-26),Y(26)
    dims.append(line((cx+18,cy-18),(cx+34,cy-34),ACC,.6)+text(cx+37,cy-35,"R 26",ACC))
    foot=Y(M.H)+16
    dims.append(text(X(1,0),foot,"beak 15  thick 25",RULE)); dims.append(text(X(0,0),foot,"corners: circles R 6",RULE)); dims.append(text(X(2,0),foot,"stripe 8 = notch 8",RULE))
    d=M.word_d(OX,OY); i=next(M.uid)
    rects="".join(f'<rect x="{OX-2}" y="{OY+b0}" width="{M.WORD_W+4}" height="{b1-b0}" fill="{INK}"/>' for b0,b1 in M.BANDS)
    markg=f'<clipPath id="k{i}"><path d="{d}" clip-rule="evenodd"/></clipPath><path class="mark-ghost" d="{d}" fill="#16324a" fill-rule="evenodd"/><g class="mark" clip-path="url(#k{i})">{rects}</g>'
    VW=OX*2+M.WORD_W+(24 if hero else 40); VH=OY+M.H+(34 if hero else 64)
    extra=""
    if not hero:
        extra=f'<rect x="{VW-132:.1f}" y="{VH-30:.1f}" width="120" height="22" fill="none" stroke="{RULE}" stroke-width=".5"/>'+text(VW-128,VH-20,"FIG. 1  JCD MARK / CONSTRUCTION",INK,"start",3.6)+text(VW-128,VH-12,"UNIT 21 x 25  /  SHEET A-001",RULE,"start",3.4)
        extra+="".join(line((x-6,y),(x+6,y),RULE,.5)+line((x,y-6),(x,y+6),RULE,.5) for x,y in ((10,10),(VW-10,10),(10,VH-10),(VW-10,VH-10)))
    core=G("grid",grid)+G("bands",bands)+markg+G("frame",frame)+G("center",center)+G("fillets",fillets)+G("bowl",bowl)+G("dims",dims)
    return VW,VH,core+extra,core
VW,VH,body,core=build(False)
open("construction.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW:.1f} {VH:.1f}"><rect width="{VW}" height="{VH}" fill="{NAVY}"/>{body}</svg>')
open("preview.html","w").write(f'<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"><body style="margin:0;background:{NAVY}"><div style="width:{VW*3:.0f}px">'+open("construction.svg").read()+'</div>')
VW,VH,body,_c=build(True)
open("construction-hero.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW:.1f} {VH:.1f}" role="img" aria-label="JCD mark construction drawing">{body}</svg>')
print("ok",VW,VH)

VW0,VH0,_b,core=build(False)
open("construction-embed.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 34 {VW0:.1f} {VH0-44-34:.1f}" role="img" aria-label="Construction drawing of the JCD mark: three letters on a 4 by 4 module grid, stems 21 wide, bars 25 tall, corner radius 6, bowl radius 26, seven scanline bands 10 tall with 5 gaps.">{core}</svg>')
