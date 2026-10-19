import { act, fireEvent, render, screen } from "@testing-library/react";
import LoopVideo from "@/components/work/LoopVideo";

// jsdom has no media playback, no IntersectionObserver, and no matchMedia, so each is stubbed here.
let intersect: (visible: boolean) => void;
let play: jest.Mock;
let pause: jest.Mock;

function stubEnvironment(reducedMotion: boolean) {
  play = jest.fn().mockResolvedValue(undefined);
  pause = jest.fn();
  Object.defineProperty(HTMLMediaElement.prototype, "play", { configurable: true, value: play });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", { configurable: true, value: pause });
  window.matchMedia = jest.fn().mockImplementation((q: string) => ({
    matches: reducedMotion && q.includes("prefers-reduced-motion"),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
  window.IntersectionObserver = jest.fn().mockImplementation((cb: IntersectionObserverCallback) => {
    intersect = (visible) => cb([{ isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver);
    return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
  }) as unknown as typeof window.IntersectionObserver;
}

const props = { src: "/images/loops/cs05_06.jpg", alt: "ConvoBar wireframes", width: 1000, height: 712 };
const video = (c: HTMLElement) => c.querySelector("video") as HTMLVideoElement;

describe("LoopVideo markup", () => {
  beforeEach(() => stubEnvironment(false));

  it("is a silent, inline, looping video with the poster still and the alt text as its name", () => {
    const { container } = render(<LoopVideo {...props} />);
    const v = video(container);
    expect(v.muted).toBe(true);
    expect(v.loop).toBe(true);
    expect(v.hasAttribute("playsinline")).toBe(true);
    expect(v.hasAttribute("controls")).toBe(false);
    expect(v.hasAttribute("autoplay")).toBe(false);
    expect(v.getAttribute("poster")).toBe(props.src);
    expect(v.getAttribute("aria-label")).toBe(props.alt);
    expect(v.getAttribute("width")).toBe("1000");
    expect(v.getAttribute("height")).toBe("712");
  });

  it("offers WebM first and MP4 as the fallback, both next to the poster", () => {
    const { container } = render(<LoopVideo {...props} />);
    const sources = Array.from(container.querySelectorAll("source")).map((s) => [s.getAttribute("src"), s.getAttribute("type")]);
    expect(sources).toEqual([
      ["/images/loops/cs05_06.webm", "video/webm"],
      ["/images/loops/cs05_06.mp4", "video/mp4"],
    ]);
  });
});

describe("LoopVideo playback", () => {
  it("plays while on screen and pauses when scrolled away", () => {
    stubEnvironment(false);
    const { container } = render(<LoopVideo {...props} />);
    expect(play).not.toHaveBeenCalled();
    act(() => intersect(true));
    expect(play).toHaveBeenCalledTimes(1);
    act(() => intersect(false));
    expect(pause).toHaveBeenCalledTimes(1);
    expect(video(container)).toBeTruthy();
  });

  it("stays on the poster still for visitors who prefer reduced motion, until they press play", () => {
    stubEnvironment(true);
    render(<LoopVideo {...props} />);
    act(() => intersect(true));
    expect(play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /play animation/i }));
    expect(play).toHaveBeenCalledTimes(1);
  });
});

describe("LoopVideo pause control (WCAG 2.2.2)", () => {
  it("has one keyboard-reachable button that pauses and resumes", async () => {
    stubEnvironment(false);
    render(<LoopVideo {...props} />);
    await act(async () => intersect(true));
    const button = screen.getByRole("button", { name: /pause animation/i });
    expect(button.tagName).toBe("BUTTON");
    fireEvent.click(button);
    expect(pause).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: /play animation/i }));
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("does not restart a loop the visitor paused when it scrolls back into view", async () => {
    stubEnvironment(false);
    render(<LoopVideo {...props} />);
    await act(async () => intersect(true));
    fireEvent.click(screen.getByRole("button", { name: /pause animation/i }));
    act(() => intersect(false));
    act(() => intersect(true));
    expect(play).toHaveBeenCalledTimes(1);
  });
});

describe("LoopVideo without browser support", () => {
  it("renders the poster and a working button when IntersectionObserver and matchMedia are missing", () => {
    stubEnvironment(false);
    // @ts-expect-error simulating an old browser
    delete window.IntersectionObserver;
    // @ts-expect-error simulating an old browser
    delete window.matchMedia;
    const { container } = render(<LoopVideo {...props} />);
    expect(video(container).getAttribute("poster")).toBe(props.src);
    fireEvent.click(screen.getByRole("button", { name: /play animation/i }));
    expect(play).toHaveBeenCalledTimes(1);
  });
});
