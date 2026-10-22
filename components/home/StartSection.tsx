// DRAFT — Jason to edit
const solutionCards = [
  {
    n: "01",
    label: "Find the real problem",
    body: "It starts with a paid first phase: a diagnosis of how you run, or an assessment of what you plan to launch. Nothing gets designed or built until we write down the real question, with a shared definition of success. If the answer is not to build, that is what it says.",
  },
  {
    n: "02",
    label: "Design and build",
    body: "I write the architecture, specify what gets built, and build it. The diagnosis and the build stay in the same hands.",
  },
  {
    n: "03",
    label: "Hand it over",
    body: "Then I train your team and step back. What stays behind is something your people can run without my help.",
  },
];

const COLS = Array.from({ length: 12 }, (_, i) => i);

// One 12-column track: nine working-day columns and three shaded columns past the decision line.
function Track({ children }: { children?: React.ReactNode }) {
  return (
    <div className="trk">
      <div className="cols" aria-hidden="true">
        {COLS.map((i) => (
          <i key={i} className={i >= 9 ? "z" : undefined} />
        ))}
      </div>
      <span className="dec" aria-hidden="true" />
      {children}
    </div>
  );
}

// The schedule figure from the concept: an abstract Gantt of the paid first phase. No scale, column numbers, or day
// ranges, so it reads as the shape of the work, not a plan.
const stages = [
  { n: "01", label: "Interview with the owner", s: "0%", w: "16.667%", d: ".1s", mark: "A" },
  { n: "02", label: "How the business runs now", s: "8.333%", w: "33.333%", d: ".2s" },
  { n: "03", label: "What customers experience", s: "33.333%", w: "25%", d: ".3s" },
  { n: "04", label: "Written recommendation", s: "50%", w: "25%", d: ".4s" },
];

function ScheduleFigure() {
  return (
    <figure className="sheet" aria-labelledby="fig1" data-build>
      <div className="sheet-top">
        <div className="ttl">
          <span className="idx">FIG. 1</span>
          <b id="fig1">Find the real problem</b>
        </div>
      </div>

      <div className="rw hd">
        <div className="lab" />
        <div className="trk" aria-hidden="true">
          <div className="cols">
            {COLS.map((i) => (
              <i key={i} className={i >= 9 ? "z" : undefined} />
            ))}
          </div>
          <span className="dec" />
          <span className="mk hdm" style={{ left: "calc(75% + 26px)" }}>
            <b>[C]</b>
          </span>
        </div>
      </div>

      {stages.map((st) => (
        <div className="rw" key={st.n}>
          <div className="lab">
            <span className="idx">{st.n}</span>
            <span>{st.label}</span>
          </div>
          <Track>
            <span className="bx" style={{ "--s": st.s, "--w": st.w, "--d": st.d } as React.CSSProperties} aria-hidden="true" />
            {st.mark ? (
              <span className="mk" style={{ left: "calc(16.667% + 14px)" }} aria-hidden="true">
                <b>[{st.mark}]</b>
              </span>
            ) : null}
          </Track>
        </div>
      ))}

      <div className="rw last">
        <div className="lab">
          <span className="idx">05</span>
          <span>Decision: build or stop</span>
        </div>
        <Track>
          <span className="mk acc l" style={{ left: "calc(75% - 5px)" }} aria-hidden="true">
            <b>[B]</b>
          </span>
          <span className="bx dash" aria-hidden="true" />
          <span className="mk d" aria-hidden="true">
            <b>[D]</b>
          </span>
        </Track>
      </div>

      <figcaption className="foot">
        <div className="cap">
          <span className="idx">FIG. 1 — 01</span>
          <p>
            It starts with a paid diagnosis. Nothing gets designed or built until we write down what the
            problem is, with a shared definition of success.
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function StartSection() {
  return (
    <section data-sheet="A-103" data-name="START">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">Where I start</p>
          <h2>I find the real problem first. Then I build the answer.</h2>
        </div>
      </div>
      <ScheduleFigure />
      <div className="cells c3" data-build>
        {solutionCards.map((card) => (
          <article key={card.label} className="cell">
            <span className="idx">{card.n}</span>
            <h3>{card.label}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
