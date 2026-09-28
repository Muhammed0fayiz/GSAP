import CodeViewer from "../components/CodeViewer";

const blocks = [
  { t: "Tweens", c: `gsap.to(".box", { x: 100 });           // current → target\ngsap.from(".box", { x: 100 });         // target → current\ngsap.fromTo(".box", { x: 0 }, { x: 100 });\ngsap.set(".box", { x: 100 });          // instant` },
  { t: "Transforms", c: `x: 100, y: 50           // px\nxPercent: -50            // % of own size\nscale: 1.5, scaleX, scaleY\nrotation: 360, rotationX, rotationY\nskewX: 20, skewY: 10\ntransformOrigin: "top left"` },
  { t: "Special properties", c: `duration: 1        // seconds (default 0.5)\ndelay: 0.5\nease: "power2.out"\nrepeat: -1         // infinite\nyoyo: true\nrepeatDelay: 0.3\nstagger: 0.1\npaused: true\noverwrite: "auto"\nclearProps: "all"` },
  { t: "Callbacks", c: `onStart: () => {}\nonUpdate: () => {}\nonComplete: () => {}\nonRepeat: () => {}\nonReverseComplete: () => {}` },
  { t: "Timeline", c: `const tl = gsap.timeline({ defaults: { duration: 1 } });\n\ntl.to(a, { x: 100 })\n  .to(b, { x: 100 }, "<")      // with previous\n  .to(c, { x: 100 }, "+=0.5")  // gap\n  .to(d, { x: 100 }, "-=0.5")  // overlap\n  .addLabel("end");` },
  { t: "Control", c: `anim.play();     anim.pause();\nanim.reverse();  anim.restart();\nanim.seek(1);    anim.progress(0.5);\nanim.timeScale(2);\nanim.kill();` },
  { t: "Eases", c: `"none"  "power1-4.in/out/inOut"\n"back.out(1.7)"  "elastic.out(1, 0.3)"\n"bounce.out"  "sine.inOut"  "expo.out"\n"circ.out"  "steps(5)"` },
  { t: "Stagger object", c: `stagger: {\n  each: 0.1,        // or amount: 1\n  from: "center",   // start | end | edges | random | index\n  grid: "auto",\n  ease: "power2.in"\n}` },
  { t: "ScrollTrigger", c: `scrollTrigger: {\n  trigger: ".section",\n  start: "top 80%",\n  end: "bottom top",\n  scrub: true,          // or 1\n  pin: true,\n  markers: true,\n  toggleActions: "play none none reverse"\n}` },
  { t: "React (useGSAP)", c: `const container = useRef();\n\nuseGSAP(() => {\n  gsap.to(".box", { x: 100 });\n}, { scope: container, dependencies: [value] });\n\nconst { contextSafe } = useGSAP({ scope: container });\nconst onClick = contextSafe(() => gsap.to(".box", { rotation: "+=90" }));` },
  { t: "Utilities", c: `gsap.utils.toArray(".item")\ngsap.utils.random(0, 100)\ngsap.utils.clamp(0, 1, value)\ngsap.utils.mapRange(0, 100, 0, 1, 50)\ngsap.utils.interpolate("red", "blue", 0.5)\ngsap.utils.shuffle(array)` },
  { t: "Responsive (matchMedia)", c: `const mm = gsap.matchMedia();\n\nmm.add("(min-width: 800px)", () => {\n  gsap.to(".box", { x: 500 });\n});\nmm.add("(max-width: 799px)", () => {\n  gsap.to(".box", { y: 200 });\n});` },
];

export default function CheatSheet() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">Cheat Sheet</p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">GSAP on one page</h1>
      <p className="mb-8 mt-2 text-slate-500">Everything from the course, condensed. Bookmark it.</p>
      <div className="columns-1 gap-5 md:columns-2 xl:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {blocks.map((b) => (
          <div key={b.t}>
            <h2 className="mb-2 font-semibold">{b.t}</h2>
            <CodeViewer code={b.c} compact title={b.t.toLowerCase().replace(/\W+/g, "-") + ".js"} />
          </div>
        ))}
      </div>
    </div>
  );
}
