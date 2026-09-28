import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { ArrowRight, Shuffle, Play } from "lucide-react";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import CodeViewer from "../components/CodeViewer";

function PluginBlock({ name, what, why, demo, code }) {
  return (
    <Section title={name} id={name.toLowerCase()}>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-3 dark:border-white/10"><p className="!mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">What it does</p><p className="!mb-0 text-sm">{what}</p></div>
        <div className="rounded-xl border border-slate-200 p-3 dark:border-white/10"><p className="!mb-1 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">Why it's useful</p><p className="!mb-0 text-sm">{why}</p></div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">{demo}<CodeViewer code={code} /></div>
    </Section>
  );
}

function DraggableDemo() {
  const scope = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useGSAP(() => {
    Draggable.create(".drag", {
      bounds: scope.current,
      onDrag() { setPos({ x: Math.round(this.x), y: Math.round(this.y) }); },
      onRelease() { gsap.to(this.target, { scale: 1, duration: 0.3 }); },
      onPress() { gsap.to(this.target, { scale: 1.15, duration: 0.2 }); },
    });
    Draggable.create(".knob", { type: "rotation" });
  }, { scope });
  return (
    <div ref={scope} className="stage relative flex h-64 items-center justify-center gap-10">
      <div className="drag demo-box h-20 w-20 cursor-grab touch-none active:cursor-grabbing">drag me</div>
      <div className="knob relative flex h-20 w-20 cursor-grab touch-none items-center justify-center rounded-full border-4 border-sky-400 bg-sky-400/10 text-[10px] font-semibold">
        spin me<span className="absolute top-1 h-3 w-1.5 rounded bg-sky-400" />
      </div>
      <span className="absolute bottom-2 left-3 font-mono text-xs text-slate-400">x: {pos.x} · y: {pos.y}</span>
    </div>
  );
}

function FlipDemo() {
  const scope = useRef(null);
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [grid, setGrid] = useState(true);
  const state = useRef(null);
  const { contextSafe } = useGSAP({ scope });
  useGSAP(() => {
    if (!state.current) return;
    Flip.from(state.current, { duration: 0.7, ease: "power2.inOut", stagger: 0.03, absolute: true });
    state.current = null;
  }, { scope, dependencies: [items, grid] });
  const capture = contextSafe(() => { state.current = Flip.getState(".fitem"); });
  return (
    <div className="flex flex-col gap-2">
      <div ref={scope} className="stage h-64 p-4">
        <div className={grid ? "grid grid-cols-4 gap-3" : "flex flex-col gap-1.5"}>
          {items.map((n) => (
            <div key={n} data-flip-id={n} className={`fitem flex items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 font-bold text-black ${grid ? "h-20" : "h-5 text-xs"}`}>{n}</div>
          ))}
        </div>
      </div>
      <div className="flex gap-1.5">
        <button className="btn-ghost btn-sm" onClick={() => { capture(); setItems((a) => gsap.utils.shuffle([...a])); }}><Shuffle size={13} /> Shuffle</button>
        <button className="btn-ghost btn-sm" onClick={() => { capture(); setGrid((g) => !g); }}>Toggle layout</button>
      </div>
    </div>
  );
}

function MotionPathDemo() {
  const scope = useRef(null);
  const tw = useRef(null);
  useGSAP(() => {
    tw.current = gsap.to(".rocket", {
      duration: 4, repeat: -1, ease: "power1.inOut",
      motionPath: { path: "#mp-path", align: "#mp-path", alignOrigin: [0.5, 0.5], autoRotate: true },
    });
  }, { scope });
  return (
    <div ref={scope} className="stage relative h-64">
      <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path id="mp-path" d="M20,180 C80,20 160,20 200,110 S320,200 380,40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-slate-400/60" />
      </svg>
      <div className="rocket absolute left-0 top-0 flex h-8 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-xs font-bold text-black">➜</div>
    </div>
  );
}

