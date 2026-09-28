import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MousePointer2 } from "lucide-react";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import CodeViewer from "../components/CodeViewer";
import ControlPanel from "../components/ControlPanel";

const concepts = [
  ["trigger", "The element whose position decides when the animation starts and ends."],
  ["start", `"top center" = when the TOP of the trigger hits the CENTER of the viewport. First word = trigger, second = viewport.`],
  ["end", `"bottom top" = when the BOTTOM of the trigger hits the TOP of the viewport.`],
  ["scrub", "Links the animation progress directly to the scrollbar. true = instant, a number = seconds of smoothing."],
  ["pin", "Sticks the trigger in place while you scroll through the start → end range."],
  ["markers", "Shows start/end lines on screen while developing. Remove for production!"],
  ["toggleActions", `What happens on onEnter, onLeave, onEnterBack, onLeaveBack. e.g. "play none none reverse".`],
];

function ScrollDemo() {
  const scroller = useRef(null);
  const [v, setV] = useState({ start: "top center", end: "bottom top", scrub: true, smooth: 0, pin: false, markers: true, toggleActions: "play none none reverse" });
  const [prog, setProg] = useState(0);

  useGSAP(() => {
    const scrubVal = v.scrub ? (v.smooth ? v.smooth : true) : false;
    gsap.to(".st-box", {
      x: () => scroller.current.clientWidth - 140,
      rotation: 360,
      backgroundColor: "#3b82f6",
      ease: "none",
      scrollTrigger: {
        trigger: ".st-trigger",
        scroller: scroller.current,
        start: v.start,
        end: v.end,
        scrub: scrubVal,
        pin: v.pin,
        markers: v.markers,
        toggleActions: v.toggleActions,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProg(self.progress),
      },
    });
    scroller.current.scrollTop = 0;
    ScrollTrigger.refresh();
  }, { scope: scroller, dependencies: [JSON.stringify(v)], revertOnUpdate: true });

  const code = `gsap.to(".box", {
  x: 500,
  rotation: 360,
  scrollTrigger: {
    trigger: ".box",
    start: "${v.start}",
    end: "${v.end}",
${v.scrub ? `    scrub: ${v.smooth ? v.smooth : "true"},` : `    toggleActions: "${v.toggleActions}",`}
${v.pin ? "    pin: true,\n" : ""}    markers: ${v.markers}
  }
});`;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="relative">
          <div ref={scroller} className="stage h-[420px] overflow-y-auto overflow-x-hidden !border-solid">
            <div className="flex h-[380px] flex-col items-center justify-center gap-2 text-slate-400">
              <MousePointer2 className="animate-bounce" />
              <p className="text-sm">Scroll down inside this box ↓</p>
            </div>
            <div className="st-trigger relative mx-4 flex h-56 items-center rounded-xl border border-brand-400/30 bg-brand-400/5 px-4">
              <span className="absolute right-3 top-2 font-mono text-[10px] text-brand-600 dark:text-brand-400">.trigger</span>
              <div className="st-box demo-box h-20 w-20" style={{ backgroundImage: "none", backgroundColor: "#6ae534" }}>box</div>
            </div>
            <div className="h-[520px]" />
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-1.5 font-mono text-xs text-white backdrop-blur">
            progress <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20"><div className="h-full bg-brand-400" style={{ width: `${prog * 100}%` }} /></div> {prog.toFixed(2)}
          </div>
        </div>
        <CodeViewer code={code} title="scroll.js" />
      </div>
      <div className="card h-fit p-5">
        <ControlPanel values={v} onChange={setV} controls={[
          { key: "start", type: "select", options: ["top bottom", "top 80%", "top center", "center center", "top top"] },
          { key: "end", type: "select", options: ["bottom top", "bottom center", "center top", "+=300", "+=600"] },
          { key: "scrub", type: "toggle", hint: "Off = the animation plays by itself when triggered" },
          ...(v.scrub ? [{ key: "smooth", label: "scrub smoothing", min: 0, max: 3, step: 0.5, unit: "s" }] : [
            { key: "toggleActions", type: "select", options: ["play none none reverse", "play none none none", "play pause resume reset", "restart none none reverse", "play complete reverse reset"] }]),
          { key: "pin", type: "toggle" },
          { key: "markers", type: "toggle" },
        ]} />
      </div>
    </div>
  );
}

function PageScrollDemo() {
  const scope = useRef(null);
  useGSAP(() => {
    gsap.utils.toArray(".reveal-card").forEach((card, i) => {
      gsap.from(card, {
        y: 80, opacity: 0, rotation: i % 2 ? 4 : -4, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
    gsap.to(".read-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: scope.current, start: "top center", end: "bottom center", scrub: true } });
  }, { scope });
  return (
    <div ref={scope}>
      <div className="glass sticky top-16 z-10 mb-4 h-1.5 overflow-hidden rounded-full"><div className="read-progress h-full origin-left scale-x-0 bg-brand-400" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        {["Fade up", "Slide in", "Rotate in", "Stagger", "Scrub", "Pin"].map((t, i) => (
          <div key={t} className="reveal-card card p-6">
            <span className="font-mono text-xs text-brand-600 dark:text-brand-400">card {i + 1}</span>
            <p className="!mb-0 text-lg font-semibold text-slate-900 dark:text-white">{t}</p>
            <p className="!mb-0 text-sm">I animated in because you scrolled me into view.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScrollTriggerLesson() {
  return (
    <>
      <LessonHeader kicker="Lesson 12 · Scroll" title="ScrollTrigger">
        <p><strong>ScrollTrigger</strong> connects animations to the scroll position. Start an animation when a section appears, or <em>scrub</em> it so it moves exactly with the scrollbar. It powers almost every "wow" scrolling website.</p>
      </LessonHeader>

      <Section title="The basic recipe">
        <CodeViewer code={`gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom top",
    scrub: true
  }
});`} />
      </Section>

      <Section title="Every option, explained">
        <div className="grid gap-2 sm:grid-cols-2">
          {concepts.map(([k, d]) => (
            <div key={k} className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
              <p className="!mb-0 font-mono font-semibold text-brand-600 dark:text-brand-400">{k}</p>
              <p className="!mb-0 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Interactive scroll lab">
        <p>Scroll inside the box below. Change options on the right — the markers, animation and code update instantly. Green/red lines are the <code>markers</code>: <b>scroller-start/end</b> belong to the viewport, <b>start/end</b> to the trigger.</p>
        <ScrollDemo />
      </Section>

      <Section title="Understanding toggleActions">
        <p>Four slots for four events, in this order: <code>onEnter onLeave onEnterBack onLeaveBack</code>. Each slot takes one of: <code>play</code>, <code>pause</code>, <code>resume</code>, <code>reverse</code>, <code>restart</code>, <code>reset</code>, <code>complete</code>, <code>none</code>.</p>
        <CodeViewer code={`scrollTrigger: {\n  trigger: ".card",\n  start: "top 80%",\n  //              enter  leave  enterBack  leaveBack\n  toggleActions: "play   none   none       reverse"\n}`} />
      </Section>

      <Section title="Real page scroll — keep scrolling!">
        <p>These cards use the real page scroll. The bar above them is a scrubbed reading-progress indicator.</p>
        <PageScrollDemo />
      </Section>

      <Callout type="warn">In React always create ScrollTriggers inside <code>useGSAP()</code> — it kills them automatically when the component unmounts, preventing duplicate triggers and memory leaks.</Callout>
    </>
  );
}
