import { useState } from "react";
import gsap from "gsap";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import AnimationPreview from "../components/AnimationPreview";
import ControlPanel from "../components/ControlPanel";
import CodeViewer from "../components/CodeViewer";

const controls = [
  { key: "count", label: "Number of boxes", min: 2, max: 20, step: 1 },
  { key: "each", label: "Stagger delay", min: 0, max: 0.5, step: 0.02, unit: "s" },
  { key: "duration", label: "Duration", min: 0.2, max: 3, step: 0.1, unit: "s" },
  { key: "direction", label: "Direction", type: "select", options: ["horizontal (x)", "vertical (y)"] },
  { key: "from", label: "Stagger from", type: "select", options: ["start", "center", "end", "edges", "random"] },
];

export default function Stagger() {
  const [v, setV] = useState({ count: 10, each: 0.1, duration: 1, direction: "horizontal (x)", from: "start" });
  const horiz = v.direction.startsWith("h");
  const staggerVal = v.from === "start" ? v.each : { each: v.each, from: v.from };
  const vars = horiz ? { x: 260 } : { y: -120 };
  const staggerStr = v.from === "start" ? v.each : `{ each: ${v.each}, from: "${v.from}" }`;
  const code = `gsap.to(".box", {\n  ${horiz ? "x: 260" : "y: -120"},\n  duration: ${v.duration},\n  stagger: ${staggerStr}\n});`;

  return (
    <>
      <LessonHeader kicker="Lesson 06 · Sequencing" title="Stagger">
        <p><strong>Stagger creates a delay between each element's animation.</strong> Instead of 10 boxes moving at once, they move one after another — like a wave or falling dominoes. One property, huge visual impact.</p>
      </LessonHeader>

      <Section title="Stagger playground">
        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="flex min-w-0 flex-col gap-4">
            <AnimationPreview height="h-80" deps={[JSON.stringify(v)]}
              build={() => gsap.to(".box", { ...vars, duration: v.duration, ease: "power2.out", stagger: staggerVal })}>
              {horiz ? (
                <div className="flex h-full flex-col justify-center gap-[3px] px-5">
                  {Array.from({ length: v.count }, (_, i) => (
                    <div key={i} className="box h-full max-h-6 w-10 rounded bg-gradient-to-r from-brand-300 to-brand-500" />
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-end justify-center gap-1.5 px-4 pb-6">
                  {Array.from({ length: v.count }, (_, i) => (
                    <div key={i} className="box h-8 flex-1 max-w-10 rounded-md bg-gradient-to-t from-brand-500 to-brand-300" />
                  ))}
                </div>
              )}
            </AnimationPreview>
            <CodeViewer code={code} />
          </div>
          <div className="card h-fit p-5"><ControlPanel controls={controls} values={v} onChange={setV} /></div>
        </div>
        <Callout>Total time = <code>duration + stagger × (count − 1)</code>. With your settings: <code>{v.duration} + {v.each} × {v.count - 1} = {(v.duration + v.each * (v.count - 1)).toFixed(2)}s</code></Callout>
      </Section>

      <Section title="Grid stagger">
        <p>Stagger even understands grids. Here each dot waits based on its distance from the center:</p>
        <div className="grid gap-5 lg:grid-cols-2">
          <AnimationPreview height="h-72"
            build={() => gsap.timeline({ repeat: -1, repeatDelay: 0.3 })
              .to(".dot", { scale: 0.2, backgroundColor: "#3b82f6", duration: 0.6, stagger: { grid: [9, 9], from: "center", amount: 1 } })
              .to(".dot", { scale: 1, backgroundColor: "#6ae534", duration: 0.6, stagger: { grid: [9, 9], from: "center", amount: 1 } })}>
            <div className="grid h-full place-items-center">
              <div className="grid grid-cols-9 gap-2">
                {Array.from({ length: 81 }, (_, i) => <div key={i} className="dot h-4 w-4 rounded-full bg-brand-400" />)}
              </div>
            </div>
          </AnimationPreview>
          <CodeViewer code={`gsap.to(".dot", {\n  scale: 0.2,\n  duration: 0.6,\n  stagger: {\n    grid: [9, 9],     // rows, columns (or "auto")\n    from: "center",   // start, end, center, edges, random, or an index\n    amount: 1         // total time spread across ALL items\n  }\n});`} />
        </div>
      </Section>

      <Section title="each vs amount">
        <p><code>each: 0.1</code> means "wait 0.1s between every element" — more elements = longer animation. <code>amount: 1</code> means "spread all elements across 1 second in total" — no matter how many there are.</p>
      </Section>
    </>
  );
}
