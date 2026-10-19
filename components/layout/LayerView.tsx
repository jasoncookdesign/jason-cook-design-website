"use client";

import { useEffect, useRef, useState } from "react";
import { mountLayerView, type LayerController, type LayerUiState } from "@/lib/layer-view";

const INITIAL: LayerUiState = { ready: false, on: false, status: "", showTiltButton: false, tiltLabel: "Show tilt", long: false };

/**
 * The layer-view control: an understated icon button (stacked layers) in the bar, and a one-line strip
 * under the bar with the tilt status and the current sheet. The controller (lib/layer-view.ts) owns the overlay
 * and the flags on <html>; this component owns the controls. The button is hidden until the script runs.
 */
export default function LayerView({ cue, onCue }: { cue: string; onCue: (t: string) => void }) {
  const [ui, setUi] = useState<LayerUiState>(INITIAL);
  const ctl = useRef<LayerController | null>(null);

  useEffect(() => {
    const c = mountLayerView({ onState: setUi, onCue });
    ctl.current = c;
    return () => {
      c?.destroy();
      ctl.current = null;
    };
  }, [onCue]);

  return (
    <>
      <button
        type="button"
        className="lv cursor-pointer"
        aria-pressed={ui.on}
        aria-label="Layers"
        title="Layers"
        hidden={!ui.ready}
        onClick={() => ctl.current?.toggle()}
      >
        {/* four stacked isometric layers: the top one whole, the lower ones as their front edges */}
        <svg className="lv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" aria-hidden="true" focusable="false">
          <path d="M12 2.5 L22 7 L12 11.5 L2 7 Z" />
          <path d="M2 11 L12 15.5 L22 11" />
          <path d="M2 15 L12 19.5 L22 15" />
          <path d="M2 19 L12 23.5 L22 19" />
        </svg>
      </button>
      <div className={`lvstrip${ui.long ? " long" : ""}`}>
        <span className="lft">
          <span className="st" role="status">
            {ui.status}
          </span>
          <button type="button" className="stb" hidden={!ui.showTiltButton} onClick={() => ctl.current?.toggleStillTilt()}>
            {ui.tiltLabel}
          </button>
        </span>
        <span className="cue" aria-hidden="true">
          {cue}
        </span>
      </div>
    </>
  );
}
