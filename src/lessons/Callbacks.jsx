import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, Rewind, Trash2 } from "lucide-react";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import CodeViewer from "../components/CodeViewer";

const cbColor = {
  onStart: "text-sky-400", onUpdate: "text-slate-400", onComplete: "text-brand-400",
  onRepeat: "text-amber-400", onReverseComplete: "text-fuchsia-400",
};

const explain = [
  ["onStart", "Runs once, when the animation begins."],
  ["onUpdate", "Runs on EVERY frame (~60× per second) while it's animating."],
  ["onComplete", "Runs when the animation reaches the end."],
  ["onRepeat", "Runs each time a repeat cycle starts."],
  ["onReverseComplete", "Runs when a reversed animation gets back to the start."],
];

function ConsoleDemo() {
  const scope = useRef(null);
  const tween = useRef(null);
  const out = useRef(null);
  const [logs, setLogs] = useState([]);
  const [prog, setProg] = useState(0);
  const [logUpdate, setLogUpdate] = useState(false);
  const logUpdateRef = useRef(false);
  logUpdateRef.current = logUpdate;
  const t0 = useRef(performance.now());

  const log = (type, msg) => {
    setLogs((l) => [...l.slice(-60), { type, msg, t: ((performance.now() - t0.current) / 1000).toFixed(2) }]);
    requestAnimationFrame(() => out.current && (out.current.scrollTop = out.current.scrollHeight));
  };

  useGSAP(() => {
    let frame = 0;
    tween.current = gsap.to(".box", {
      x: 240, rotation: 180, duration: 1.5, repeat: 1, repeatDelay: 0.3, paused: true, ease: "power1.inOut",
      onStart: () => log("onStart", "Animation started"),
      onUpdate: function () {
        setProg(this.progress());
        if (logUpdateRef.current && frame++ % 8 === 0) log("onUpdate", `progress: ${this.progress().toFixed(2)}`);
      },
      onRepeat: () => log("onRepeat", "Repeating…"),
      onComplete: () => log("onComplete", "Animation completed"),
      onReverseComplete: () => log("onReverseComplete", "Back at the start"),
    });
  }, { scope });

  const { contextSafe } = useGSAP({ scope });
  const play = contextSafe(() => { t0.current = performance.now(); tween.current.restart(); });
  const reverse = contextSafe(() => tween.current.reverse());

  return (
    <div ref={scope} className="grid gap-5 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="stage flex h-40 items-center px-6"><div className="box demo-box">box</div></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full bg-brand-400" style={{ width: `${prog * 100}%` }} /></div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button className="btn-primary btn-sm" onClick={play}><Play size={13} /> Play</button>
          <button className="btn-ghost btn-sm" onClick={reverse}><Rewind size={13} /> Reverse</button>
          <button className="btn-ghost btn-sm" onClick={() => setLogs([])}><Trash2 size={13} /> Clear</button>
          <label className="ml-auto flex items-center gap-2 text-xs"><input type="checkbox" checked={logUpdate} onChange={(e) => setLogUpdate(e.target.checked)} /> log onUpdate</label>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0f1117]">
        <div className="border-b border-white/5 px-3 py-2 font-mono text-xs text-slate-400">Console</div>
        <div ref={out} className="h-56 overflow-y-auto p-3 font-mono text-xs">
          {logs.length === 0 && <p className="text-slate-600">› Press Play to see callbacks fire…</p>}
          {logs.map((l, i) => (
            <div key={i} className="flex gap-3 py-0.5">
              <span className="text-slate-600">{l.t}s</span>
              <span className={`w-36 shrink-0 ${cbColor[l.type]}`}>{l.type}</span>
              <span className="text-slate-300">{l.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Callbacks() {
  return (
    <>
      <LessonHeader kicker="Lesson 07 · Control" title="Callbacks">
        <p>Callbacks are functions GSAP calls for you at key moments of an animation. Use them to <strong>update text, play a sound, load the next section, or start another animation</strong>.</p>
      </LessonHeader>

      <Section title="The five callbacks">
        <div className="grid gap-2 sm:grid-cols-2">
          {explain.map(([n, d]) => (
            <div key={n} className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
              <p className={`!mb-0 font-mono font-semibold ${cbColor[n].replace("400", "500")}`}>{n}</p>
              <p className="!mb-0 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Watch them fire">
        <p>This tween repeats once. Press <b>Play</b>, then <b>Reverse</b> after it ends, and watch the console.</p>
        <ConsoleDemo />
      </Section>

      <Section title="Code">
        <CodeViewer code={`gsap.to(".box", {
  x: 240,
  duration: 1.5,
  repeat: 1,

  onStart: () => {
    console.log("Animation started");
  },
  onUpdate: function () {
    console.log(this.progress()); // 0 → 1
  },
  onRepeat: () => {
    console.log("Repeating…");
  },
  onComplete: () => {
    console.log("Animation completed");
  },
  onReverseComplete: () => {
    console.log("Back at the start");
  }
});`} />
        <Callout>Use a regular <code>function () {"{}"}</code> (not an arrow function) if you want <code>this</code> to refer to the tween — handy for <code>this.progress()</code>.</Callout>
      </Section>
    </>
  );
}
