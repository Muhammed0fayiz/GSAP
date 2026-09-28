import { useState } from "react";
import gsap from "gsap";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import AnimationPreview from "../components/AnimationPreview";
import CodeViewer from "../components/CodeViewer";
import ControlPanel from "../components/ControlPanel";

const rows = ["top", "center", "bottom"];
const cols = ["left", "center", "right"];
const pct = { top: 0, left: 0, center: 50, bottom: 100, right: 100 };
const label = (r, c) => (r === "center" && c === "center" ? "center" : r === "center" ? `center ${c}` : `${r} ${c}`);

export default function TransformOrigin() {
  const [origin, setOrigin] = useState({ r: "top", c: "left" });
  const [v, setV] = useState({ mode: "rotation", amount: 90 });
  const originStr = label(origin.r, origin.c);
  const prop = v.mode === "rotation" ? { rotation: v.amount } : { scale: v.amount / 90 + 0.2 };
  const code = `gsap.to(".box", {\n  ${Object.entries(prop).map(([k, x]) => `${k}: ${+x.toFixed(2)}`).join(", ")},\n  transformOrigin: "${originStr}",\n  duration: 1\n});`;

  return (
    <>
      <LessonHeader kicker="Lesson 10 · Transform" title="Transform Origin">
        <p><code>transformOrigin</code> is the <strong>pivot point</strong> — the spot that stays pinned while the element rotates or scales. Imagine sticking a pin through a piece of paper and spinning it: where you put the pin changes everything.</p>
      </LessonHeader>

      <Section title="Click a point to move the origin">
        <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
          <div className="flex min-w-0 flex-col gap-4">
            <AnimationPreview height="h-80" deps={[originStr, v.mode, v.amount]}
              build={() => gsap.to(".box", { ...prop, transformOrigin: originStr, duration: 1, ease: "power2.inOut" })}>
              <div className="flex h-full items-center justify-center">
                <div className="relative h-28 w-28">
                  <div className="absolute inset-0 rounded-xl border-2 border-dashed border-slate-400/50" />
                  <div className="box relative h-28 w-28 rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 opacity-90 shadow-lg" />
                  <span className="pointer-events-none absolute z-10 -ml-2 -mt-2 h-4 w-4 rounded-full border-2 border-white bg-red-500 shadow-lg transition-all duration-300"
                    style={{ left: `${pct[origin.c]}%`, top: `${pct[origin.r]}%` }} />
                </div>
              </div>
            </AnimationPreview>
            <CodeViewer code={code} />
          </div>
          <div className="card h-fit space-y-5 p-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Origin point</p>
              <div className="grid grid-cols-3 gap-1.5">
                {rows.map((r) => cols.map((c) => {
                  const active = origin.r === r && origin.c === c;
                  return (
                    <button key={r + c} onClick={() => setOrigin({ r, c })} title={label(r, c)}
                      className={`rounded-lg border px-1 py-2 text-[11px] font-medium capitalize transition ${active ? "border-brand-400 bg-brand-400 text-black" : "border-slate-200 hover:border-brand-400 dark:border-white/10"}`}>
                      {label(r, c)}
                    </button>
                  );
                }))}
              </div>
            </div>
            <ControlPanel values={v} onChange={setV} controls={[
              { key: "mode", label: "animate", type: "select", options: ["rotation", "scale"] },
              { key: "amount", label: v.mode === "rotation" ? "rotation" : "strength", min: 15, max: 360, step: 15 },
            ]} />
          </div>
        </div>
      </Section>

      <Callout>Besides keywords, you can use percentages or pixels: <code>transformOrigin: "50% 100%"</code> or <code>"20px 40px"</code>. For SVG elements use <code>svgOrigin</code> or GSAP's automatic handling of <code>transformOrigin</code>.</Callout>
    </>
  );
}
