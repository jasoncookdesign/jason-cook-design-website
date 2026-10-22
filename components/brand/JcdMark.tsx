import { useId } from "react";
import { JCD_MARK } from "@/lib/jcd-mark";

type Props = {
  /** "stripe" cuts the letters with one full-width stripe; "solid" fills them. */
  variant?: "solid" | "stripe";
  /** When set, the mark is exposed as an image with this label. Otherwise it is decorative. */
  label?: string;
  className?: string;
  /** Adds a hidden rect over the stripe's gap, so a style can fill the mark solid (the header's hover flash). */
  morph?: boolean;
};

export default function JcdMark({ variant = "stripe", label, className, morph }: Props) {
  const clipId = `jcd-mark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { width, height, d, bands, stripe } = JCD_MARK;
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
        {variant === "stripe" ? (
          [
            <rect key="top" className="mk-top" x={-1} y={bands[0][0]} width={width + 2} height={bands[0][1] - bands[0][0]} />,
            ...(morph
              ? [<rect key="gap" className="mk-gap" x={-1} y={stripe.y0} width={width + 2} height={stripe.height} />]
              : []),
            <rect key="bot" className="mk-bot" x={-1} y={bands[1][0]} width={width + 2} height={bands[1][1] - bands[1][0]} />,
          ]
        ) : (
          <rect x={-1} y={-1} width={width + 2} height={height + 2} />
        )}
      </g>
    </svg>
  );
}
