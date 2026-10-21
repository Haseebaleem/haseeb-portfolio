import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { info, roles, about, skills, jobs, projects, education } from "./data";

type Project = (typeof projects)[number];
const Hero3D = lazy(() => import("./Hero3D"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const accent = ["#2f5bea", "#7c3aed", "#db2777", "#0891b2", "#ea580c"];
const GH = "https://github.com/Haseebaleem";

const iconMap: [string, string][] = [
  ["javascript", "javascript/javascript-original"],
  ["typescript", "typescript/typescript-original"],
  ["phpunit", ""],
  ["php", "php/php-original"],
  ["node.js", "nodejs/nodejs-original"],
  ["express", "express/express-original"],
  ["react", "react/react-original"],
  ["next.js", "nextjs/nextjs-original"],
  ["laravel", "laravel/laravel-original"],
  ["sanctum", "laravel/laravel-original"],
  ["tailwind", "tailwindcss/tailwindcss-original"],
  ["postgresql", "postgresql/postgresql-original"],
  ["mysql", "mysql/mysql-original"],
  ["mongodb", "mongodb/mongodb-original"],
  ["prisma", "prisma/prisma-original"],
  ["socket.io", "socketio/socketio-original"],
  ["apache", "apache/apache-original"],
  ["nginx", "nginx/nginx-original"],
  ["linux", "ubuntu/ubuntu-plain"],
  ["docker", "docker/docker-original"],
  ["redis", "redis/redis-original"],
  ["git", "git/git-original"],
  ["jest", "jest/jest-plain"],
  ["vitest", "vitest/vitest-original"],
];

function SkillIcon({ name, color }: { name: string; color: string }) {
  const [ok, setOk] = useState(true);
  const slug = iconMap.find(([k]) => name.toLowerCase().startsWith(k))?.[1];
  if (!slug || !ok) return <span className="h-2 w-2 rounded-full" style={{ background: color }} />;
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg`}
      alt=""
      loading="lazy"
      onError={() => setOk(false)}
      className="h-4 w-4"
    />
  );
}

function Section({ id, title, color, children }: { id: string; title: string; color: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-16 md:grid md:grid-cols-[200px_1fr] md:gap-10">
      <div className="mb-8 md:mb-0">
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <span className="mt-2 block h-1 w-12 rounded-full" style={{ background: color }} />
      </div>
      <div>{children}</div>
    </section>
  );
}

function Photo() {
  const [ok, setOk] = useState(true);
  return (
    <div
      className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full md:h-64 md:w-64"
      style={{ boxShadow: "0 0 0 4px #fff, 0 0 0 7px #2f5bea, 0 0 50px rgba(124,58,237,.45)" }}
    >
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-signal to-[#7c3aed] font-display text-6xl font-bold text-white">HA</div>
      {ok && <img src="/haseeb.jpg" alt="Haseeb Aleem" onError={() => setOk(false)} className="absolute inset-0 h-full w-full object-cover" />}
    </div>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const [w, setW] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduceMotion) return;
    const word = words[w];
    if (del && n === 0) {
      setDel(false);
      setW((x) => (x + 1) % words.length);
      return;
    }
    const full = !del && n === word.length;
    const t = window.setTimeout(() => (full ? setDel(true) : setN(n + (del ? -1 : 1))), full ? 1400 : del ? 35 : 80);
    return () => window.clearTimeout(t);
  }, [n, del, w, words]);
  if (reduceMotion) return <>{words[0]}</>;
  return (
    <>
      {words[w].slice(0, n)}
      <span className="caret ml-1 inline-block h-[1em] w-[3px] translate-y-[3px] bg-[#db2777]" />
    </>
  );
}

function ProjectDetails({ p, onClose, trigger }: { p: Project; onClose: () => void; trigger: HTMLButtonElement | null }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = trigger;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      dialog.current?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog ref={dialog} aria-labelledby="project-title" onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="project-dialog rounded-2xl bg-white p-0 text-ink shadow-2xl">
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="project-title" className="font-display text-3xl font-bold">{p.name}</h2>
          <button autoFocus onClick={onClose} className="rounded-full border border-line px-4 py-2">Close</button>
        </div>
        <p className="mt-3 text-sm font-medium text-signal">{p.status}</p>
        <p className="mt-6 text-lg leading-relaxed text-mute">{p.desc}</p>
        <h3 className="mt-6 font-semibold">My contribution</h3>
        <p className="mt-2 leading-relaxed text-mute">{p.ownership}</p>
        <h3 className="mt-6 font-semibold">Engineering highlights</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-mute">
          {p.highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-6 text-sm text-mute">{p.stack}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.repo && <a className="rounded-full border border-line px-5 py-3" href={`${GH}/${p.repo}`} target="_blank" rel="noreferrer">Source & documentation ↗</a>}
          {p.live && <a className="rounded-full bg-signal px-5 py-3 text-white" href={p.live} target="_blank" rel="noreferrer">Open live app ↗</a>}
        </div>
      </div>
    </dialog>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  return (
    <section id="projects" className="scroll-mt-24 border-t border-line py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 text-sm font-semibold uppercase tracking-widest text-signal">Selected work</p>
          <h2 className="font-display text-3xl font-bold">Products I've built</h2></div>
        <p className="max-w-md text-mute">From multi-tenant platforms to focused developer tools. Explore the implementation and decisions behind each project.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <article key={p.name} className="flex flex-col rounded-2xl border border-line bg-white p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-mute">
              <span>{p.status}</span><span>{String(i + 1).padStart(2, "0")}</span>
            </div>
            {p.name === "TextKit" && <img src="/textkit-preview.webp" alt="TextKit dashboard with text transformation, analysis and encoding tools" width="1440" height="1000" loading="lazy" className="mb-5 w-full rounded-lg border border-line" />}
            <h3 className="font-display text-2xl font-bold">{p.name}</h3>
            <p className="mt-3 leading-relaxed text-mute">{p.desc}</p>
            <div className="my-5 flex flex-wrap gap-2">{p.stack.split(", ").map((item) => <span key={item} className="rounded-md bg-paper px-2 py-1 text-xs">{item}</span>)}</div>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-3 text-sm font-semibold">
              <button className="rounded-full bg-signal px-4 py-2 text-white" onClick={(event) => { trigger.current = event.currentTarget; setSelected(p); }}>Project details</button>
              {p.repo && <a href={`${GH}/${p.repo}`} target="_blank" rel="noreferrer" className="text-signal underline-offset-4 hover:underline">GitHub ↗</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="text-signal underline-offset-4 hover:underline">Live app ↗</a>}
            </div>
          </article>
        ))}
      </div>
      {selected && <ProjectDetails p={selected} trigger={trigger.current} onClose={() => setSelected(null)} />}
    </section>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-30 transition-colors ${scrolled ? "border-b border-line bg-white/75 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <a href="#top" className="font-display text-base font-bold text-signal sm:text-lg">Haseeb Aleem</a>
          <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm sm:gap-4">
            <a className="hidden hover:text-signal sm:inline" href="#experience">Experience</a>
            <a className="hidden hover:text-signal sm:inline" href="#projects">Projects</a>
            <a className="hidden hover:text-signal sm:inline" href="#contact">Contact</a>
            <a className="rounded-full bg-signal px-3 py-2 text-white hover:bg-ink" href={info.cv} download>Download CV</a>
            <button className="rounded-lg border border-line px-3 py-2 sm:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
          </nav>
        </div>
        {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-wrap justify-center gap-6 border-t border-line bg-white px-6 py-4 sm:hidden">
          {["projects", "experience", "contact"].map((id) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="capitalize">{id}</a>)}
        </nav>}
      </header>

      <main id="main"><div id="top" className="mx-auto max-w-6xl px-6 pt-16">
        <section className="grid items-center gap-6 py-10 lg:min-h-[85vh] lg:grid-cols-2">
          <div>
            <h1 className="rise bg-gradient-to-r from-[#2f5bea] via-[#7c3aed] to-[#db2777] bg-clip-text font-display text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl xl:text-7xl">
              Haseeb Aleem
            </h1>
            <p className="rise rise-2 mt-6 min-h-[2.8rem] font-display text-xl font-medium text-[#db2777] md:text-2xl">
              <span className="sr-only">{roles[0]}</span>
              <span aria-hidden="true"><Typewriter words={roles} /></span>
            </p>
            <p className="rise rise-2 mt-4 max-w-md text-lg leading-relaxed text-mute">{info.tagline}</p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-signal px-6 py-3 font-medium text-white shadow-lg shadow-signal/30 hover:bg-ink">See my projects</a>
              <a href="#contact" className="rounded-full border border-ink px-6 py-3 font-medium hover:bg-ink hover:text-white">Get in touch</a>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[340px] md:max-w-[520px]">
            <div aria-hidden="true" className="absolute inset-0"><Suspense fallback={null}><Hero3D /></Suspense></div>
            <Photo />
          </div>
        </section>

        <Section id="about" title="About" color={accent[0]}>
          <p className="max-w-2xl text-lg leading-relaxed">{about}</p>
          <p className="mt-4 text-mute">{info.location}</p>
        </Section>

        <Section id="skills" title="Skills" color={accent[1]}>
          {skills.map(([k, v], n) => {
            const c = accent[n % accent.length];
            return (
              <div key={k} className="mb-6">
                <p className="mb-2 font-semibold" style={{ color: c }}>{k}</p>
                <div className="flex flex-wrap gap-2">
                  {v.split(", ").map((s) => (
                    <span key={s} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm" style={{ borderColor: `${c}66` }}>
                      <SkillIcon name={s} color={c} />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </Section>

        <Section id="experience" title="Experience" color={accent[2]}>
          <ol className="space-y-10 border-l-2 border-line pl-6">
            {jobs.map((j, n) => {
              const c = accent[n % accent.length];
              const now = j.period.includes("Present");
              return (
                <li key={j.role + j.period} className="relative">
                  <span className="absolute -left-[33px] top-7 h-4 w-4 rounded-full border-4 border-paper md:-left-[33px]" style={{ background: c, boxShadow: `0 0 0 3px ${c}44` }} />
                  <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ borderTop: `4px solid ${c}` }}>
                    <div className="flex flex-wrap items-start justify-between gap-4 p-6 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold text-white" style={{ background: c }}>{j.badge}</div>
                        <div>
                          <h3 className="font-display text-xl font-bold leading-tight">{j.role}</h3>
                          <p className="text-mute">{j.company}</p>
                        </div>
                      </div>
                      <div className="text-sm sm:text-right">
                        <p className="font-medium" style={{ color: c }}>{j.period}</p>
                        <p className="text-mute">{j.duration}</p>
                        {now && <span className="mt-1 inline-block rounded-full bg-green-600/10 px-2 py-0.5 text-xs font-medium text-green-700">Current</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 px-6">
                      {j.stats.map((t) => <span key={t} className="rounded-lg px-3 py-1 text-sm font-semibold" style={{ background: `${c}14`, color: c }}>{t}</span>)}
                    </div>
                    <ul className="space-y-2 px-6 pb-5 pt-4 text-mute">
                      {j.points.map((p) => (
                        <li key={p} className="flex gap-3"><span className="font-bold" style={{ color: c }}>›</span><span>{p}</span></li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 border-t border-line bg-paper/60 px-6 py-3">
                      {j.tags.map((t) => <span key={t} className="rounded-md border border-line bg-white px-2 py-0.5 text-xs">{t}</span>)}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Section>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Projects />

        <Section id="education" title="Education" color={accent[3]}>
          {education.map(([a, b]) => (
            <div key={a} className="flex flex-col justify-between gap-1 border-b border-line py-3 first:pt-0 sm:flex-row">
              <span>{a}</span><span className="text-mute">{b}</span>
            </div>
          ))}
        </Section>

        <Section id="contact" title="Contact" color={accent[4]}>
          <p className="max-w-lg text-lg text-mute">I am open to senior full stack roles. Send me a message and I will reply quickly.</p>
          <a href={`mailto:${info.email}`} className="mt-4 inline-block break-all bg-gradient-to-r from-[#2f5bea] to-[#db2777] bg-clip-text font-display text-2xl font-bold text-transparent md:text-4xl">{info.email}</a>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              [info.phone, `tel:${info.phone.replace(/\s/g, "")}`, accent[0]],
              ["WhatsApp", info.whatsapp, accent[3]],
              ["LinkedIn", info.linkedin, accent[1]],
              ["GitHub", info.github, accent[2]],
            ].map(([t, h, c]) => (
              <a key={t} href={h} target="_blank" rel="noreferrer" className="rounded-full border bg-white px-5 py-2 hover:shadow-md" style={{ borderColor: c, color: c }}>{t}</a>
            ))}
          </div>
        </Section>

        <footer className="border-t border-line py-8 text-sm text-mute">© {new Date().getFullYear()} Haseeb Aleem</footer>
      </div></main>
    </>
  );
}
