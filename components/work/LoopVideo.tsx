"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** The poster still, e.g. /images/loops/name.jpg. The WebM and MP4 share its name. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * A silent looping animation. It plays only while on screen, shows the poster still to visitors who prefer reduced
 * motion, and carries one pause/play button so the motion can be stopped (WCAG 2.2.2). A visitor's pause sticks.
 */
export default function LoopVideo({ src, alt, width, height }: Props) {
  const base = src.replace(/\.jpg$/, "");
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  const start = () => {
    ref.current?.play()?.then(() => setPlaying(true), () => setPlaying(false));
  };
  const stop = () => {
    ref.current?.pause();
    setPlaying(false);
  };

  useEffect(() => {
    userPaused.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const el = ref.current;
    // Without IntersectionObserver the poster stays up and the button still plays it.
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!userPaused.current) start();
      } else {
        stop();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    if (playing) {
      userPaused.current = true;
      stop();
    } else {
      userPaused.current = false;
      start();
    }
  };

  return (
    <div className="loop">
      <video ref={ref} muted loop playsInline preload="none" poster={src} aria-label={alt} width={width} height={height}>
        <source src={`${base}.webm`} type="video/webm" />
        <source src={`${base}.mp4`} type="video/mp4" />
      </video>
      <button type="button" className="loop-toggle" data-state={playing ? "playing" : "paused"} onClick={toggle} aria-label={playing ? "Pause animation" : "Play animation"} />
    </div>
  );
}
