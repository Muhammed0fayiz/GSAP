import { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play } from "lucide-react";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import CodeViewer from "../components/CodeViewer";
import AnimationPreview from "../components/AnimationPreview";
import { eases } from "../data/eases";

const withType = (name, type) => (name.includes(".out") ? name.replace(".out", `.${type}`) : name);

export function EaseCurve({ ease, size = 160 }) {
  const path = useMemo(() => {
    const fn = gsap.parseEase(ease);
    const pad = 0.2 * size;
    const h = size - pad * 2;
    let d = "";
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = t * size;
      const y = size - pad - fn(t) * h;
      d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    }
    return { d, pad };
  }, [ease, size]);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full overflow-visible">
      <line x1="0" y1={size - path.pad} x2={size} y2={size - path.pad} className="stroke-slate-400/40" strokeDasharray="3 3" />
      <line x1="0" y1={path.pad} x2={size} y2={path.pad} className="stroke-slate-400/40" strokeDasharray="3 3" />
      <path d={path.d} fill="none" stroke="#6ae534" strokeWidth="3" strokeLinecap="round" />
      <text x="4" y={size - path.pad + 14} className="fill-slate-400 text-[9px] font-mono">start</text>
      <text x="4" y={path.pad - 6} className="fill-slate-400 text-[9px] font-mono">end</text>
    </svg>
  );
}

function Race() {
  const scope = useRef(null);
  const [type, setType] = useState("out");
  const [sel, setSel] = useState(2);
  const selected = eases[sel];
  const selName = withType(selected.name, type);

  const { contextSafe } = useGSAP({ scope });

  const playAll = contextSafe(() => {
    gsap.killTweensOf(".dot");
    gsap.set(".dot", { x: 0 });
    scope.current.querySelectorAll(".lane").forEach((lane, i) => {
      const dot = lane.querySelector(".dot");
      const dist = lane.clientWidth - 110 - 24;
      gsap.to(dot, { x: dist, duration: 2, ease: withType(eases[i].name, type) });
    });
  });

  const playOne = contextSafe((i) => {
    setSel(i);
    const lane = scope.current.querySelectorAll(".lane")[i];
    const dot = lane.querySelector(".dot");
    gsap.killTweensOf(dot);
    gsap.fromTo(dot, { x: 0 }, { x: lane.clientWidth - 110 - 24, duration: 2, ease: withType(eases[i].name, type) });
  });

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
      <div ref={scope} className="card p-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button className="btn-primary btn-sm" onClick={playAll}><Play size={13} /> Play all</button>
          <div className="ml-auto flex rounded-lg border border-slate-200 p-0.5 dark:border-white/10">
            {["in", "out", "inOut"].map((t) => (
              <button key={t} onClick={() => setType(t)} className={`btn-sm btn font-mono ${type === t ? "bg-brand-400 text-black" : ""}`}>.{t}</button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          {eases.map((e, i) => (
            <button key={e.name} onClick={() => playOne(i)}
              className={`lane relative flex h-10 w-full items-center rounded-lg border text-left transition ${sel === i ? "border-brand-400 bg-brand-400/10" : "border-transparent hover:bg-slate-100 dark:hover:bg-white/5"}`}>
              <span className={`w-[110px] shrink-0 pl-3 font-mono text-xs font-semibold ${sel === i ? "text-brand-600 dark:text-brand-400" : "text-slate-500"}`}>{e.label}</span>
              <span className="relative h-px flex-1 bg-slate-300 dark:bg-white/10" />
              <span className="dot absolute left-[110px] h-5 w-5 rounded-md bg-gradient-to-br from-brand-300 to-brand-500 shadow" />
            </button>
          ))}
        </div>
      </div>
      <div className="card flex flex-col gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">Selected ease</p>
          <p className="font-mono text-lg font-bold text-brand-600 dark:text-brand-400">{selName}</p>
        </div>
        <div className="mx-auto aspect-square w-40"><EaseCurve ease={selName} /></div>
        <p className="!mb-0 text-sm">{selected.desc}</p>
        <CodeViewer compact code={`gsap.to(".box", {\n  x: 500,\n  duration: 2,\n  ease: "${selName}"\n});`} />
      </div>
    </div>
  );
}

export default function Easing() {
  const [dir, setDir] = useState("power2.out");
  return (
    <>
      <LessonHeader kicker="Lesson 04 · Core" title="GSAP Easing">
        <p><strong>Easing controls how an animation moves over time.</strong> Two animations can take the same 2 seconds and travel the same distance, yet one feels robotic and the other feels alive. The difference is the ease.</p>
      </LessonHeader>

      <Section title="Start with no easing">
        <p>With <code>ease: "none"</code> the element moves at exactly the same speed the whole time — like a conveyor belt. Real objects don't move like that; they speed up and slow down.</p>
        <div className="grid gap-5 lg:grid-cols-2">
          <AnimationPreview height="h-32" build={() => gsap.to(".box", { x: 260, duration: 2, ease: "none" })}>
            <div className="flex h-full items-center pl-6"><div className="box demo-box h-12 w-12" /></div>
          </AnimationPreview>
          <CodeViewer code={`gsap.to(".box", {\n  x: 260,\n  duration: 2,\n  ease: "none"\n});`} />
        </div>
      </Section>

      <Section title="in · out · inOut">
        <p>Almost every ease comes in three flavours. The suffix decides <em>where</em> the slow part happens:</p>
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          {[
            ["power2.in", ".in", "Slow → Fast", "Starts gently, ends abruptly. Good for things leaving the screen."],
            ["power2.out", ".out", "Fast → Slow", "Starts fast, lands softly. The best default for UI & entrances."],
            ["power2.inOut", ".inOut", "Slow → Fast → Slow", "Smooth at both ends. Great for things moving on-screen."],
          ].map(([name, s, flow, d]) => (
            <button key={name} onClick={() => setDir(name)} className={`card p-4 text-left transition ${dir === name ? "!border-brand-400 shadow-glow" : "hover:border-brand-400/50"}`}>
              <p className="font-mono text-lg font-bold text-brand-600 dark:text-brand-400">{s}</p>
              <p className="font-semibold text-slate-900 dark:text-white">{flow}</p>
              <p className="!mb-0 mt-1 text-sm">{d}</p>
            </button>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_180px]">
          <AnimationPreview height="h-32" deps={[dir]} build={() => gsap.to(".box", { x: 260, duration: 2, ease: dir })}>
            <div className="flex h-full items-center pl-6"><div className="box demo-box h-12 w-12" /></div>
          </AnimationPreview>
          <div className="card mx-auto aspect-square w-44 p-2"><EaseCurve ease={dir} /></div>
        </div>
      </Section>

      <Section title="Compare every ease side by side">
        <p>Hit <b>Play all</b> to race them, or click any row to highlight it, replay it, see its curve and copy its code. Switch between <code>.in</code>, <code>.out</code> and <code>.inOut</code> at the top.</p>
        <Race />
      </Section>

      <Callout>Not sure which to pick? Use <code>power2.out</code> for entrances, <code>power2.in</code> for exits, <code>power2.inOut</code> for movement, and <code>back.out</code> when you want some personality.</Callout>

      <Section title="Set a default ease for everything">
        <CodeViewer code={`gsap.defaults({\n  ease: "power3.out",\n  duration: 1\n});`} />
      </Section>
    </>
  );
}
