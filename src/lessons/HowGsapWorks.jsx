import gsap from "gsap";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import AnimationPreview from "../components/AnimationPreview";
import CodeViewer from "../components/CodeViewer";

function Ghost({ left, label }) {
  return (
    <div className="pointer-events-none absolute top-1/2 -mt-8 flex h-16 w-16 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-400/60 text-[10px] font-mono text-slate-400" style={{ left }}>
      {label}
    </div>
  );
}

const methods = [
  {
    name: "gsap.to()",
    meaning: ["Current position", "Target position"],
    desc: "Animates FROM wherever the element is right now TO the values you give. This is the one you'll use 90% of the time.",
    code: `gsap.to(".box", {\n  x: 250,\n  duration: 2\n});`,
    build: () => gsap.to(".box", { x: 250, duration: 2 }),
    ghosts: [{ left: 24, label: "start" }, { left: 274, label: "x: 250" }],
  },
  {
    name: "gsap.from()",
    meaning: ["Starting position", "Current position"],
    desc: "The opposite: the element jumps to the values you give, then animates BACK to where it normally sits. Perfect for entrance animations.",
    code: `gsap.from(".box", {\n  x: 250,\n  duration: 2\n});`,
    build: () => gsap.from(".box", { x: 250, duration: 2 }),
    ghosts: [{ left: 274, label: "x: 250" }, { left: 24, label: "natural" }],
  },
  {
    name: "gsap.fromTo()",
    meaning: ["Start value", "End value"],
    desc: "You define BOTH the start and the end. Most predictable — use it when the element's current state could be anything.",
    code: `gsap.fromTo(\n  ".box",\n  { x: 0 },\n  { x: 250, duration: 2 }\n);`,
    build: () => gsap.fromTo(".box", { x: 0 }, { x: 250, duration: 2 }),
    ghosts: [{ left: 24, label: "x: 0" }, { left: 274, label: "x: 250" }],
  },
];

export default function HowGsapWorks() {
  return (
    <>
      <LessonHeader kicker="Lesson 02 · Foundations" title="How GSAP Works">
        <p>Every GSAP animation is called a <strong>tween</strong> (short for "in-between"). You create one with three core methods. They all take the same two things: <strong>what</strong> to animate (a target) and an object of <strong>vars</strong> (where and how).</p>
      </LessonHeader>

      <Section title="Anatomy of a tween">
        <div className="card overflow-x-auto p-5 font-mono text-sm sm:text-base">
          <div className="whitespace-nowrap">
            <span className="text-sky-500">gsap</span>.<span className="text-fuchsia-500">to</span>(
            <span className="rounded bg-amber-400/20 px-1 text-amber-600 dark:text-amber-300">".box"</span>, {"{ "}
            <span className="rounded bg-brand-400/20 px-1 text-brand-700 dark:text-brand-300">x: 500</span>,{" "}
            <span className="rounded bg-rose-400/20 px-1 text-rose-600 dark:text-rose-300">duration: 2</span>{" }"});
          </div>
          <div className="mt-4 grid gap-2 font-sans text-sm sm:grid-cols-4">
            <p className="!mb-0"><b className="text-fuchsia-500">method</b> — to / from / fromTo</p>
            <p className="!mb-0"><b className="text-amber-500">target</b> — CSS selector, element or object</p>
            <p className="!mb-0"><b className="text-brand-600 dark:text-brand-400">properties</b> — what changes</p>
            <p className="!mb-0"><b className="text-rose-500">special props</b> — duration, ease, delay…</p>
          </div>
        </div>
      </Section>

      {methods.map((m) => (
        <Section key={m.name} title={m.name}>
          <p>{m.desc}</p>
          <div className="mb-4 flex flex-wrap items-center gap-3 font-semibold">
            <span className="chip !px-3 !py-1">{m.meaning[0]}</span>
            <span className="text-brand-500">→</span>
            <span className="chip !border-brand-400/40 !px-3 !py-1 text-brand-700 dark:text-brand-300">{m.meaning[1]}</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <AnimationPreview height="h-40" build={m.build}>
              {m.ghosts.map((g) => <Ghost key={g.label} {...g} />)}
              <div className="flex h-full items-center pl-6"><div className="box demo-box">box</div></div>
            </AnimationPreview>
            <CodeViewer code={m.code} />
          </div>
        </Section>
      ))}

      <Callout>Quick memory trick: <code>to</code> = "go <b>to</b> here", <code>from</code> = "come <b>from</b> there", <code>fromTo</code> = "I'll tell you both".</Callout>
      <Callout type="warn">GSAP durations are in <b>seconds</b>, not milliseconds. <code>duration: 2</code> = two seconds. If you omit duration, it defaults to <code>0.5</code>.</Callout>

      <Section title="Bonus: gsap.set()">
        <p>Need to change a value instantly with no animation? <code>gsap.set()</code> is a zero-duration tween.</p>
        <CodeViewer code={`gsap.set(".box", { x: 100, opacity: 0.5 });`} />
      </Section>
    </>
  );
}
