// JCD report template — layout library. Called by the pandoc template and the Lua filter.

#let ink = rgb("#0E1013")
#let strong-body = rgb("#2A2E34")
#let body-c = rgb("#4A5058")
#let muted = rgb("#6B7078")
#let border = rgb("#E6E8EC")
#let ghost = rgb("#D4D7DC")
#let surface = rgb("#FAFAFA")
#let accent = rgb("#4DA3FF")
#let link-c = rgb("#176DBF")
#let band-body = rgb("#C8CCD2")
#let band-muted = rgb("#A8AEB6")

#let main-w = 4.6in
#let rail-gap = 0.3in
#let rail-w = 1.8in
#let wide-extra = rail-gap + rail-w

#let label(body) = text(font: "IBM Plex Mono", size: 7pt, weight: "medium", tracking: 0.08em, fill: muted, upper(body))

#let cover(title: "", subtitle: "", client: "", date: "", version: "", status: "") = page(
  margin: 0pt, fill: ink, header: none, footer: none,
  {
    place(top + left, dx: 0.9in, dy: 0.9in, text(font: "IBM Plex Mono", size: 8pt, tracking: 0.1em, fill: band-muted, upper("Jason Cook Design")))
    place(top + left, dx: 0.9in, dy: 3.6in, block(width: 5.4in, {
      rect(width: 0.6in, height: 4pt, fill: accent, radius: 0pt)
      v(0.25in)
      text(size: 38pt, weight: 700, fill: white, tracking: -0.02em, par(leading: 0.28em, title))
      if subtitle != "" { v(0.2in); text(size: 15pt, fill: band-body, subtitle) }
    }))
    place(bottom + left, dx: 0.9in, dy: -0.9in, block(width: 5in, {
      set text(font: "IBM Plex Mono", size: 8pt, fill: band-muted, tracking: 0.06em)
      grid(columns: (1.1in, 1fr), row-gutter: 0.8em,
        upper("Prepared for"), text(fill: white, client),
        upper("Date"), text(fill: white, date),
        upper("Version"), text(fill: white, version),
        upper("Status"), text(fill: white, status))
    }))
  })

// Section marker (#): small numbered label above a section.
#let section-marker(body) = {
  counter("section").step()
  block(above: 0.5in, below: 0.1in, sticky: true, context {
    label([#counter("section").display("01") — #body])
  })
}

// Action title (##): full-sentence finding.
#let action-title(body) = block(above: 0.3in, below: 0.18in, sticky: true, width: main-w,
  text(size: 19pt, weight: 700, fill: ink, tracking: -0.01em, par(leading: 0.32em, body)))

// Sub-argument (###): the MECE cut.
#let sub-arg(body) = block(above: 0.26in, below: 0.1in, sticky: true, width: main-w,
  text(size: 11pt, weight: 650, fill: strong-body, body))

#let leadin(body) = text(weight: 700, fill: ink, body)

#let chip(kind) = {
  let c = (Observed: rgb("#176DBF"), Inference: rgb("#2A2E34"), Speculation: rgb("#8A5A00"), Unverified: rgb("#A32A2A")).at(kind)
  box(baseline: 0.12em, inset: (x: 4pt, y: 2pt), radius: 2pt, stroke: 0.6pt + c,
    text(font: "IBM Plex Mono", size: 6.5pt, weight: "medium", tracking: 0.06em, fill: c, upper(kind)))
}

#let governing(body) = block(width: main-w, above: 0.2in, below: 0.25in, breakable: false,
  block(stroke: (left: 4pt + accent), inset: (left: 14pt),
    {
      label[Governing thought]
      v(0.3em)
      { set text(size: 13pt, weight: 600, fill: ink); set par(leading: 0.5em); body }
    }))

#let insight(body) = block(width: main-w, above: 0.22in, below: 0.22in, breakable: false, fill: surface, stroke: (top: 1.2pt + ink), inset: (x: 14pt, y: 12pt), {
  [#metadata("insight") <insight>]
  label[Insight]
  v(0.4em)
  text(size: 10pt, fill: strong-body, body)
})

#let note(body) = place(left, dx: main-w + rail-gap,
  block(width: rail-w, stroke: (top: 0.6pt + ghost), inset: (top: 5pt), { set text(size: 7.5pt, fill: muted); set par(leading: 0.5em); body }))

#let stats(items) = block(width: main-w, above: 0.2in, below: 0.25in, breakable: false,
  grid(columns: items.len() * (1fr,), column-gutter: 14pt,
    ..items.map(it => block(stroke: (top: 1.2pt + ink), inset: (top: 7pt), {
      stack(spacing: 0.35em, text(size: 20pt, weight: 700, fill: ink, features: ("tnum",), it.at(0)), text(size: 8pt, fill: muted, it.at(1)))
    }))))

