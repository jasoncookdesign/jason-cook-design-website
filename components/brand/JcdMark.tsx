import { useId } from "react";
import { JCD_MARK } from "@/lib/jcd-mark";

type Props = {
  /** "scanline" cuts the letters with seven aligned bands; "solid" fills them. */
  variant?: "solid" | "scanline";
  /** When set, the mark is exposed as an image with this label. Otherwise it is decorative. */
  label?: string;
  className?: string;
};

export default function JcdMark({ variant = "scanline", label, className }: Props) {
  const clipId = `jcd-mark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { width, height, d, bands } = JCD_MARK;
  const labelled = typeof label === "string" && label.length > 0;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      className={className}
      focusable="false"
      {...(labelled ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={d} clipRule="evenodd" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {variant === "scanline" ? (
          bands.map(([y0, y1]) => (
            <rect key={y0} x={-1} y={y0} width={width + 2} height={y1 - y0} />
          ))
        ) : (
          <rect x={-1} y={-1} width={width + 2} height={height + 2} />
        )}
      </g>
    </svg>
  );
}
