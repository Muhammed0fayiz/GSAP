import { useState } from "react";
import gsap from "gsap";
import AnimationPreview from "./AnimationPreview";
import CodeViewer from "./CodeViewer";
import ControlPanel from "./ControlPanel";
import { tweenCode } from "../utils/codegen";

function Stage({ kind, flat }) {
  if (kind === "boxes")
    return (
      <div className="flex h-full w-full items-end justify-center gap-3 pb-10">
        {[1, 2, 3, 4, 5].map((n) => <div key={n} className="box demo-box h-12 w-12">{n}</div>)}
      </div>
    );
  if (kind === "text")
    return <div className="flex h-full items-center justify-center"><h3 className="box text-5xl font-black tracking-tight text-slate-400">GSAP</h3></div>;
  return (
    <div className={`flex h-full w-full items-center ${kind === "start" ? "justify-start pl-6" : "justify-center"}`}>
      <div className="box demo-box" style={flat ? { background: "#6ae534" } : undefined} />
    </div>
  );
}

export default function PropertyCard({ prop, index }) {
  const [values, setValues] = useState({ v: prop.control.value });
  const vars = prop.vars(values.v);
  const code = tweenCode("to", ".box", vars);
  const kind = prop.stage ?? "center";

  return (
    <section id={`prop-${prop.name.replace(/\W+/g, "")}`} className="prop-card card scroll-mt-24 p-5">
      <div className="mb-4 flex flex-wrap items-baseline gap-3">
        <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="font-mono text-xl font-bold text-brand-600 dark:text-brand-400">{prop.name}</h3>
        <span className="chip">{prop.group}</span>
      </div>
      <p className="mb-4 text-slate-600 dark:text-slate-400">{prop.desc}</p>
      <div className="grid gap-5 lg:grid-cols-2">
        <AnimationPreview
          height="h-52"
          deps={[values.v]}
          stageClass={prop.perspective ? "[perspective:600px]" : ""}
          build={() => gsap.to(".box", { ...vars })}
        >
          <Stage kind={kind} flat={prop.name === "backgroundColor"} />
        </AnimationPreview>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Try it yourself</p>
            <ControlPanel
              controls={[{ key: "v", label: prop.name, type: prop.control.type ?? "range", ...prop.control }]}
              values={values}
              onChange={setValues}
            />
          </div>
          <CodeViewer code={code} compact />
        </div>
      </div>
    </section>
  );
}
