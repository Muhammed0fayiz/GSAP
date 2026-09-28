import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play } from "lucide-react";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import CodeViewer from "../components/CodeViewer";
import ControlPanel from "../components/ControlPanel";

function Counter() {
  const [v, setV] = useState({ from: 10, to: 200, duration: 2, ease: "power1.out" });
  const [num, setNum] = useState(10);
  const [trail, setTrail] = useState([]);
  const tw = useRef(null);
  const { contextSafe } = useGSAP();

  const play = contextSafe(() => {
    const obj = { myNum: v.from };
    let last = -1;
    const samples = [];
    tw.current?.kill();
    tw.current = gsap.to(obj, {
      myNum: v.to,
      duration: v.duration,
      ease: v.ease,
      onUpdate: () => {
        setNum(obj.myNum);
        const bucket = Math.floor((obj.myNum - v.from) / ((v.to - v.from) / 5 || 1));
        if (bucket !== last) { last = bucket; samples.push(Math.round(obj.myNum)); setTrail([...samples]); }
      },
      onComplete: () => setTrail([...samples.filter((s) => s !== Math.round(v.to)), Math.round(v.to)]),
    });
  });

  useGSAP(() => { play(); return () => tw.current?.kill(); });

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="stage grid h-64 grid-cols-[1fr_auto] items-center gap-6 px-6">
          <div>
            <p className="font-mono text-xs text-slate-400">obj.myNum</p>
            <p className="font-mono text-6xl font-black tabular-nums text-brand-600 sm:text-7xl dark:text-brand-400">{num.toFixed(v.to - v.from > 20 ? 0 : 1)}</p>
            <div className="mt-3 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full bg-brand-400" style={{ width: `${((num - v.from) / (v.to - v.from || 1)) * 100}%` }} />
            </div>
          </div>
          <div className="flex h-56 flex-col items-center justify-start overflow-hidden font-mono text-sm">
            {trail.map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                {i > 0 && <span className="text-slate-400">↓</span>}
                <span className={i === trail.length - 1 ? "font-bold text-brand-600 dark:text-brand-400" : "text-slate-500"}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <CodeViewer code={`let obj = {\n  myNum: ${v.from}\n};\n\ngsap.to(obj, {\n  myNum: ${v.to},\n  duration: ${v.duration},\n  ease: "${v.ease}",\n\n  onUpdate: () => {\n    console.log(obj.myNum);\n    counter.textContent = Math.round(obj.myNum);\n  }\n});`} />
      </div>
      <div className="card h-fit space-y-5 p-5">
        <ControlPanel values={v} onChange={setV} controls={[
          { key: "from", label: "start myNum", min: 0, max: 100, step: 5 },
          { key: "to", label: "end myNum", min: 50, max: 1000, step: 10 },
          { key: "duration", min: 0.5, max: 5, step: 0.5, unit: "s" },
          { key: "ease", type: "select", options: ["none", "power1.out", "power4.out", "expo.out", "bounce.out", "steps(10)"] },
        ]} />
        <button className="btn-primary w-full" onClick={play}><Play size={14} /> Run</button>
      </div>
    </div>
  );
}

export default function ObjectAnimation() {
  return (
    <>
      <LessonHeader kicker="Lesson 08 · Beyond the DOM" title="Object Animation">
        <p>Here's a secret: GSAP doesn't really animate "elements". It animates <strong>numbers on objects</strong>. A DOM element's style is just one kind of object — you can animate <em>any</em> JavaScript object.</p>
      </LessonHeader>

      <Section title="Animating a plain number">
        <p>GSAP changes <code>obj.myNum</code> from 10 to 200 over 2 seconds. But nothing on screen changes by itself — so we use <code>onUpdate</code> to read the value on every frame and display it.</p>
        <Counter />
      </Section>

      <Section title="Why onUpdate matters">
        <p><code>onUpdate</code> runs roughly 60 times per second while the tween runs. Each time, <code>obj.myNum</code> holds the current in-between value (10 → 34 → 67 → 120 → 170 → 200). Whatever you do inside it — updating text, redrawing a canvas, setting a 3D camera position — becomes animated.</p>
        <Callout>Real uses: animated stats counters, progress percentages, canvas & Three.js scenes, audio volume fades, chart values, and scroll positions.</Callout>
      </Section>

      <Section title="Pro tip: snap to whole numbers">
        <CodeViewer code={`gsap.to(obj, {\n  myNum: 200,\n  duration: 2,\n  snap: { myNum: 1 },   // round to whole numbers\n  onUpdate: () => (el.textContent = obj.myNum)\n});\n\n// Or animate the text directly:\ngsap.to(".counter", { innerText: 200, snap: { innerText: 1 }, duration: 2 });`} />
      </Section>
    </>
  );
}
