/**
 * Layer view: exposes the page's structure. Each plate ([data-sheet]) gets a sketch layer behind it (padding
 * hatch, column guides in the padding bands, outline) and an annotation layer in its plane (gaps, padding values,
 * a dimension gutter, and a one-line legend under the last plate). Plates can tilt a few degrees.
 *
 * Everything drawn is measured from layout (offsetLeft/Top chained through offsetParent, clientLeft/Top,
 * getComputedStyle), never from getBoundingClientRect, so the numbers are the same with the tilt on or off.
 * The controller owns the overlay and the flags on <html>; React owns the controls (see LayerView.tsx).
 */
export type LayerUiState = {
  ready: boolean;
  on: boolean;
  status: string;
  showTiltButton: boolean;
  tiltLabel: string;
  long: boolean;
};
export type LayerController = { toggle(): void; toggleStillTilt(): void; destroy(): void };
type Callbacks = { onState(s: LayerUiState): void; onCue(t: string): void };

const NS = "http://www.w3.org/2000/svg";
const CW = 0.6; // monospace advance in em, for sizing chips

type Pt = { x: number; y: number };
type Kid = { x: number; y: number; w: number; h: number };
type Label = [number, number, { t: string; k?: string }[], ("middle" | "end" | "start")?, number?];

const fmt = (n: number) => String(+n.toFixed(1));

function S(name: string, attrs: Record<string, string | number>, parent?: Element): SVGElement {
  const e = document.createElementNS(NS, name) as SVGElement;
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  if (parent) parent.appendChild(e);
  return e;
}

/** Position of el inside root's border box (root null: the document), from layout values only. */
function pos(el: HTMLElement, root: HTMLElement | null): Pt {
  let x = 0;
  let y = 0;
  let e: HTMLElement | null = el;
  while (e && e !== root) {
    const p = e.offsetParent as HTMLElement | null;
    x += e.offsetLeft;
    y += e.offsetTop;
    if (p) {
      x += p.clientLeft;
      y += p.clientTop;
    }
    e = p;
  }
  return { x, y };
}