function TextDemo() {
  const scope = useRef(null);
  const [key, setKey] = useState(0);
  useGSAP(() => {
    gsap.timeline({ repeat: -1, repeatDelay: 1 })
      .to(".typed", { duration: 1.6, text: "Learn GSAP easily.", ease: "none" })
      .to(".typed", { duration: 1.6, text: "Animate anything.", ease: "none", delay: 1 })
      .to(".typed", { duration: 1.6, text: { value: "Build amazing websites!", speed: 1 }, ease: "none", delay: 1 });
  }, { scope, dependencies: [key], revertOnUpdate: true });
  return (
    <div className="flex flex-col gap-2">
      <div ref={scope} className="stage flex h-64 items-center justify-center px-6">
        <p className="font-mono text-2xl font-bold sm:text-3xl"><span className="typed text-brand-600 dark:text-brand-400"></span><span className="animate-pulse">|</span></p>
      </div>
      <button className="btn-ghost btn-sm w-fit" onClick={() => setKey((k) => k + 1)}><Play size={13} /> Restart</button>
    </div>
  );
}

export default function Plugins() {
  return (
    <>
      <LessonHeader kicker="Lesson 11 · Superpowers" title="GSAP Plugins">
        <p>The GSAP core handles tweens and timelines. <strong>Plugins</strong> add superpowers: scroll animations, dragging, layout transitions, path following and more. Since 2025 <strong>every plugin is free</strong> and ships inside the <code>gsap</code> package.</p>
      </LessonHeader>

      <Section title="Registering plugins">
        <CodeViewer code={`import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";

// Register once, at the top of your app
gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin, TextPlugin);`} />
      </Section>

      <Section title="ScrollTrigger">
        <div className="card flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center">
          <p className="!mb-0 flex-1">Triggers or scrubs animations based on the scroll position. It's the most popular plugin — so it gets its own full interactive lesson.</p>
          <Link to="/learn/scrolltrigger" className="btn-primary">ScrollTrigger lesson <ArrowRight size={14} /></Link>
        </div>
      </Section>

      <PluginBlock name="Draggable"
        what="Makes any element draggable, spinnable or throwable with mouse and touch."
        why="Sliders, carousels, knobs, drag-to-reorder lists and games — without writing pointer event code."
        demo={<DraggableDemo />}
        code={`Draggable.create(".box", {\n  bounds: ".container",\n  onDrag() {\n    console.log(this.x, this.y);\n  }\n});\n\n// rotate a knob instead\nDraggable.create(".knob", { type: "rotation" });`} />

      <PluginBlock name="Flip"
        what="Records where elements are, lets you change the layout any way you like, then animates them smoothly to their new spots."
        why="Animating layout changes (grid ↔ list, filtering, reordering) is normally painful. Flip makes it 3 lines."
        demo={<FlipDemo />}
        code={`// 1. Record the current state\nconst state = Flip.getState(".item");\n\n// 2. Change the layout (DOM, classes, React state…)\ncontainer.classList.toggle("grid");\n\n// 3. Animate from the old state to the new one\nFlip.from(state, {\n  duration: 0.7,\n  ease: "power2.inOut",\n  stagger: 0.03\n});`} />

      <PluginBlock name="MotionPath"
        what="Moves an element along any SVG path (or a list of points), optionally rotating it to face the direction of travel."
        why="Flight paths, roller coasters, orbiting icons, drawn signatures, map routes."
        demo={<MotionPathDemo />}
        code={`gsap.to(".rocket", {\n  duration: 4,\n  repeat: -1,\n  ease: "power1.inOut",\n  motionPath: {\n    path: "#path",\n    align: "#path",\n    alignOrigin: [0.5, 0.5],\n    autoRotate: true\n  }\n});`} />

      <PluginBlock name="TextPlugin"
        what="Animates the text content of an element, character by character."
        why="Typewriter effects, rotating headlines, terminal-style intros."
        demo={<TextDemo />}
        code={`gsap.timeline({ repeat: -1 })\n  .to(".typed", { duration: 1.6, text: "Learn GSAP easily.", ease: "none" })\n  .to(".typed", { duration: 1.6, text: "Animate anything.", ease: "none", delay: 1 });`} />

      <Callout>Other free plugins worth exploring next: <code>SplitText</code> (split text into chars/words/lines), <code>ScrollSmoother</code>, <code>MorphSVG</code>, <code>DrawSVG</code>, <code>InertiaPlugin</code> and <code>Observer</code>.</Callout>
    </>
  );
}