#let exhibit-counter = counter("exhibit")
#let exhibit(title, source, body, wide: true) = {
  exhibit-counter.step()
  block(width: if wide { main-w + wide-extra } else { main-w }, above: 0.25in, below: 0.25in, breakable: true, {
    block(sticky: true, below: 0pt, {
    context label[Exhibit #exhibit-counter.display()]
    v(0.35em)
    text(size: 10.5pt, weight: 650, fill: ink, title)
    v(0.7em)
    })
    body
    v(0.6em)
    block(sticky: false, text(size: 7.5pt, fill: muted, source))
  })
}

#let fig-counter = counter("uifig")
// tier: "full" | "two-thirds" | "half". Annotation coordinates are percentages from the sidecar CSV.
#let ui-figure(src, alt, tier, caption, items, coords) = {
  fig-counter.step()
  let img-w = if tier == "full" { main-w } else if tier == "two-thirds" { main-w * 2 / 3 } else { main-w / 2 }
  let side = tier != "full"
  block(width: main-w + (if side { wide-extra } else { 0in }), above: 0.25in, below: 0.25in, breakable: false, {
    let framed = box(width: img-w, stroke: 0.8pt + ghost, radius: 2pt, clip: true, {
      image(src, alt: alt, width: 100%)
      for row in coords {
        let n = int(row.at(0))
        place(top + left, dx: float(row.at(1)) * 1%, dy: float(row.at(2)) * 1%,
          move(dx: -7pt, dy: -7pt, circle(radius: 7pt, fill: accent, stroke: 1pt + white, align(center + horizon, text(font: "IBM Plex Mono", size: 7pt, weight: 600, fill: ink, str(n))))))
      }
    })
    let list = items.enumerate().map(((i, it)) => grid(columns: (14pt, 1fr), column-gutter: 4pt,
      text(font: "IBM Plex Mono", size: 7.5pt, weight: 600, fill: link-c, str(i + 1)), text(size: 8.5pt, fill: strong-body, it)))
    if side {
      grid(columns: (img-w, wide-extra), column-gutter: 0pt,
        framed, pad(left: 0.2in, stack(spacing: 0.7em, ..list)))
    } else {
      framed
      v(0.6em)
      grid(columns: (1fr, 1fr), column-gutter: 14pt, row-gutter: 0.6em, ..list)
    }
    v(0.7em)
    text(size: 8pt, fill: muted, [#context [Figure #fig-counter.display().] #caption])
  })
}

#let report(title: "", subtitle: "", client: "", date: "", version: "", status: "", body) = {
  set document(title: title)
  set text(font: "Inter", size: 9.5pt, fill: body-c, lang: "en")
  show raw: set text(font: "IBM Plex Mono")
  set par(leading: 0.72em, spacing: 1em, justify: false)
  cover(title: title, subtitle: subtitle, client: client, date: date, version: version, status: status)
  set page(
    paper: "us-letter",
    margin: (left: 0.9in, right: 8.5in - 0.9in - main-w, top: 1in, bottom: 0.9in),
    fill: white,
    header: context {
      set text(font: "IBM Plex Mono", size: 7pt, fill: muted, tracking: 0.06em)
      block(width: 100% + wide-extra, grid(columns: (1fr, 1fr), upper(title), align(right, upper(client))))
      v(-0.4em)
      line(length: 100% + wide-extra, stroke: 0.4pt + border)
    },
    footer: context {
      set text(font: "IBM Plex Mono", size: 7pt, fill: muted)
      block(width: 100% + wide-extra, grid(columns: (1fr, 1fr), upper(status + " · v" + version), align(right + horizon, counter(page).display())))
    },
  )
  counter(page).update(1)
  set table(stroke: (x, y) => (bottom: if y == 0 { 1.2pt + ink } else { 0.4pt + border }), inset: (x, y) => (left: if x == 0 { 0pt } else { 6pt }, right: 6pt, y: 6pt))
  set table.cell(breakable: false)
  show table.cell.where(y: 0): set text(weight: 650, fill: ink, size: 8.5pt)
  show table: set text(size: 8.5pt, features: ("tnum",))
  show figure: set block(breakable: true)
  show figure.where(kind: table): it => { show align: a => a.body; it.body }
  show quote.where(block: true): it => block(width: main-w, inset: (left: 14pt), stroke: (left: 2pt + accent), text(size: 11pt, fill: ink, it.body))
  show link: set text(fill: link-c)
  show footnote.entry: set text(size: 7.5pt, fill: muted)
  body
}

// Hard gate: one insight per page.
#let check-insights() = context {
  let pages = query(<insight>).map(i => i.location().page())
  assert(pages.len() == pages.dedup().len(), message: "more than one insight on a page; pages: " + repr(pages))
}