export function mountLayerView(cb: Callbacks): LayerController | null {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  const h = document.documentElement;
  const frame = document.querySelector<HTMLElement>(".frame");
  const bar = document.querySelector<HTMLElement>(".bar");
  if (!("ResizeObserver" in window) || !frame || !bar) return null;

  const mqC = window.matchMedia("(max-width: 899px)");
  const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
  const forcedRm = !!new URLSearchParams(location.search).get("reduced");

  let built = false;
  let ro: ResizeObserver | null = null;
  let mo: MutationObserver | null = null;
  let queued = false;
  let queuedS = false;
  let tops: { root: HTMLElement; top: number; code: string; name: string }[] = [];
  let lastCue = "";
  let destroyed = false;

  const sheets = (): HTMLElement[] => Array.from(document.querySelectorAll<HTMLElement>("[data-sheet]"));
  const isFlat = (r: HTMLElement) => r.hasAttribute("data-flat");
  const isOn = () => h.classList.contains("layers");
  const isRm = () => h.classList.contains("rm");
  const tiltOn = () => isOn() && (!isRm() || h.classList.contains("rmtilt"));
  const store = (k: string, v: string) => {
    try {
      sessionStorage.setItem(k, v);
    } catch {
      /* storage blocked: state just does not persist */
    }
  };

  function statusText(): string {
    if (!isOn()) return "";
    if (tiltOn()) return isRm() ? "TILT ON (STILL, REDUCED MOTION)" : "TILT ON";
    return isRm() ? "TILT OFF: REDUCED MOTION" : "TILT OFF";
  }
  function emit() {
    cb.onState({
      ready: true,
      on: isOn(),
      status: statusText(),
      showTiltButton: isOn() && isRm(),
      tiltLabel: h.classList.contains("rmtilt") ? "Flat" : "Show tilt",
      long: isRm(),
    });
  }

  function chip(g: Element, x: number, y: number, segs: { t: string; k?: string }[], anchor: string, fs: number, maxw?: number) {
    const n = segs.reduce((a, s) => a + s.t.length, 0);
    let w = Math.ceil(n * fs * CW) + 8;
    const hh = fs + 5;
    if (maxw && w > maxw) w = Math.max(Math.ceil(n * fs * CW) + 2, maxw);
    const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
    S("rect", { class: "chip", x: x0, y: y - hh / 2, width: w, height: hh }, g);
    const t = S("text", { x: x0 + (w - Math.ceil(n * fs * CW)) / 2, y: y + fs * 0.35, "font-size": fs }, g);
    segs.forEach((s) => {
      const ts = S("tspan", s.k ? { "data-k": s.k } : {}, t);
      ts.textContent = s.t;
    });
  }

  function getSvg(root: HTMLElement, cls: string): SVGElement {
    let s = root.querySelector<SVGElement>(":scope > svg." + cls);
    if (!s) {
      s = S("svg", { class: "ly " + cls, "aria-hidden": "true", focusable: "false" });
      root.appendChild(s);
    }
    return s;
  }

  function render(root: HTMLElement, legendRoot: HTMLElement | undefined) {
    const cs = getComputedStyle(root);
    const W = parseFloat(cs.width) || 0;
    const H = parseFloat(cs.height) || 0;
    const pt = parseFloat(cs.paddingTop) || 0;
    const pr = parseFloat(cs.paddingRight) || 0;
    const pb = parseFloat(cs.paddingBottom) || 0;
    const pl = parseFloat(cs.paddingLeft) || 0;
    const code = root.dataset.sheet ?? "";
    const name = root.dataset.name ?? "";
    const id = code.replace(/\W/g, "");
    const compact = mqC.matches;
    const fs = compact ? 10 : 11;
    const sk = getSvg(root, "sk");
    const an = getSvg(root, "an");
    [sk, an].forEach((svg) => {
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H));
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      (svg as unknown as HTMLElement).style.left = -root.clientLeft + "px";
      (svg as unknown as HTMLElement).style.top = -root.clientTop + "px";
      svg.replaceChildren();
    });

    const kids: Kid[] = Array.from(root.children as HTMLCollectionOf<HTMLElement>)
      .filter((c) => !c.matches(".sk,.an,.dl,.lvstrip") && c.offsetWidth > 0 && c.offsetHeight > 0)
      .map((c) => {
        const p = pos(c, root);
        return { x: p.x, y: p.y, w: c.offsetWidth, h: c.offsetHeight };
      });

    /* ---- sketch layer (behind the plate): padding hatch, guides in the bands, outline ---- */
    const defs = S("defs", {}, sk);
    const pp = S("pattern", { id: "pp" + id, width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    S("line", { x1: 0, y1: 0, x2: 0, y2: 6, class: "hl" }, pp);
    const gdefs = S("defs", {}, an);
    const gp = S("pattern", { id: "gp" + id, width: 4, height: 4, patternUnits: "userSpaceOnUse" }, gdefs);
    S("line", { x1: 0, y1: 0, x2: 0, y2: 4, class: "hl" }, gp);

    const labels: Label[] = [];
    const mh = Math.max(H - pt - pb, 0);
    const ph = `url(#pp${id})`;
    if (pt > 0) S("rect", { x: 0, y: 0, width: W, height: pt, fill: ph }, sk);
    if (pb > 0) S("rect", { x: 0, y: H - pb, width: W, height: pb, fill: ph }, sk);
    if (pl > 0) S("rect", { x: 0, y: pt, width: pl, height: mh, fill: ph }, sk);
    if (pr > 0) S("rect", { x: W - pr, y: pt, width: pr, height: mh, fill: ph }, sk);
    if (pt > 0) labels.push([W / 2, pt >= 36 ? pt - 10 : pt / 2, [{ t: fmt(pt), k: "pad-t" }]]);
    if (pb > 0) labels.push([W / 2, H - pb / 2, [{ t: fmt(pb), k: "pad-b" }]]);
    if (pl > 0) labels.push([pl / 2, pt + mh / 2, [{ t: fmt(pl), k: "pad-l" }], "middle", pl - 1]);
    if (pr > 0) labels.push([W - pr / 2, pt + mh / 2, [{ t: fmt(pr), k: "pad-r" }], "middle", pr - 1]);

    /* column guides, from the resolved grid template, drawn only inside the padding bands (empty space) */
    const cont = root;
    if (pt > 0 || pb > 0) {
      const cc = getComputedStyle(cont);
      const tr = cc.display === "grid" ? cc.gridTemplateColumns.split(" ").map(parseFloat).filter(isFinite) : [];
      if (tr.length > 1) {
        let x0 = root.clientLeft + pl;
        const gap = parseFloat(cc.columnGap) || 0;
        const xs: number[] = [];
        tr.forEach((w) => {
          xs.push(x0);
          x0 += w;
          if (gap > 0) xs.push(x0);
          x0 += gap;
        });
        xs.push(x0 - gap);
        xs.forEach((x) => {
          if (pt > 0) S("line", { class: "gl", x1: x, y1: 0, x2: x, y2: pt }, sk);
          if (pb > 0) S("line", { class: "gl", x1: x, y1: H - pb, x2: x, y2: H }, sk);
        });
      }
    }
    S("rect", { class: "out", x: 0.5, y: 0.5, width: Math.max(W - 1, 0), height: Math.max(H - 1, 0) }, sk);
    const L = 16;
    [
      `M1.5 ${L} V1.5 H${L}`,
      `M${W - L} 1.5 H${W - 1.5} V${L}`,
      `M1.5 ${H - L} V${H - 1.5} H${L}`,
      `M${W - L} ${H - 1.5} H${W - 1.5} V${H - L}`,
    ].forEach((d) => S("path", { class: "corner", d }, sk));

    /* ---- annotation layer (in the plate plane, so it stays registered): gaps, band values, gutter ---- */
    const gx = parseFloat(cs.columnGap) || 0;
    const gy = parseFloat(cs.rowGap) || 0;
    const flex = /flex|grid/.test(cs.display);
    const byX = kids.slice().sort((a, b) => a.x - b.x);
    const byY = kids.slice().sort((a, b) => a.y - b.y);
    if (flex && gx > 0)
      for (let i = 0; i < byX.length - 1; i++) {
        const a = byX[i];
        const b = byX[i + 1];
        const d = b.x - (a.x + a.w);
        if (Math.abs(d - gx) <= 1.5 && a.y < b.y + b.h && b.y < a.y + a.h) {
          const y1 = Math.min(a.y, b.y);
          const y2 = Math.max(a.y + a.h, b.y + b.h);
          S("rect", { x: a.x + a.w + 1, y: y1, width: Math.max(gx - 2, 0), height: y2 - y1, fill: `url(#gp${id})` }, an);
          if (gx >= 22) labels.push([a.x + a.w + gx / 2, (y1 + y2) / 2, [{ t: fmt(gx), k: "gap" }]]);
        }
      }
    if (flex && gy > 0)
      for (let j = 0; j < byY.length - 1; j++) {
        const c = byY[j];
        const e = byY[j + 1];
        const dy = e.y - (c.y + c.h);
        if (Math.abs(dy - gy) <= 1.5 && c.x < e.x + e.w && e.x < c.x + c.w) {
          const x1 = Math.min(c.x, e.x);
          const x2 = Math.max(c.x + c.w, e.x + e.w);
          S("rect", { x: x1, y: c.y + c.h + 1, width: x2 - x1, height: Math.max(gy - 2, 0), fill: `url(#gp${id})` }, an);
          if (gy >= 14) labels.push([(x1 + x2) / 2, c.y + c.h + gy / 2, [{ t: fmt(gy), k: "gap" }]]);
        }
      }
    labels.forEach((l) => chip(an, l[0], l[1], l[2], l[3] ?? "middle", fs, l[4]));

    /* gutter: one vertical dimension line with extension lines, and two lines of text (tag and size) */
    const dx = compact ? -4 : -6;
    const ax = compact ? -12 : -14;
    const bx = compact ? -23 : -26;
    S("line", { class: "ln", x1: -1, y1: 0, x2: dx - 5, y2: 0 }, an);
    S("line", { class: "ln", x1: -1, y1: H, x2: dx - 5, y2: H }, an);
    S("line", { class: "ln", x1: dx, y1: 0, x2: dx, y2: H }, an);
    S("line", { class: "tk", x1: dx - 3, y1: 3, x2: dx + 3, y2: -3 }, an);
    S("line", { class: "tk", x1: dx - 3, y1: H + 3, x2: dx + 3, y2: H - 3 }, an);
    const ta = S("text", { transform: `translate(${ax},${H / 2}) rotate(-90)`, "text-anchor": "middle", "font-size": fs }, an);
    ta.textContent = H <= 60 ? code : code + "  " + name;
    const tb = S("text", { transform: `translate(${bx},${H / 2}) rotate(-90)`, "text-anchor": "middle", "font-size": fs }, an);
    ([["w", fmt(W)], [null, " × "], ["h", fmt(H)]] as const).forEach((p) => {
      const ts = S("tspan", p[0] ? { "data-k": p[0] } : {}, tb);
      ts.textContent = p[1];
    });

    /* one compact legend line under the last plate, with the tilt status */
    if (root === legendRoot) {
      const lg = S("g", {}, an);
      let x = 0;
      const y = H + (compact ? 20 : 24);
      const lf = compact ? 10 : 11;
      [["pp", "PADDING"], ["gp", "GAP"]].forEach((it) => {
        S("rect", { class: "sw", x, y: y - 6, width: 16, height: 12, fill: `url(#${it[0]}${id})` }, lg);
        const t = S("text", { x: x + 22, y: y + lf * 0.35, "font-size": lf }, lg);
        t.textContent = it[1];
        x += 22 + it[1].length * lf * CW + 18;
      });
      const tail = compact ? "PX FROM LAYOUT" : "PX READ FROM LAYOUT   " + statusText();
      const t2 = S("text", { x, y: y + lf * 0.35, "font-size": lf }, lg);
      t2.textContent = tail;
    }

    /* drop lines from the plate corners back to the sketch layer */
    const dls = root.querySelectorAll<HTMLElement>(":scope > .dl");
    const pts = [[0, 0], [W - 2, 0], [0, H], [W - 2, H]];
    for (let q = 0; q < dls.length && q < 4; q++) {
      dls[q].style.left = pts[q][0] - root.clientLeft + "px";
      dls[q].style.top = pts[q][1] - root.clientTop + "px";
    }
  }

  function ensureBuilt() {
    sheets().forEach((root) => {
      if (isFlat(root) || root.querySelector(":scope > .dl")) return;
      for (let i = 0; i < 4; i++) {
        const d = document.createElement("span");
        d.className = "dl";
        d.setAttribute("aria-hidden", "true");
        root.appendChild(d);
      }
    });
    built = true;
  }
  function renderAll() {
    const all = sheets();
    const legendRoot = all.filter((r) => !isFlat(r)).pop();
    all.forEach((r) => render(r, legendRoot));
  }
  function measureTops() {
    tops = sheets()
      .filter((r) => !isFlat(r))
      .map((r) => ({ root: r, top: pos(r, null).y, code: r.dataset.sheet ?? "", name: r.dataset.name ?? "" }));
  }
  function refreshOrigins(y?: number) {
    const yy = y == null ? window.scrollY || 0 : y;
    const c = yy + window.innerHeight / 2;
    tops.forEach((t) => t.root.style.setProperty("--oy", (c - t.top).toFixed(1) + "px"));
  }
  function sched() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      if (destroyed) return;
      measureTops();
      if (isOn()) {
        ensureBuilt();
        renderAll();
      }
    });
  }
  function observe() {
    unobserve();
    ro = new ResizeObserver(sched);
    sheets().forEach((r) => ro!.observe(r, { box: "border-box" }));
    mo = new MutationObserver((recs) => {
      for (const rec of recs) {
        let t = rec.target as Node | null;
        t = t && t.nodeType === 1 ? t : t && t.parentElement;
        if (t && !(t as HTMLElement).closest(".sk,.an,.dl,.lvstrip")) {
          sched();
          return;
        }
      }
    });
    sheets().forEach((r) => mo!.observe(r, { childList: true, subtree: true, characterData: true }));
  }
  function unobserve() {
    if (ro) ro.disconnect();
    if (mo) mo.disconnect();
    ro = null;
    mo = null;
  }

  /* ---- current sheet cue ---- */
  function setCue(txt: string) {
    if (txt === lastCue) return;
    lastCue = txt;
    cb.onCue(txt);
  }
  function onScrollFrame() {
    queuedS = false;
    if (destroyed) return;
    const y = window.scrollY || 0;
    const line = y + window.innerHeight * 0.4;
    let cur: (typeof tops)[number] | null = null;
    for (const t of tops) if (t.top <= line) cur = t;
    setCue(cur ? cur.code + " " + cur.name : (bar!.dataset.sheet ?? "") + " " + (bar!.dataset.name ?? ""));
    if (tiltOn()) refreshOrigins(y);
  }
  /* The tilt pulls in while the page scrolls and relaxes once it has been still (CSS eases --eng; see blueprint-layers.css) */
  const STILL_MS = 240;
  let stillTimer: ReturnType<typeof setTimeout> | undefined;
  function clearMoving() {
    if (stillTimer !== undefined) clearTimeout(stillTimer);
    stillTimer = undefined;
    h.classList.remove("moving");
  }
  function markMoving() {
    if (!tiltOn() || isRm()) return;
    h.classList.add("moving");
    if (stillTimer !== undefined) clearTimeout(stillTimer);
    stillTimer = setTimeout(clearMoving, STILL_MS);
  }
  function onScroll() {
    markMoving();
    if (queuedS) return;
    queuedS = true;
    requestAnimationFrame(onScrollFrame);
  }

  /* ---- state ---- */
  function syncTilt() {
    const t = tiltOn();
    if (t) refreshOrigins();
    h.classList.toggle("t3d", t);
    emit();
    if (isOn()) renderAll();
  }
  /* While a tilted view eases out, plates keep their paper (CSS fades it); `leaving` marks that window */
  const LEAVE_MS = 700;
  let leaveTimer: ReturnType<typeof setTimeout> | undefined;
  function clearLeaving() {
    if (leaveTimer !== undefined) clearTimeout(leaveTimer);
    leaveTimer = undefined;
    h.classList.remove("leaving");
  }
  function startLeaving() {
    clearLeaving();
    h.classList.add("leaving");
    leaveTimer = setTimeout(clearLeaving, LEAVE_MS);
  }
  function setOn(on: boolean) {
    if (on) clearLeaving();
    else if (tiltOn()) startLeaving();
    if (on) {
      ensureBuilt();
      measureTops();
      renderAll();
      void document.body.offsetWidth;
    }
    h.classList.toggle("layers", on);
    if (!on) clearMoving();
    syncTilt();
    if (on) observe();
    else unobserve();
    store("jcd-layers", on ? "1" : "0");
  }

  /* self-check: drawn label values against the layout, measured with the tilt and any animation neutralised */
  (window as unknown as { __layerCheck?: unknown }).__layerCheck = function () {
    ensureBuilt();
    measureTops();
    renderAll();
    return sheets().map((root) => {
      const svg = root.querySelector(":scope > svg.an");
      const num = (k: string) => {
        const n = svg && svg.querySelector(`[data-k="${k}"]`);
        return n ? parseFloat(n.textContent ?? "") : NaN;
      };
      const tilted = tiltOn() && !isFlat(root);
      const tiltRect = root.getBoundingClientRect();
      const pT = root.style.transform;
      const pTr = root.style.transition;
      const pA = root.style.animation;
      root.style.animation = "none";
      root.style.transition = "none";
      root.style.transform = "none";
      const r0 = root.getBoundingClientRect();
      root.style.transform = pT;
      root.style.animation = pA;
      void root.offsetWidth;
      root.style.transition = pTr;
      const cs = getComputedStyle(root);
      const padActual = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map((v) => +(parseFloat(v) || 0).toFixed(1));
      const padDrawn = ["t", "r", "b", "l"].map((s) => {
        const v = num("pad-" + s);
        return isNaN(v) ? 0 : v;
      });
      const dw = num("w");
      const dh = num("h");
      const okPad = padActual.every((v, i) => Math.abs(v - padDrawn[i]) <= 0.05);
      return {
        sheet: root.dataset.sheet,
        name: root.dataset.name,
        drawnW: dw,
        drawnH: dh,
        actualW: +r0.width.toFixed(2),
        actualH: +r0.height.toFixed(2),
        tilted,
        transform: getComputedStyle(root).transform === "none" ? "none" : "matrix3d",
        tiltedRectW: +tiltRect.width.toFixed(2),
        tiltedRectH: +tiltRect.height.toFixed(2),
        padDrawn,
        padActual,
        ok: Math.abs(dw - r0.width) <= 0.05 && Math.abs(dh - r0.height) <= 0.05 && okPad,
      };
    });
  };

  /* ---- init ---- */
  const onResize = () => sched();
  const onRm = (e: MediaQueryListEvent) => {
    h.classList.toggle("rm", e.matches);
    syncTilt();
  };
  const frameRo = new ResizeObserver(() => {
    measureTops();
    onScrollFrame();
  });
  frameRo.observe(frame);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  if (!forcedRm && mqR.addEventListener) mqR.addEventListener("change", onRm);
  // the page content changes on navigation: re-measure and re-observe the new plates
  const main = document.querySelector("main");
  const mainMo = main
    ? new MutationObserver(() => {
        measureTops();
        if (isOn()) {
          ensureBuilt();
          renderAll();
          observe();
        }
        onScrollFrame();
      })
    : null;
  if (main && mainMo) mainMo.observe(main, { childList: true });

  measureTops();
  if (isOn()) {
    ensureBuilt();
    renderAll();
    observe();
    if (tiltOn()) refreshOrigins();
  }
  emit();
  onScrollFrame();
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(() => {
      if (destroyed) return;
      measureTops();
      if (isOn()) renderAll();
    });
  requestAnimationFrame(() => requestAnimationFrame(() => h.classList.remove("boot")));
  void built;

  return {
    toggle() {
      setOn(!isOn());
    },
    toggleStillTilt() {
      const on = !h.classList.contains("rmtilt");
      h.classList.toggle("rmtilt", on);
      store("jcd-rmtilt", on ? "1" : "0");
      syncTilt();
    },
    destroy() {
      destroyed = true;
      clearMoving();
      clearLeaving();
      unobserve();
      frameRo.disconnect();
      mainMo?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (!forcedRm && mqR.removeEventListener) mqR.removeEventListener("change", onRm);
    },
  };
}
