import { useEffect, useRef } from "react";
import { IcosahedronGeometry } from "three";

type Point = { x: number; y: number; z: number };
type Anchor = { element: HTMLElement; width: number; stop: number; color: string };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (t: number) => Math.max(0, Math.min(1, t));
const ease = (t: number) => t * t * (3 - 2 * t);

function mesh(detail: number): Point[] {
  const geometry = new IcosahedronGeometry(1, detail);
  const position = geometry.getAttribute("position");
  const points = Array.from({ length: position.count }, (_, i) => ({ x: position.getX(i), y: position.getY(i), z: position.getZ(i) }));
  geometry.dispose();
  return points;
}

export default function ScrollAccent() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    const ctx = surface?.getContext("2d");
    const origin = document.querySelector<HTMLElement>("[data-scroll-origin]");
    if (!surface || !ctx || !origin) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const headings = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-title]"));
    const heroMesh = mesh(2), accentMesh = mesh(0);
    let anchors: Anchor[] = [];
    let frame = 0, lastTime = 0, angle = 0;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      surface.width = innerWidth * ratio; surface.height = innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      anchors = headings.map(element => {
        const style = getComputedStyle(element);
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const width = ctx.measureText(element.textContent || "").width;
        const rect = element.getBoundingClientRect();
        const section = element.closest("section")!;
        const sticky = section.querySelector<HTMLElement>(".sticky");
        const top = sticky ? section.getBoundingClientRect().top + scrollY + rect.top - sticky.getBoundingClientRect().top : rect.top + scrollY;
        const color = element.nextElementSibling ? getComputedStyle(element.nextElementSibling).backgroundColor : "#2f5bea";
        return { element, width, color, stop: Math.max(1, Math.min(document.documentElement.scrollHeight - innerHeight, top + rect.height / 2 - innerHeight * .42)) };
      });
      wake();
    };
    const draw = (time: number) => {
      frame = 0;
      if (disposed) return;
      const delta = Math.min((time - lastTime) / 1000, .05); lastTime = time;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (document.hidden || !anchors.length) return;
      const hero = origin.getBoundingClientRect();
      const heroCenter = { x: hero.left + hero.width / 2, y: hero.top + hero.height / 2 };
      let index = anchors.findIndex(a => scrollY < a.stop);
      if (index < 0) index = anchors.length;
      const from = index > 0 ? anchors[index - 1] : null;
      const to = anchors[index] || from!;
      const holdingProjects = from?.element.closest("section")?.id === "projects";
      const start = holdingProjects ? Math.max(from!.stop, to.stop - innerHeight * .65) : from?.stop || 0;
      const progress = index === anchors.length ? 1 : clamp((scrollY - start) / Math.max(1, to.stop - start));
      const radiusSmall = innerWidth < 768 ? 14 : 17;
      const location = (anchor: Anchor) => {
        const rect = anchor.element.getBoundingClientRect();
        return { x: Math.min(innerWidth - radiusSmall - 16, rect.left + anchor.width + radiusSmall + 14), y: rect.top + rect.height / 2 };
      };
      const previous = from ? location(from) : heroCenter;
      const next = location(to);
      // Hold briefly beside a heading before continuing towards the next one.
      const journey = ease(clamp((progress - .12) / .76));
      const x = reduced.matches ? heroCenter.x : mix(previous.x, next.x, journey);
      const y = reduced.matches ? heroCenter.y : mix(previous.y, next.y, journey);
      const shrink = reduced.matches ? 0 : from ? 1 : ease(clamp(progress / .7));
      const radius = mix(hero.width * .42, radiusSmall, shrink);
      if (!reduced.matches) angle += delta * .22;
      const sin = Math.sin(angle), cos = Math.cos(angle);
      const render = (points: Point[], opacity: number) => {
        if (opacity <= 0) return;
        const projected = points.map(p => ({
          x: x + (p.x * cos + p.z * sin) * radius,
          y: y + (p.y * .98 - (p.z * cos - p.x * sin) * .18) * radius,
        }));
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = shrink > .5 ? to.color : "#2f5bea";
        ctx.lineWidth = mix(.85, 1.15, shrink); ctx.beginPath();
        for (let i = 0; i < projected.length; i += 3) {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[i + 1].x, projected[i + 1].y);
          ctx.lineTo(projected[i + 2].x, projected[i + 2].y); ctx.closePath();
        }
        ctx.stroke();
        ctx.fillStyle = shrink > .5 ? to.color : "#db2777";
        for (const point of projected) { ctx.beginPath(); ctx.arc(point.x, point.y, mix(1.5, 1, shrink), 0, Math.PI * 2); ctx.fill(); }
      };
      render(heroMesh, 1 - shrink);
      render(accentMesh, shrink * .8);
      // Keep the large mesh behind the portrait as it leaves the hero.
      const photo = origin.querySelector("img");
      if (photo) {
        const rect = photo.getBoundingClientRect();
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width / 2 + 6, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
      ctx.globalAlpha = 1;
      surface.dataset.accentTarget = to.element.textContent || "";
      surface.dataset.accentRadius = radius.toFixed(1);
      surface.dataset.accentX = x.toFixed(1);
      surface.dataset.accentY = y.toFixed(1);
      if (!reduced.matches && y > -radius && y < innerHeight + radius) frame = requestAnimationFrame(draw);
    };
    function wake() { if (!frame && !disposed) frame = requestAnimationFrame(draw); }
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true; cancelAnimationFrame(frame); resize.disconnect();
      window.removeEventListener("scroll", wake); window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", measure);
    };
  }, []);
  return <canvas ref={canvas} className="scroll-accent" aria-hidden="true" />;
}
