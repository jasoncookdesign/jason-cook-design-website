import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero page solo g" data-sheet="A-101" data-name="HERO">
      <div className="main">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <div>
          <p className="lead">
            The page you requested does not exist or has moved.
          </p>
        </div>
        <div className="actions">
          <Link href="/" className="btn">
            Return to Home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
