import type { ReactNode } from "react";

/**
 * The page as a drawing sheet: a bordered frame with registration marks at the corners and
 * twelve dashed column guides behind the content. Decorative and inert; the decoration comes
 * first in the DOM and is hidden from assistive technology.
 */
export default function SheetFrame({ children }: { children: ReactNode }) {
  return (
    <div className="frame">
      <div data-guides aria-hidden="true" className="guides">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div data-regs aria-hidden="true" className="regs">
        {Array.from({ length: 4 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      {children}
    </div>
  );
}
