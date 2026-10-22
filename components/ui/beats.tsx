import type { ReactNode } from "react";

export type Placed<B> = { block: B; fig: number };

// Groups each figure with the run of text just before it, so a wide screen can set them side by side (see .beats in
// bp-content.css). A figure with no text before it is a beat of its own, so every figure lands in the same column.
// Text with no figure after it stays a plain sibling.
export function renderBeats<B extends { type: string }>(
  blocks: Placed<B>[],
  renderBlock: (block: B, idx: number, fig: number) => ReactNode,
) {
  const out: ReactNode[] = [];
  let run: Placed<B>[] = [];
  const flush = () => {
    run.forEach(({ block, fig }, i) => out.push(renderBlock(block, out.length + i, fig)));
    run = [];
  };
  blocks.forEach(({ block, fig }, i) => {
    if (block.type !== "img") {
      run.push({ block, fig });
    } else if (run.length) {
      out.push(
        <div key={`beat-${i}`} className="beat">
          <div className="beat-text">{run.map((r, j) => renderBlock(r.block, j, r.fig))}</div>
          {renderBlock(block, i, fig)}
        </div>,
      );
      run = [];
    } else {
      out.push(
        <div key={`beat-${i}`} className="beat">
          {renderBlock(block, i, fig)}
        </div>,
      );
    }
  });
  flush();
  return out;
}
