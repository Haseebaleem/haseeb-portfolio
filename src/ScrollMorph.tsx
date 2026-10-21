import { useEffect, useRef } from "react";
import { IcosahedronGeometry } from "three";

type Point = { x: number; y: number; z: number };
type Anchor = { element: HTMLElement; points: Point[]; width: number; height: number; stop: number };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const clamp = (t: number) => Math.max(0, Math.min(1, t));

export default function ScrollMorph() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    const context = surface?.getContext("2d");
    const origin = document.querySelector<HTMLElement>("[data-morph-origin]");
    if (!surface || !context || !origin) return;
    const ctx = context;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const geometry = new IcosahedronGeometry(1, 2);
    const positions = geometry.getAttribute("position");
    const sphere: Point[] = [];
    for (let i = 0; i < positions.count; i++) sphere.push({ x: positions.getX(i), y: positions.getY(i), z: positions.getZ(i) });
    geometry.dispose();
    let anchors: Anchor[] = [];
    let frame = 0;
    let disposed = false;
    let dirty = true;
    let lastTime = 0;
    let angle = 0;
    const headings = Array.from(document.querySelectorAll<HTMLElement>("[data-morph-title]"));
    const restore = () => headings.forEach(el => el.style.removeProperty("opacity"));
    const measure = () => {
      if (disposed) return;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      surface.width = innerWidth * ratio;
      surface.height = innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      anchors = headings.map(element => {
        const style = getComputedStyle(element);
        const scratch = document.createElement("canvas");
        const sample = scratch.getContext("2d")!;
        const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        sample.font = font;
        const width = Math.ceil(sample.measureText(element.textContent || "").width);
        const height = Math.ceil(parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.3);
        scratch.width = width + 8; scratch.height = height + 8;
        sample.font = font; sample.fillStyle = "#fff"; sample.textBaseline = "middle";
        sample.fillText(element.textContent || "", 4, scratch.height / 2);
        const pixels = sample.getImageData(0, 0, scratch.width, scratch.height).data;
        const points: Point[] = [];
        for (let y = 0; y < scratch.height; y += 1.5) for (let x = 0; x < scratch.width; x += 1.5) {
          if (pixels[(Math.floor(y) * scratch.width + Math.floor(x)) * 4 + 3] > 100)
            points.push({ x: x - scratch.width / 2, y: y - scratch.height / 2, z: 0 });
        }
        const rect = element.getBoundingClientRect();
        // Projects has a sticky heading: its entry position is derived from its section.
        const section = element.closest("section")!;
        const sticky = section.querySelector<HTMLElement>(".sticky");
        const top = section.id === "projects" && sticky ? section.getBoundingClientRect().top + scrollY + rect.top - sticky.getBoundingClientRect().top : rect.top + scrollY;
        return { element, points, width, height, stop: Math.max(1, Math.min(document.documentElement.scrollHeight - innerHeight, top + rect.height / 2 - innerHeight * .42)) };
      });
      dirty = true;
      wake();
    };
    const draw = (time: number) => {
      frame = 0;
      if (disposed) return;
      const delta = Math.min((time - lastTime) / 1000, .05); lastTime = time;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      restore();
      if (reduced.matches || document.hidden || !anchors.length) return;
      const scroll = window.scrollY;
      let index = anchors.findIndex(a => scroll < a.stop);
      if (index < 0) index = anchors.length;
      const from = index > 0 ? anchors[index - 1] : null;
      const to = anchors[index] || from;
      if (!to) return;
      const holdingProjects = from?.element.closest("section")?.id === "projects";
      const start = holdingProjects ? Math.max(from!.stop, to.stop - innerHeight * .65) : from?.stop || 0;
      const end = to.stop;
      const progress = index === anchors.length ? 1 : clamp((scroll - start) / Math.max(1, end - start));
      const t = ease(progress);
      const hero = origin.getBoundingClientRect();
      const location = (a: Anchor) => {
        const r = a.element.getBoundingClientRect();
        return { x: r.left + a.width / 2, y: r.top + r.height / 2 };
      };
      const previous = from ? location(from) : { x: hero.left + hero.width / 2, y: hero.top + hero.height / 2 };
      const next = location(to);
      const outgoing = from ? 1 - ease(clamp(progress / .22)) : 0;
      const incoming = ease(clamp((progress - .68) / .32));
      const textAmount = Math.max(outgoing, incoming);
      const textAnchor = outgoing > incoming ? from : to;
      const textLocation = outgoing > incoming ? previous : next;
      const x = mix(mix(previous.x, next.x, t), textLocation.x, textAmount);
      const y = mix(mix(previous.y, next.y, progress), textLocation.y, textAmount);
      const lettering = ease(clamp((textAmount - .65) / .35));
      const travelRadius = innerWidth < 768 ? 28 : 42;
      const radius = from ? travelRadius : mix(hero.width * .42, travelRadius, ease(clamp(progress / .6)));
      angle += delta * .2;
      const sin = Math.sin(angle), cos = Math.cos(angle);
      const dots: {x: number; y: number}[] = sphere.map((p, i) => {
        const sx = (p.x * cos + p.z * sin) * radius;
        const sy = (p.y * .98 - (p.z * cos - p.x * sin) * .18) * radius;
        const target = textAnchor?.points[Math.floor(i / sphere.length * textAnchor.points.length)];
        return { x: x + mix(sx, target?.x || 0, textAmount), y: y + mix(sy, target?.y || 0, textAmount) };
      });
      // Native headings remain accessible; fade them only while the particles form their letters.
      if (from && outgoing > 0) from.element.style.opacity = String(1 - outgoing);
      if (incoming > 0) to.element.style.opacity = String(1 - incoming);
      ctx.globalAlpha = 1 - textAmount;
      ctx.strokeStyle = "#2f5bea"; ctx.lineWidth = .85;
      ctx.beginPath();
      for (let i = 0; i < dots.length; i += 3) {
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
        ctx.lineTo(dots[i + 2].x, dots[i + 2].y);
        ctx.closePath();
      }
      ctx.stroke();
      ctx.globalAlpha = 1 - lettering;
      ctx.fillStyle = textAmount > .5 ? "#2f5bea" : "#db2777";
      for (const point of dots) { ctx.beginPath(); ctx.arc(point.x, point.y, mix(1.5, .8, textAmount), 0, Math.PI * 2); ctx.fill(); }
      if (lettering > 0 && textAnchor) {
        const style = getComputedStyle(textAnchor.element);
        ctx.globalAlpha = lettering;
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        ctx.fillStyle = style.color; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(textAnchor.element.textContent || "", x, y);
      }
      // The rotating mesh stays behind the portrait while it leaves the hero.
      const photo = origin.querySelector("img");
      if (photo) {
        const r = photo.getBoundingClientRect();
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(r.left + r.width / 2, r.top + r.height / 2, r.width / 2 + 6, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
      ctx.globalAlpha = 1;
      surface.dataset.morphTarget = to.element.textContent || "";
      surface.dataset.morphProgress = progress.toFixed(3);
      dirty = false;
      if (textAmount < .96 && y > -radius && y < innerHeight + radius) frame = requestAnimationFrame(draw);
    };
    function wake() {
      if (!frame && !disposed) frame = requestAnimationFrame(draw);
    }
    const onScroll = () => { dirty = true; wake(); };
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; restore(); } else wake(); };
    const resize = new ResizeObserver(() => { if (!dirty) measure(); });
    resize.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true; cancelAnimationFrame(frame); restore(); resize.disconnect();
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", onVisibility); reduced.removeEventListener("change", measure);
    };
  }, []);
  return <canvas ref={canvas} className="scroll-morph" aria-hidden="true" />;
}
