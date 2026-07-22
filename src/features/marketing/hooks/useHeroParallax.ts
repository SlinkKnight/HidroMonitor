import { useEffect, useRef } from "react";

/** Scroll-driven parallax for the hero's blur blobs, heading text, and floating card. Skips on reduced-motion or coarse pointers (touch). */
export function useHeroParallax() {
  const blurRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const noParallax =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches;
    if (noParallax) return;

    for (const el of [blurRef, textRef, cardRef]) {
      if (el.current) el.current.style.willChange = "transform";
    }

    let ticking = false;
    const apply = () => {
      const y = Math.max(0, window.scrollY);
      if (blurRef.current) blurRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      if (textRef.current) textRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
      if (cardRef.current) cardRef.current.style.transform = `translate3d(0, ${y * 0.14}px, 0)`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { blurRef, textRef, cardRef };
}
