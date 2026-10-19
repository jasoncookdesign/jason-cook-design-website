import { JCD_CONSTRUCTION } from "@/lib/jcd-construction";

const LABEL =
  "Construction drawing of the JCD mark: three letters, each on a 4 by 4 module grid, stems 21 wide, bars 25 tall, corner radius 6, bowl radius 26, and one stripe 8 thick, equal to the J's notch.";

/** The blueprint drawing: the JCD mark and how it is built. Decorative motion only; see bp-drawing.css. */
export default function ConstructionDrawing({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `drawing ${className}` : "drawing"}
      viewBox={JCD_CONSTRUCTION.viewBox}
      role="img"
      aria-label={LABEL}
      dangerouslySetInnerHTML={{ __html: JCD_CONSTRUCTION.inner }}
    />
  );
}
