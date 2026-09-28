import { useState } from "react";
import gsap from "gsap";
import { RefreshCw } from "lucide-react";
import AnimationPreview from "./AnimationPreview";
import ControlPanel from "./ControlPanel";
import CodeViewer from "./CodeViewer";
import { tweenCode } from "../utils/codegen";
import { eases } from "../data/eases";

export const defaults = {
  method: "to", shape: "box", x: 200, y: 0, scale: 1.5, rotation: 180, opacity: 1,
  borderRadius: 12, backgroundColor: "#6ae534", duration: 2, delay: 0, ease: "power2.out",
  repeat: 0, yoyo: false,
};

const transformControls = [
  { key: "x", min: -300, max: 300, step: 10, unit: "px" },
  { key: "y", min: -120, max: 120, step: 10, unit: "px" },
  { key: "scale", min: 0, max: 3, step: 0.1 },
  { key: "rotation", min: -720, max: 720, step: 15, unit: "°" },
  { key: "opacity", min: 0, max: 1, step: 0.05 },
  { key: "borderRadius", min: 0, max: 50, step: 1, unit: "%" },
];
const styleControls = [
  { key: "backgroundColor", type: "color", swatches: ["#6ae534", "#3b82f6", "#ff3d71", "#f59e0b", "#a855f7"] },
];
const timingControls = [
  { key: "method", type: "select", options: ["to", "from"], hint: "to: animate TO these values · from: animate FROM them" },
  { key: "shape", type: "select", options: ["box", "circle", "text"] },
  { key: "duration", min: 0.1, max: 5, step: 0.1, unit: "s" },
  { key: "delay", min: 0, max: 3, step: 0.1, unit: "s" },
  { key: "ease", type: "select", options: eases.map((e) => e.name) },
  { key: "repeat", min: -1, max: 5, step: 1, hint: "-1 = infinite" },
  { key: "yoyo", type: "toggle" },
];

export function buildVars(v) {
  const vars = {
    x: v.x, y: v.y, scale: v.scale, rotation: v.rotation, opacity: v.opacity,
    borderRadius: `${v.borderRadius}%`, backgroundColor: v.backgroundColor,
    duration: v.duration, ease: v.ease,
  };
  if (v.delay) vars.delay = v.delay;
  if (v.repeat) vars.repeat = v.repeat;
  if (v.yoyo) vars.yoyo = true;
  return vars;
}

export default function InteractivePlayground({ compact = false }) {
  const [values, setValues] = useState(defaults);
  const vars = buildVars(values);
  const code = tweenCode(values.method, ".box", vars);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="flex min-w-0 flex-col gap-4">
        <AnimationPreview
          height={compact ? "h-72" : "h-80 sm:h-[26rem]"}
          deps={[JSON.stringify(values)]}
          build={() => gsap[values.method](".box", { ...vars })}
        >
          <div className="flex h-full items-center justify-center">
            {values.shape === "text" ? (
              <div className="box rounded-xl px-5 py-3 text-3xl font-black text-black" style={{ background: "#6ae534" }}>GSAP</div>
            ) : (
              <div className={`box demo-box h-20 w-20 ${values.shape === "circle" ? "!rounded-full" : ""}`} style={{ background: "#6ae534" }} />
            )}
          </div>
          <span className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">.box</span>
        </AnimationPreview>
        <CodeViewer code={code} title="playground.js" />
      </div>

      <aside className="card h-fit space-y-6 p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Controls</h3>
          <button className="btn-ghost btn-sm" onClick={() => setValues(defaults)}><RefreshCw size={13} /> Reset values</button>
        </div>
        <ControlPanel title="Transform" controls={transformControls} values={values} onChange={setValues} />
        <ControlPanel title="Style" controls={styleControls} values={values} onChange={setValues} />
        <ControlPanel title="Timing & Method" controls={timingControls} values={values} onChange={setValues} />
      </aside>
    </div>
  );
}
