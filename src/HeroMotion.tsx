import { useEffect, useRef, type ReactNode } from "react";

export default function HeroMotion({ children }: { children: ReactNode }) {
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = hero.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      for (const name of ["--shift-x", "--shift-y", "--tilt-x", "--tilt-y"])
        element.style.removeProperty(name);
    };
    const move = (event: PointerEvent) => {
      if (motion.matches || !pointer.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
        const nx = x / rect.width * 2 - 1;
        const ny = y / rect.height * 2 - 1;
        element.style.setProperty("--shift-x", `${nx * 9}px`);
        element.style.setProperty("--shift-y", `${ny * 7}px`);
        element.style.setProperty("--tilt-x", `${-ny * 3}deg`);
        element.style.setProperty("--tilt-y", `${nx * 3}deg`);
      });
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    motion.addEventListener("change", reset);
    pointer.addEventListener("change", reset);
    return () => {
      reset();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      motion.removeEventListener("change", reset);
      pointer.removeEventListener("change", reset);
    };
  }, []);

  return (
    <section ref={hero} className="hero-motion grid items-center gap-6 py-10 lg:min-h-[85vh] lg:grid-cols-2">
      {children}
    </section>
  );
}
