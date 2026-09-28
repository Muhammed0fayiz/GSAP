import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Zap, Gauge, Layers, Globe2, Wand2, ShieldCheck, Pause, Play, Rewind, FastForward } from "lucide-react";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import CodeViewer from "../components/CodeViewer";

const reasons = [
  { icon: Gauge, t: "Blazing fast", d: "Up to 20× faster than jQuery and smoother than most CSS setups for complex motion." },
  { icon: Layers, t: "Easy sequencing", d: "Timelines let you chain dozens of animations without calculating delays by hand." },
  { icon: Wand2, t: "Full control", d: "Pause, reverse, seek, speed up or slow down any animation at any moment." },
  { icon: ShieldCheck, t: "Works everywhere", d: "Handles browser inconsistencies for you. Same result in every modern browser." },
  { icon: Globe2, t: "Animate anything", d: "CSS, SVG, canvas, WebGL, React state, even plain JavaScript numbers." },
  { icon: Zap, t: "Now 100% free", d: "Every GSAP plugin — ScrollTrigger, SplitText, MorphSVG — is free for everyone." },
];

const usedBy = [
  ["Landing pages", "Hero reveals, headline animations, product intros"],
  ["Scroll storytelling", "Apple-style product pages driven by scroll"],
  ["UI micro-interactions", "Buttons, menus, modals, toasts, loaders"],
  ["Data & SVG", "Animated charts, icons, illustrations, line drawing"],
  ["Games & creative sites", "Award-winning Awwwards sites and interactive art"],
  ["Big brands", "Used on millions of sites incl. Google, Nike, Microsoft & Apple campaigns"],
];

function Comparison() {
  const scope = useRef(null);
  const tween = useRef(null);
  const [cssKey, setCssKey] = useState(0);

  const { contextSafe } = useGSAP(() => {
    tween.current = gsap.to(".gsap-box", { x: 240, duration: 2, ease: "power2.out", paused: true });
  }, { scope });

  const run = contextSafe((fn) => fn(tween.current));

  return (
    <div ref={scope} className="grid gap-5 lg:grid-cols-2">
      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between"><h4 className="font-semibold">CSS Animation</h4><span className="chip">fixed</span></div>
        <div className="stage mb-3 flex h-24 items-center px-4">
          <div key={cssKey} className="demo-box css-anim h-12 w-12 !from-sky-300 !to-sky-500" style={{ "--dist": "240px" }}>CSS</div>
        </div>
        <button className="btn-ghost btn-sm mb-3" onClick={() => setCssKey((k) => k + 1)}><Play size={13} /> Replay</button>
        <CodeViewer compact title="style.css" code={`.box {\n  animation: move 2s;\n}\n\n@keyframes move {\n  to { transform: translateX(240px); }\n}`} />
        <p className="mt-3 text-sm text-slate-500">Plays once. To pause, reverse or change the distance you need extra JavaScript and class juggling.</p>
      </div>
      <div className="card border-brand-400/40 p-5">
        <div className="mb-3 flex items-center justify-between"><h4 className="font-semibold">GSAP</h4><span className="chip !border-brand-400/40 !text-brand-600 dark:!text-brand-400">fully controllable</span></div>
        <div className="stage mb-3 flex h-24 items-center px-4"><div className="gsap-box demo-box h-12 w-12">GSAP</div></div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <button className="btn-primary btn-sm" onClick={() => run((t) => t.play())}><Play size={13} /> Play</button>
          <button className="btn-ghost btn-sm" onClick={() => run((t) => t.pause())}><Pause size={13} /> Pause</button>
          <button className="btn-ghost btn-sm" onClick={() => run((t) => t.reverse())}><Rewind size={13} /> Reverse</button>
          <button className="btn-ghost btn-sm" onClick={() => run((t) => t.timeScale(t.timeScale() === 1 ? 3 : 1).play())}><FastForward size={13} /> Speed ×3</button>
        </div>
        <CodeViewer compact code={`gsap.to(".box", {\n  x: 240,\n  duration: 2\n});`} />
        <p className="mt-3 text-sm text-slate-500">One line of JavaScript — and you can pause, reverse and speed it up while it's running.</p>
      </div>
    </div>
  );
}

export default function WhatIsGsap() {
  return (
    <>
      <LessonHeader kicker="Lesson 01 · Foundations" title="What is GSAP?">
        <p><strong>GSAP (GreenSock Animation Platform)</strong> is a JavaScript animation library used to create fast, smooth and professional animations for websites.</p>
        <p>Think of it as a remote control for anything on your page: you tell GSAP <em>what</em> to animate, <em>where</em> it should go and <em>how long</em> it should take — GSAP handles all the math, every frame.</p>
      </LessonHeader>

      <Section title="The idea in one sentence">
        <CodeViewer code={`// "Hey GSAP, move .box 500px to the right over 2 seconds."\ngsap.to(".box", { x: 500, duration: 2 });`} />
      </Section>

      <Section title="Why developers use GSAP">
        <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: I, t, d }) => (
            <div key={t} className="card p-4">
              <I className="mb-2 text-brand-500" size={22} />
              <h4 className="font-semibold text-slate-900 dark:text-white">{t}</h4>
              <p className="!mb-0 mt-1 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What problems does it solve?">
        <p>Plain CSS is great for simple hover effects. But real projects quickly need things CSS struggles with:</p>
        <ul className="mb-4 ml-5 list-disc space-y-1 text-slate-600 dark:text-slate-400">
          <li><strong>Sequencing</strong> — "fade the title, <em>then</em> slide the button, <em>then</em> pop the image".</li>
          <li><strong>Control</strong> — pausing, reversing or scrubbing an animation with the scroll bar.</li>
          <li><strong>Dynamic values</strong> — animating to a position you only know at runtime (mouse, data, screen size).</li>
          <li><strong>Consistency</strong> — transforms, SVG and colors behaving the same in every browser.</li>
        </ul>
        <p>Doing this by hand means juggling <code>requestAnimationFrame</code>, timers, easing math and cleanup. GSAP does it in one readable line.</p>
      </Section>

      <Section title="CSS vs GSAP — see the difference">
        <Comparison />
      </Section>

      <Section title="Where is GSAP used?">
        <div className="grid gap-3 sm:grid-cols-2">
          {usedBy.map(([t, d]) => (
            <div key={t} className="flex gap-3 rounded-xl border border-slate-200 p-4 dark:border-white/10">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
              <div><p className="!mb-0 font-semibold text-slate-900 dark:text-white">{t}</p><p className="!mb-0 text-sm">{d}</p></div>
            </div>
          ))}
        </div>
        <Callout>Install it in any project with <code>npm install gsap</code> — and in React add <code>@gsap/react</code> for the <code>useGSAP()</code> hook, which cleans up animations automatically.</Callout>
      </Section>

      <Section title="Setting up GSAP in React">
        <CodeViewer title="App.jsx" code={`import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function App() {
  const container = useRef(null);

  useGSAP(() => {
    // selectors are scoped to "container"
    gsap.to(".box", { x: 500, duration: 2 });
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="box">Hello GSAP</div>
    </div>
  );
}`} />
      </Section>
    </>
  );
}
