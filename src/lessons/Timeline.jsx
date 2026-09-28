import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play, Rewind, SkipBack } from "lucide-react";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import CodeViewer from "../components/CodeViewer";

const positions = ["(none)", "<", ">", "+=1", "-=0.5", "<0.5", "0"];
const colors = ["from-brand-300 to-brand-500", "from-sky-300 to-sky-500", "from-fuchsia-300 to-fuchsia-500"];
const barColors = ["bg-brand-400", "bg-sky-400", "bg-fuchsia-400"];

const posArg = (p) => (p === "(none)" ? "" : isNaN(+p) ? `, "${p}"` : `, ${p}`);
const posVal = (p) => (p === "(none)" ? undefined : isNaN(+p) ? p : +p);

function TimelineDemo() {
  const scope = useRef(null);
  const tl = useRef(null);
  const head = useRef(null);
  const [pos, setPos] = useState({ 2: "(none)", 3: "(none)" });
  const [bars, setBars] = useState([]);
  const [total, setTotal] = useState(3);
  const [prog, setProg] = useState(0);
  const [playing, setPlaying] = useState(false);

  useGSAP(() => {
    const t = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const p = t.progress();
        if (head.current) head.current.style.left = `${p * 100}%`;
        setProg(p);
      },
      onComplete: () => setPlaying(false),
      onReverseComplete: () => setPlaying(false),
    });
    t.to(".b1", { x: 220, duration: 1 })
      .to(".b2", { x: 220, duration: 1 }, posVal(pos[2]))
      .to(".b3", { x: 220, rotation: 360, duration: 1 }, posVal(pos[3]));
    tl.current = t;
    setTotal(t.duration());
    setBars(t.getChildren().map((c) => ({ start: c.startTime(), dur: c.duration() })));
    const id = setTimeout(() => { t.play(); setPlaying(true); }, 300);
    return () => clearTimeout(id);
  }, { scope, dependencies: [pos[2], pos[3]], revertOnUpdate: true });

  const c = (fn) => () => { fn(tl.current); setPlaying(tl.current.isActive() || !tl.current.paused()); };
  const ticks = Array.from({ length: Math.floor(total) + 1 }, (_, i) => i);

  const code = `const tl = gsap.timeline();

tl.to(".box1", { x: 220, duration: 1 })
  .to(".box2", { x: 220, duration: 1 }${posArg(pos[2])})
  .to(".box3", { x: 220, rotation: 360, duration: 1 }${posArg(pos[3])});`;

  return (
    <div ref={scope} className="space-y-4">
      <div className="stage flex h-52 flex-col justify-center gap-4 px-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`b${n} demo-box h-11 w-11 bg-gradient-to-br ${colors[n - 1]} text-xs`}>BOX {n}</div>
        ))}
      </div>

      <div className="card p-4">
        <div className="relative ml-16">
          <div className="mb-1 flex justify-between font-mono text-[10px] text-slate-400">
            {ticks.map((t) => <span key={t}>{t}s</span>)}
          </div>
          <div className="relative space-y-2 border-l border-r border-slate-300 py-2 dark:border-white/10">
            {bars.map((b, i) => (
              <div key={i} className="relative h-6">
                <span className="absolute -left-16 top-1 w-14 text-right font-mono text-[11px] text-slate-500">BOX {i + 1}</span>
                <div className={`absolute h-6 rounded-md ${barColors[i]} opacity-90 transition-all duration-300`}
                  style={{ left: `${(b.start / total) * 100}%`, width: `${(b.dur / total) * 100}%` }} />
              </div>
            ))}
            <div ref={head} className="pointer-events-none absolute -top-1 bottom-0 w-0.5 bg-red-500" style={{ left: 0 }}>
              <span className="absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
            </div>
          </div>
        </div>
        <input type="range" min={0} max={1} step={0.001} value={prog} className="mt-4" aria-label="Scrub timeline"
          onChange={(e) => { tl.current.pause().progress(+e.target.value); setPlaying(false); }} />
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button className="btn-primary btn-sm w-20" onClick={c((t) => (t.isActive() ? t.pause() : t.progress() === 1 ? t.restart() : t.play()))}>
            {playing ? <Pause size={13} /> : <Play size={13} />} {playing ? "Pause" : "Play"}
          </button>
          <button className="btn-ghost btn-sm" onClick={c((t) => t.reverse())}><Rewind size={13} /> Reverse</button>
          <button className="btn-ghost btn-sm" onClick={c((t) => t.restart())}><SkipBack size={13} /> Restart</button>
          <span className="ml-auto self-center font-mono text-xs text-slate-400">total: {total.toFixed(2)}s</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="card space-y-4 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Position parameter</p>
          {[2, 3].map((n) => (
            <div key={n}>
              <label className="mb-1 block font-mono text-sm">BOX {n} position</label>
              <div className="flex flex-wrap gap-1">
                {positions.map((p) => (
                  <button key={p} onClick={() => setPos((s) => ({ ...s, [n]: p }))}
                    className={`btn-sm btn font-mono ${pos[n] === p ? "bg-brand-400 text-black" : "btn-ghost"}`}>{p}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <CodeViewer code={code} title="timeline.js" />
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <>
      <LessonHeader kicker="Lesson 05 · Sequencing" title="Timelines">
        <p>A <strong>timeline</strong> is a container for tweens. Add animations to it and they play <strong>one after another</strong> automatically — no more guessing delays. You can then control the whole sequence as one: play, pause, reverse, speed up.</p>
      </LessonHeader>

      <Section title="Without vs with a timeline">
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeViewer title="delays.js (fragile)" code={`gsap.to(".box1", { x: 300, duration: 1 });\ngsap.to(".box2", { y: 200, duration: 1, delay: 1 });\ngsap.to(".box3", { rotation: 360, duration: 1, delay: 2 });\n// change box1's duration → everything breaks`} />
          <CodeViewer title="timeline.js (robust)" code={`const tl = gsap.timeline();\n\ntl.to(".box1", { x: 300, duration: 1 });\ntl.to(".box2", { y: 200, duration: 1 });\ntl.to(".box3", { rotation: 360, duration: 1 });`} />
        </div>
      </Section>

      <Section title="See it on a timeline">
        <p>Each colored bar is one tween. The red playhead shows where we are. Drag the scrubber, then change the <b>position parameter</b> for box 2 and 3 to see how the bars move.</p>
        <TimelineDemo />
      </Section>

      <Section title="The position parameter cheat sheet">
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5"><tr><th className="p-3">Value</th><th className="p-3">Meaning</th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {[
                ["(none)", "At the end of the timeline (default)."],
                ['"<"', "At the START of the previous animation — play together."],
                ['">"', "At the END of the previous animation."],
                ['"+=1"', "1 second AFTER the end of the timeline (a gap)."],
                ['"-=0.5"', "0.5 seconds BEFORE the end — overlap."],
                ['"<0.5"', "0.5s after the previous animation starts."],
                ["2", "At exactly 2 seconds (absolute time)."],
                ['"myLabel"', "At a label you added with tl.addLabel(\"myLabel\")."],
              ].map(([v, m]) => (
                <tr key={v}><td className="p-3 font-mono text-brand-700 dark:text-brand-300">{v}</td><td className="p-3 text-slate-600 dark:text-slate-400">{m}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Timeline defaults & controls">
        <CodeViewer code={`const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" }, // shared by every child
  repeat: -1,
  yoyo: true,
  paused: true,
});

tl.to(".box1", { x: 300 })
  .to(".box2", { x: 300 }, "<")   // same time as box1
  .addLabel("spin")
  .to(".box3", { rotation: 360 }, "spin+=0.2");

tl.play();        // play
tl.pause();       // pause
tl.reverse();     // play backwards
tl.seek(1.5);     // jump to 1.5s
tl.timeScale(2);  // double speed`} />
        <Callout>Chaining (<code>tl.to().to().to()</code>) and writing separate lines do exactly the same thing — pick whichever you find easier to read.</Callout>
      </Section>
    </>
  );
}
