import ConstructionDrawing from "@/components/brand/ConstructionDrawing";

const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

// DRAFT — Jason to edit
const stats = [
  { value: "143", label: "countries unified in one system" },
  { value: "50+", label: "industry awards for shipped work" },
  { value: "4", label: "patents written or contributed" },
];

export default function Hero() {
  return (
    <section className="hero g" data-sheet="A-101" data-name="HERO">
      <div className="main">
        <p className="eyebrow">
          For businesses with a new offering to launch or a system to fix
        </p>
        <h1>
          Get a working system that solves the problem you{" "}
          <span className="em">actually</span> have.
        </h1>
        <div>
          <p className="lead">
            I&apos;ve built systems like this at enterprise scale. That&apos;s how I
            know which parts you can leave out.
          </p>
        </div>
        <div className="actions">
          <a className="btn" href={CTA_URL} target="_blank" rel="noopener noreferrer">
            Book your strategy call <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="strip">
            <span className="a">No commitment. 20 minutes.</span>{" "}
            <span className="b">Find out what you need &mdash; and what you don&apos;t.</span>
          </p>
        </div>
      </div>

      <div className="side">
        <ConstructionDrawing />
        <p className="idx drawing-cap">FIG. 0 · JCD MARK, CONSTRUCTION</p>
      </div>

      <p className="scope">
        Architecture, design specification, implementation, and the training to
        run it &mdash; delivered end-to-end, or I&apos;ll help you make it
        happen.
      </p>

      <div className="statrow">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className="v">{stat.value}</span>
            <span className="l">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
