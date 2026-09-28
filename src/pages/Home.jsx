import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Play, Sparkles, MousePointerClick, Code2, Eye, Layers, Library as LibIcon, BookOpen } from "lucide-react";
import LessonCard from "../components/LessonCard";
import CodeViewer from "../components/CodeViewer";
import InteractivePlayground from "../components/InteractivePlayground";
import ProgressBar from "../components/ProgressBar";
import { lessons } from "../data/lessons";
import { useProgress } from "../context/ProgressContext";

const heading = "Learn GSAP Easily";

function Hero() {
  const scope = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Text animation — every letter drops in
      gsap.from(".hero-char", { yPercent: 120, rotation: 12, opacity: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.035 });
      gsap.from(".hero-fade", { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.5, ease: "power3.out" });

      // Moving box
      gsap.to(".s-move", { x: 120, duration: 1.8, repeat: -1, yoyo: true, ease: "power2.inOut" });
      // Rotating circle
      gsap.to(".s-rotate", { rotation: 360, duration: 4, repeat: -1, ease: "none" });
      // Scaling element
      gsap.to(".s-scale", { scale: 1.5, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      // Bouncing element
      gsap.timeline({ repeat: -1 })
        .to(".s-bounce", { y: -60, duration: 0.5, ease: "power2.out" })
        .to(".s-bounce", { y: 0, duration: 0.8, ease: "bounce.out" })
        .to(".s-shadow", { scale: 0.4, opacity: 0.3, duration: 0.5, ease: "power2.out" }, 0)
        .to(".s-shadow", { scale: 1, opacity: 1, duration: 0.8, ease: "bounce.out" }, 0.5);
      // Floating elements
      gsap.utils.toArray(".s-float").forEach((el, i) => {
        gsap.to(el, { y: gsap.utils.random(-30, 30), x: gsap.utils.random(-20, 20), rotation: gsap.utils.random(-25, 25), duration: gsap.utils.random(2.5, 4), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.2 });
      });
      // Stagger bars
      gsap.to(".s-bar", { scaleY: 0.2, duration: 0.6, repeat: -1, yoyo: true, ease: "power1.inOut", stagger: { each: 0.1, from: "center" } });
      // Intro for shapes
      gsap.from(".shape-card", { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.08, delay: 0.3, ease: "back.out(1.6)" });
    });
    return () => mm.revert();
  }, { scope });

  return (
    <section ref={scope} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-400/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        {["left-[6%] top-[18%] h-6 w-6 rounded-full bg-sky-400", "right-[8%] top-[14%] h-8 w-8 rounded-lg bg-fuchsia-400", "left-[12%] bottom-[18%] h-5 w-5 rotate-45 bg-amber-400", "right-[14%] bottom-[24%] h-4 w-4 rounded-full bg-brand-400", "left-[45%] top-[8%] h-3 w-3 rounded-full bg-rose-400"].map((c) => (
          <span key={c} className={`s-float absolute opacity-70 ${c}`} />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
        <div>
          <span className="hero-fade chip mb-6 !border-brand-400/40 !bg-brand-400/10 !text-brand-700 dark:!text-brand-300"><Sparkles size={12} className="mr-1.5" /> Beginner → Pro · 100% interactive</span>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" aria-label={heading}>
            {heading.split(" ").map((word, wi) => (
              <span key={wi} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom" aria-hidden>
                {word.split("").map((ch, ci) => (
                  <span key={ci} className={`hero-char inline-block ${wi === 1 ? "bg-gradient-to-r from-brand-400 to-emerald-300 bg-clip-text text-transparent" : ""}`}>{ch}</span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Master web animations from beginner to pro with interactive examples, visual explanations, and real code.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <a href="#learning-path" onClick={(e) => { e.preventDefault(); document.getElementById("learning-path")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-primary !px-6 !py-3 !text-base">
              Start Learning <ArrowRight size={18} />
            </a>
            <Link to="/playground" className="btn-ghost !px-6 !py-3 !text-base"><Play size={18} /> Try GSAP</Link>
          </div>
          <p className="hero-fade mt-8 text-sm text-slate-500">Developed by <span className="font-semibold text-slate-800 dark:text-slate-200">Muhammed Fayiz</span></p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="shape-card card col-span-2 flex h-32 flex-col justify-between p-4 sm:col-span-3">
            <span className="font-mono text-[11px] text-slate-400">x: 120 · yoyo</span>
            <div className="s-move h-10 w-10 rounded-lg bg-gradient-to-br from-brand-300 to-brand-500 shadow-glow" />
          </div>
          <div className="shape-card card flex h-36 flex-col items-center justify-center gap-2 p-4">
            <div className="s-rotate relative h-14 w-14 rounded-full border-4 border-sky-400 border-t-transparent" />
            <span className="font-mono text-[11px] text-slate-400">rotation</span>
          </div>
          <div className="shape-card card flex h-36 flex-col items-center justify-center gap-2 p-4">
            <div className="s-scale h-10 w-10 rounded-xl bg-fuchsia-400" />
            <span className="font-mono text-[11px] text-slate-400">scale</span>
          </div>
          <div className="shape-card card flex h-36 flex-col items-center justify-end gap-1 p-4 max-sm:col-span-2">
            <div className="s-bounce h-8 w-8 rounded-full bg-amber-400" />
            <div className="s-shadow h-1.5 w-8 rounded-full bg-black/20 dark:bg-white/20" />
            <span className="mt-1 font-mono text-[11px] text-slate-400">bounce.out</span>
          </div>
          <div className="shape-card card col-span-2 flex h-32 items-center justify-center gap-1.5 p-4 sm:col-span-3">
            {Array.from({ length: 14 }, (_, i) => <span key={i} className="s-bar h-16 w-3 rounded-full bg-gradient-to-t from-brand-500 to-brand-300" />)}
            <span className="ml-3 font-mono text-[11px] text-slate-400">stagger</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Eye, t: "See it", d: "Every concept has a live animation you can watch, pause and reverse." },
  { icon: MousePointerClick, t: "Change it", d: "Sliders, pickers and toggles let you tweak values in real time." },
  { icon: Code2, t: "Copy it", d: "The code updates as you experiment. Copy it straight into your project." },
  { icon: Layers, t: "Build it", d: "15 real-world examples show how pros use GSAP on real websites." },
];

export default function Home() {
  const scope = useRef(null);
  const { percent } = useProgress();

  useGSAP(() => {
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    gsap.from(".lesson-card", { y: 40, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: "#learning-path", start: "top 75%" } });
  }, { scope });

  return (
    <div ref={scope}>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: I, t, d }) => (
            <div key={t} className="card p-5">
              <I className="mb-3 text-brand-500" />
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="reveal grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">01 · the basics</p>
            <h2 className="h-section">What is GSAP?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400"><b className="text-slate-900 dark:text-white">GSAP (GreenSock Animation Platform)</b> is a JavaScript animation library used to create fast, smooth and professional animations for websites.</p>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Where CSS animations are fixed once written, GSAP gives you a remote control: play, pause, reverse, sequence and scrub any animation — with one readable line of code.</p>
            <Link to="/learn/what-is-gsap" className="btn-ghost mt-6">Read the full lesson <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <CodeViewer title="css" compact code={`.box {\n  animation: move 2s;\n}`} />
            <CodeViewer title="gsap.js" compact code={`gsap.to(".box", {\n  x: 500,\n  duration: 2\n});`} />
            <p className="text-sm text-slate-500 sm:col-span-2">Same result — but the GSAP version can be paused, reversed, sped up, chained and linked to scroll.</p>
          </div>
        </div>
      </section>

      <section id="learning-path" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6">
        <div className="reveal mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">02 · the course</p>
            <h2 className="h-section">Your learning path</h2>
            <p className="mt-2 text-slate-500">12 bite-sized lessons. Go in order or jump anywhere.</p>
          </div>
          <ProgressBar percent={percent} className="w-full sm:w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {lessons.map((l, i) => <LessonCard key={l.slug} lesson={l} index={i} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="reveal mb-8">
          <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">03 · experiment</p>
          <h2 className="h-section">Try GSAP right now</h2>
          <p className="mt-2 text-slate-500">Move the sliders. The animation and the code update instantly.</p>
        </div>
        <div className="reveal"><InteractivePlayground compact /></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="reveal grid gap-4 md:grid-cols-3">
          {[
            { to: "/examples", icon: Layers, t: "Real World Examples", d: "Hero reveals, marquees, page transitions, parallax and more — with code." },
            { to: "/library", icon: LibIcon, t: "Animation Library", d: "Copy-paste presets: fades, slides, pops, shakes, pulses and attention seekers." },
            { to: "/cheatsheet", icon: BookOpen, t: "Cheat Sheet", d: "Every method, property and option on one printable page." },
          ].map(({ to, icon: I, t, d }) => (
            <Link key={to} to={to} className="card group p-6 transition hover:-translate-y-1 hover:border-brand-400/60">
              <I className="mb-4 text-brand-500" />
              <h3 className="flex items-center gap-2 text-lg font-semibold">{t}<ArrowRight size={16} className="transition group-hover:translate-x-1" /></h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
