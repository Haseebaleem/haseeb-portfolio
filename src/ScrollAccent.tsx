import { useEffect, useRef } from "react";
import { IcosahedronGeometry } from "three";
import { sectionIcons, type IconSegment } from "./sectionIcons";

type Point = { x: number; y: number; z: number };
type Anchor = { element: HTMLElement; width: number; stop: number; color: string; id: string; icon: IconSegment[] };
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
    const heroMesh = mesh(2);
    // Each wireframe edge becomes an icon segment; there is no second faded layer.
    const edgeKeys = new Set<string>();
    const heroEdges: { start: Point; end: Point }[] = [];
    const key = (p: Point) => [p.x, p.y, p.z].map(v => v.toFixed(5)).join(",");
    for (let i = 0; i < heroMesh.length; i += 3) {
      for (let j = 0; j < 3; j++) {
        const start = heroMesh[i + j], end = heroMesh[i + (j + 1) % 3];
        const id = [key(start), key(end)].sort().join("|");
        if (!edgeKeys.has(id)) { edgeKeys.add(id); heroEdges.push({ start, end }); }
      }
    }
    heroEdges.sort((a, b) => Math.atan2(a.start.y + a.end.y, a.start.x + a.end.x) - Math.atan2(b.start.y + b.end.y, b.start.x + b.end.x));
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
        return { element, width, color, id: section.id, icon: sectionIcons[section.id] || sectionIcons.projects, stop: Math.max(1, Math.min(document.documentElement.scrollHeight - innerHeight, top + rect.height / 2 - innerHeight * .42)) };
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
      const source = from || to;
      const colorA = (from ? source.color : "rgb(47, 91, 234)").match(/[\d.]+/g)?.map(Number) || [47, 91, 234];
      const colorB = to.color.match(/[\d.]+/g)?.map(Number) || [47, 91, 234];
      const morph = reduced.matches ? 0 : from ? 1 : ease(clamp((progress - .12) / .58));
      ctx.globalAlpha = 1;
      ctx.strokeStyle = `rgb(${colorA.slice(0, 3).map((value, i) => Math.round(mix(value, colorB[i], journey))).join(",")})`;
      ctx.lineWidth = mix(.85, innerWidth < 768 ? 1.7 : 1.9, morph);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath();
      const project = (p: Point) => ({
        x: p.x * cos + p.z * sin,
        y: p.y * .98 - (p.z * cos - p.x * sin) * .18,
      });
      if (morph < 1) {
        // Move the actual edge endpoints into the outline, keeping one opaque shape.
        heroEdges.forEach((edge, i) => {
          const target = to.icon[Math.floor(i * to.icon.length / heroEdges.length)];
          const a = project(edge.start), b = project(edge.end);
          ctx.moveTo(x + mix(a.x, target.start[0], morph) * radius, y + mix(a.y, target.start[1], morph) * radius);
          ctx.lineTo(x + mix(b.x, target.end[0], morph) * radius, y + mix(b.y, target.end[1], morph) * radius);
        });
      } else {
        for (let i = 0; i < to.icon.length; i++) {
          const a = source.icon[i], b = to.icon[i];
          ctx.moveTo(x + mix(a.start[0], b.start[0], journey) * radius, y + mix(a.start[1], b.start[1], journey) * radius);
          ctx.lineTo(x + mix(a.end[0], b.end[0], journey) * radius, y + mix(a.end[1], b.end[1], journey) * radius);
        }
      }
      ctx.stroke();
      ctx.lineCap = "butt"; ctx.lineJoin = "miter";
      surface.dataset.accentMorph = morph.toFixed(3);
      // Keep the large mesh behind the portrait as it leaves the hero.
      const photo = origin.querySelector("img");
      if (photo) {
        const rect = photo.getBoundingClientRect();
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width / 2 + 6, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
      ctx.globalAlpha = 1;
      surface.dataset.accentIcon = shrink < .5 ? "sphere" : journey < .5 ? (from || to).id : to.id;
      surface.dataset.accentTarget = to.element.textContent || "";
      surface.dataset.accentRadius = radius.toFixed(1);
      surface.dataset.accentX = x.toFixed(1);
      surface.dataset.accentY = y.toFixed(1);
      if (!reduced.matches && shrink < 1 && y > -radius && y < innerHeight + radius) frame = requestAnimationFrame(draw);
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
