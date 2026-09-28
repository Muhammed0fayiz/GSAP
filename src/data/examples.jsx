import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react";

/* ---------- 1. Hero text reveal ---------- */
function HeroReveal() {
  const s = useRef(null);
  useGSAP(() => {
    gsap.timeline()
      .from(".line span", { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.12 })
      .from(".sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".cta", { scale: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.3");
  }, { scope: s });
  return (
    <div ref={s} className="stage flex h-64 flex-col justify-center px-8">
      {["Design that", "moves people."].map((t) => (
        <div key={t} className="line overflow-hidden"><span className="block text-3xl font-black sm:text-5xl">{t}</span></div>
      ))}
      <p className="sub mt-3 text-slate-500">A hero reveal using masked lines.</p>
      <button className="cta btn-primary mt-4 w-fit">Get started</button>
    </div>
  );
}

/* ---------- 2. Navbar animation ---------- */
function NavbarAnim() {
  const s = useRef(null);
  const [active, setActive] = useState(0);
  const items = ["Home", "Work", "About", "Contact"];
  useGSAP(() => {
    gsap.from(".nav", { y: -80, duration: 0.8, ease: "power3.out" });
    gsap.from(".nav-item", { y: -20, opacity: 0, stagger: 0.08, delay: 0.3 });
  }, { scope: s });
  useGSAP(() => {
    const el = s.current.querySelectorAll(".nav-item")[active];
    gsap.to(".pill", { x: el.offsetLeft, width: el.offsetWidth, duration: 0.5, ease: "power3.out" });
  }, { scope: s, dependencies: [active] });
  return (
    <div ref={s} className="stage h-48 p-4">
      <nav className="nav flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white">
        <span className="font-black">◆ Brand</span>
        <div className="relative flex">
          <span className="pill absolute inset-y-0 left-0 rounded-lg bg-brand-400" />
          {items.map((t, i) => (
            <button key={t} onClick={() => setActive(i)} className={`nav-item relative z-10 px-3 py-1.5 text-sm font-medium transition-colors ${active === i ? "text-black" : "text-white/70"}`}>{t}</button>
          ))}
        </div>
      </nav>
      <p className="mt-6 text-center text-sm text-slate-500">Click the links — the pill slides to the active one.</p>
    </div>
  );
}

/* ---------- 3. Hamburger menu ---------- */
function Hamburger() {
  const s = useRef(null);
  const tl = useRef(null);
  const [open, setOpen] = useState(false);
  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(".l1", { y: 7, rotation: 45, duration: 0.3 })
      .to(".l2", { opacity: 0, duration: 0.2 }, "<")
      .to(".l3", { y: -7, rotation: -45, duration: 0.3 }, "<")
      .to(".panel", { xPercent: -100, duration: 0.5, ease: "power3.inOut" }, "<")
      .from(".panel a", { x: 40, opacity: 0, stagger: 0.07, duration: 0.4 }, "-=0.2");
  }, { scope: s });
  const toggle = () => { open ? tl.current.reverse() : tl.current.play(); setOpen(!open); };
  return (
    <div ref={s} className="stage relative h-64">
      <button onClick={toggle} className="absolute right-4 top-4 z-20 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl bg-slate-900" aria-label="Toggle menu">
        {["l1", "l2", "l3"].map((c) => <span key={c} className={`${c} block h-0.5 w-5 bg-white`} />)}
      </button>
      <div className="panel absolute inset-y-0 left-full z-10 flex w-1/2 min-w-[180px] flex-col justify-center gap-3 bg-brand-400 p-6 text-black">
        {["Home", "Projects", "Studio", "Contact"].map((t) => <a key={t} className="text-2xl font-black">{t}</a>)}
      </div>
      <p className="p-6 text-sm text-slate-500">Tap the hamburger ☰</p>
    </div>
  );
}

/* ---------- 4. Card hover ---------- */
function CardHover() {
  const s = useRef(null);
  const { contextSafe } = useGSAP({ scope: s });
  const move = contextSafe((e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, { rotationY: px * 20, rotationX: -py * 20, y: -8, duration: 0.4, ease: "power2.out" });
    gsap.to(card.querySelector(".shine"), { x: px * 120, y: py * 120, opacity: 1, duration: 0.4 });
  });
  const leave = contextSafe((e) => {
    gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    gsap.to(e.currentTarget.querySelector(".shine"), { opacity: 0, duration: 0.4 });
  });
  return (
    <div ref={s} className="stage flex h-72 items-center justify-center gap-6 [perspective:800px]">
      {["from-sky-400 to-indigo-600", "from-brand-300 to-emerald-600"].map((g, i) => (
        <div key={g} onMouseMove={move} onMouseLeave={leave} className={`relative h-48 w-36 overflow-hidden rounded-2xl bg-gradient-to-br ${g} p-4 text-white shadow-2xl [transform-style:preserve-3d] sm:w-40`}>
          <div className="shine pointer-events-none absolute left-1/2 top-1/2 -ml-20 -mt-20 h-40 w-40 rounded-full bg-white/40 opacity-0 blur-2xl" />
          <p className="text-xs opacity-80">Card {i + 1}</p><p className="mt-20 text-lg font-bold">Hover me</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- 5. Image reveal ---------- */
function ImageReveal() {
  const s = useRef(null);
  useGSAP(() => {
    gsap.timeline()
      .fromTo(".img-wrap", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut" })
      .from(".img-inner", { scale: 1.4, duration: 1.6, ease: "power3.out" }, 0)
      .from(".caption", { y: 20, opacity: 0, duration: 0.5 }, "-=0.6");
  }, { scope: s });
  return (
    <div ref={s} className="stage flex h-72 flex-col items-center justify-center gap-3">
      <div className="img-wrap h-44 w-72 overflow-hidden rounded-xl">
        <div className="img-inner relative h-full w-full bg-gradient-to-br from-orange-300 via-rose-400 to-indigo-600">
          <div className="absolute bottom-0 h-20 w-full bg-[radial-gradient(ellipse_at_bottom,rgba(15,23,42,.9),transparent_70%)]" />
          <div className="absolute left-10 top-8 h-12 w-12 rounded-full bg-yellow-200 shadow-[0_0_40px_10px_rgba(253,224,71,.5)]" />
          <svg viewBox="0 0 300 100" className="absolute bottom-0 w-full"><path d="M0,100 L60,40 L110,80 L170,20 L230,70 L300,30 L300,100Z" fill="#0f172a" /></svg>
        </div>
      </div>
      <p className="caption text-sm text-slate-500">clip-path + scale reveal</p>
    </div>
  );
}

/* ---------- 6. Text reveal ---------- */
function TextReveal() {
  const s = useRef(null);
  const text = "Great animation is invisible until it isn't.";
  useGSAP(() => {
    gsap.from(".ch", { opacity: 0, filter: "blur(10px)", y: 20, duration: 0.6, ease: "power2.out", stagger: { each: 0.025, from: "random" } });
  }, { scope: s });
  return (
    <div ref={s} className="stage flex h-56 items-center justify-center px-6">
      <p className="max-w-md text-center text-2xl font-bold sm:text-3xl">
        {text.split(" ").map((w, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {w.split("").map((c, i) => <span key={i} className="ch inline-block">{c}</span>)}
            {"\u00a0"}
          </span>
        ))}
      </p>
    </div>
  );
}

/* ---------- 7. Scroll animation ---------- */
function ScrollAnim() {
  const s = useRef(null);
  useGSAP(() => {
    gsap.utils.toArray(".sa-item").forEach((el, i) => {
      gsap.from(el, { x: i % 2 ? 120 : -120, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: el, scroller: s.current, start: "top 90%", toggleActions: "play none none reverse" } });
    });
  }, { scope: s });
  return (
    <div ref={s} className="stage h-72 space-y-4 overflow-y-auto p-6">
      <p className="text-center text-sm text-slate-500">Scroll inside ↓</p>
      <div className="h-40" />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="sa-item card p-4 font-semibold">Item {i + 1} — slides in on scroll</div>
      ))}
      <div className="h-20" />
    </div>
  );
}

/* ---------- 8. Parallax ---------- */
function Parallax() {
  const s = useRef(null);
  useGSAP(() => {
    const st = { trigger: ".px-scene", scroller: s.current, start: "top top", end: "bottom top", scrub: true };
    gsap.to(".px-back", { yPercent: 50, ease: "none", scrollTrigger: st });
    gsap.to(".px-mid", { yPercent: 25, ease: "none", scrollTrigger: st });
    gsap.to(".px-title", { yPercent: 120, opacity: 0, ease: "none", scrollTrigger: st });
  }, { scope: s });
  return (
    <div ref={s} className="stage h-72 overflow-y-auto">
      <div className="px-scene relative h-72 overflow-hidden bg-gradient-to-b from-indigo-900 to-fuchsia-700">
        <div className="px-back absolute inset-x-0 top-6 flex justify-around">{[...Array(8)].map((_, i) => <span key={i} className="h-1 w-1 rounded-full bg-white" />)}</div>
        <div className="px-back absolute right-10 top-10 h-16 w-16 rounded-full bg-amber-200" />
        <h3 className="px-title absolute inset-x-0 top-24 text-center text-3xl font-black text-white">Parallax</h3>
        <svg className="px-mid absolute bottom-10 w-full" viewBox="0 0 400 100" preserveAspectRatio="none"><path d="M0,100 L80,30 L160,80 L240,20 L320,70 L400,40 L400,100Z" fill="#581c87" /></svg>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 400 60" preserveAspectRatio="none"><path d="M0,60 L50,20 L120,50 L200,10 L290,45 L400,15 L400,60Z" fill="#1e1b4b" /></svg>
      </div>
      <div className="flex h-72 items-center justify-center bg-[#1e1b4b] text-sm text-white/60">Layers move at different speeds ↑</div>
    </div>
  );
}

/* ---------- 9. Loading animation ---------- */
function Loader() {
  const s = useRef(null);
  const [pct, setPct] = useState(0);
  useGSAP(() => {
    const o = { v: 0 };
    gsap.timeline()
      .to(".ld-dot", { y: -14, duration: 0.3, stagger: { each: 0.1, repeat: 7, yoyo: true }, ease: "power1.inOut" }, 0)
      .to(o, { v: 100, duration: 2.4, ease: "power2.inOut", onUpdate: () => setPct(Math.round(o.v)) }, 0)
      .to(".ld-bar", { scaleX: 1, duration: 2.4, ease: "power2.inOut" }, 0)
      .to(".ld-screen", { yPercent: -100, duration: 0.8, ease: "power4.inOut" })
      .from(".ld-content", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.3");
  }, { scope: s });
  return (
    <div ref={s} className="stage relative h-64">
      <div className="ld-content flex h-full items-center justify-center text-2xl font-black">Welcome 👋</div>
      <div className="ld-screen absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900 text-white">
        <div className="flex gap-2">{[0, 1, 2].map((i) => <span key={i} className="ld-dot h-3 w-3 rounded-full bg-brand-400" />)}</div>
        <span className="font-mono text-3xl font-bold">{pct}%</span>
        <div className="h-1 w-40 overflow-hidden rounded bg-white/10"><div className="ld-bar h-full origin-left scale-x-0 bg-brand-400" /></div>
      </div>
    </div>
  );
}

/* ---------- 10. Page transition ---------- */
function PageTransition() {
  const s = useRef(null);
  const [page, setPage] = useState(0);
  const pages = [{ t: "Home", c: "bg-sky-500" }, { t: "About", c: "bg-fuchsia-500" }, { t: "Contact", c: "bg-amber-500" }];
  const { contextSafe } = useGSAP({ scope: s });
  const go = contextSafe((i) => {
    if (i === page) return;
    gsap.timeline()
      .set(".wipe", { transformOrigin: "left" })
      .to(".wipe", { scaleX: 1, duration: 0.45, ease: "power3.in", stagger: 0.06 })
      .add(() => setPage(i))
      .set(".wipe", { transformOrigin: "right" })
      .to(".wipe", { scaleX: 0, duration: 0.45, ease: "power3.out", stagger: 0.06 })
      .from(".pg-title", { y: 30, opacity: 0, duration: 0.4 }, "-=0.2");
  });
  return (
    <div ref={s} className="stage relative h-64">
      <div className="absolute left-3 top-3 z-20 flex gap-1">
        {pages.map((p, i) => <button key={p.t} onClick={() => go(i)} className={`btn-sm btn ${page === i ? "bg-white text-black" : "bg-black/30 text-white"}`}>{p.t}</button>)}
      </div>
      <div className={`flex h-full items-center justify-center ${pages[page].c}`}><h3 className="pg-title text-4xl font-black text-white">{pages[page].t}</h3></div>
      <div className="wipe absolute inset-0 z-10 origin-left scale-x-0 bg-brand-400" />
      <div className="wipe absolute inset-0 z-10 origin-left scale-x-0 bg-slate-900" />
    </div>
  );
}

/* ---------- 11. Horizontal scrolling ---------- */
function HorizontalScroll() {
  const s = useRef(null);
  useGSAP(() => {
    const track = s.current.querySelector(".hs-track");
    gsap.to(track, {
      x: () => -(track.scrollWidth - s.current.clientWidth + 32), ease: "none",
      scrollTrigger: { trigger: ".hs-wrap", scroller: s.current, start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true },
    });
  }, { scope: s });
  const colors = ["bg-sky-500", "bg-fuchsia-500", "bg-amber-500", "bg-brand-500", "bg-rose-500", "bg-indigo-500"];
  return (
    <div ref={s} className="stage h-72 overflow-y-auto">
      <div className="hs-wrap relative h-[900px]">
        <div className="sticky top-0 flex h-72 items-center overflow-hidden px-4">
          <div className="hs-track flex gap-4">
            {colors.map((c, i) => <div key={c} className={`flex h-48 w-56 shrink-0 items-center justify-center rounded-2xl text-3xl font-black text-white ${c}`}>Panel {i + 1}</div>)}
          </div>
        </div>
      </div>
      <p className="p-3 text-center text-xs text-slate-500">Scroll vertically → panels move horizontally</p>
    </div>
  );
}

/* ---------- 12. Infinite marquee ---------- */
function Marquee() {
  const s = useRef(null);
  const tw = useRef(null);
  useGSAP(() => { tw.current = gsap.to(".mq-track", { xPercent: -50, duration: 12, ease: "none", repeat: -1 }); }, { scope: s });
  const words = ["GSAP", "✦", "ScrollTrigger", "✦", "Timelines", "✦", "Easing", "✦", "Stagger", "✦"];
  return (
    <div ref={s} className="stage flex h-48 flex-col justify-center gap-3 overflow-hidden"
      onMouseEnter={() => gsap.to(tw.current, { timeScale: 0.2, duration: 0.5 })}
      onMouseLeave={() => gsap.to(tw.current, { timeScale: 1, duration: 0.5 })}>
      <div className="mq-track flex w-max">
        {[...words, ...words].map((w, i) => <span key={i} className={`px-4 text-4xl font-black ${w === "✦" ? "text-brand-500" : ""}`}>{w}</span>)}
      </div>
      <p className="text-center text-xs text-slate-500">Hover to slow down</p>
    </div>
  );
}

/* ---------- 13. Image carousel ---------- */
function Carousel() {
  const s = useRef(null);
  const [i, setI] = useState(0);
  const slides = ["from-sky-400 to-indigo-600", "from-rose-400 to-orange-400", "from-brand-300 to-teal-600", "from-fuchsia-400 to-purple-700"];
  const { contextSafe } = useGSAP({ scope: s });
  const go = contextSafe((dir) => {
    const next = (i + dir + slides.length) % slides.length;
    const all = s.current.querySelectorAll(".slide");
    gsap.set(all[next], { xPercent: dir * 100, zIndex: 2 });
    gsap.to(all[i], { xPercent: -dir * 30, scale: 0.9, opacity: 0.4, duration: 0.8, ease: "power3.inOut" });
    gsap.to(all[next], { xPercent: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power3.inOut", onComplete: () => { gsap.set(all[i], { zIndex: 0 }); gsap.set(all[next], { zIndex: 1 }); } });
    setI(next);
  });
  useGSAP(() => { gsap.set(".slide", { xPercent: (k) => (k === 0 ? 0 : 100), zIndex: (k) => (k === 0 ? 1 : 0) }); }, { scope: s });
  return (
    <div ref={s} className="stage relative h-64 overflow-hidden">
      {slides.map((g, k) => (
        <div key={g} className={`slide absolute inset-0 flex items-center justify-center bg-gradient-to-br ${g}`}>
          <span className="text-5xl font-black text-white/90">0{k + 1}</span>
        </div>
      ))}
      <button onClick={() => go(-1)} className="absolute left-3 top-1/2 z-10 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black" aria-label="Previous"><ChevronLeft /></button>
      <button onClick={() => go(1)} className="absolute right-3 top-1/2 z-10 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black" aria-label="Next"><ChevronRight /></button>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">{slides.map((_, k) => <span key={k} className={`h-1.5 rounded-full bg-white transition-all ${k === i ? "w-6" : "w-1.5 opacity-50"}`} />)}</div>
    </div>
  );
}

/* ---------- 14. Product showcase ---------- */
function Product() {
  const s = useRef(null);
  const colors = [{ n: "Lime", c: "#6ae534", bg: "#1a2e05" }, { n: "Ocean", c: "#38bdf8", bg: "#082f49" }, { n: "Berry", c: "#f472b6", bg: "#500724" }];
  const [c, setC] = useState(0);
  useGSAP(() => {
    gsap.timeline()
      .to(s.current, { backgroundColor: colors[c].bg, duration: 0.6 })
      .fromTo(".prod", { rotation: -30, scale: 0.6, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.6)" }, 0)
      .fromTo(".pd", { x: 30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.5 }, 0.2);
  }, { scope: s, dependencies: [c] });
  return (
    <div ref={s} className="grid h-72 grid-cols-2 items-center gap-4 overflow-hidden rounded-xl p-6 text-white" style={{ backgroundColor: colors[0].bg }}>
      <div className="flex justify-center">
        <div className="prod relative flex h-36 w-36 items-center justify-center rounded-[2rem] shadow-2xl" style={{ background: colors[c].c }}>
          <ShoppingBag size={56} className="text-black/70" />
        </div>
      </div>
      <div>
        <p className="pd text-xs uppercase tracking-widest opacity-70">New drop</p>
        <h3 className="pd text-2xl font-black">Tween Bag</h3>
        <p className="pd flex items-center gap-1 text-sm">{[...Array(5)].map((_, k) => <Star key={k} size={12} fill="currentColor" />)} 4.9</p>
        <p className="pd mt-2 text-xl font-bold">$89</p>
        <div className="pd mt-3 flex gap-2">
          {colors.map((col, k) => <button key={col.n} onClick={() => setC(k)} className={`h-7 w-7 rounded-full border-2 transition ${k === c ? "scale-110 border-white" : "border-transparent"}`} style={{ background: col.c }} aria-label={col.n} />)}
        </div>
      </div>
    </div>
  );
}

/* ---------- 15. Landing page animation ---------- */
function Landing() {
  const s = useRef(null);
  useGSAP(() => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".lp-nav > *", { y: -30, opacity: 0, stagger: 0.08, duration: 0.5 })
      .from(".lp-h span", { yPercent: 100, stagger: 0.1, duration: 0.7 }, "-=0.2")
      .from(".lp-p", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
      .from(".lp-btn", { scale: 0, stagger: 0.1, ease: "back.out(2)", duration: 0.4 }, "-=0.2")
      .from(".lp-img", { x: 80, rotation: 10, opacity: 0, duration: 0.9 }, "<")
      .from(".lp-badge", { scale: 0, rotation: -90, stagger: 0.15, ease: "back.out(2)", duration: 0.5 }, "-=0.4")
      .to(".lp-badge", { y: -8, repeat: -1, yoyo: true, duration: 1.4, ease: "sine.inOut", stagger: 0.3 });
  }, { scope: s });
  return (
    <div ref={s} className="stage h-80 overflow-hidden p-4">
      <div className="lp-nav flex items-center justify-between text-sm"><b>◆ Launch</b><span className="text-slate-400">Features</span><span className="text-slate-400">Pricing</span><span className="rounded-lg bg-slate-900 px-3 py-1 text-white dark:bg-white dark:text-black">Sign up</span></div>
      <div className="mt-6 grid grid-cols-[1.2fr_1fr] items-center gap-4">
        <div>
          <h3 className="lp-h text-2xl font-black leading-tight sm:text-3xl">{["Ship pages", "that feel alive."].map((t) => <div key={t} className="overflow-hidden"><span className="block">{t}</span></div>)}</h3>
          <p className="lp-p mt-2 text-sm text-slate-500">One timeline orchestrates this entire intro.</p>
          <div className="mt-4 flex gap-2"><button className="lp-btn btn-primary btn-sm">Start free</button><button className="lp-btn btn-ghost btn-sm">Demo</button></div>
        </div>
        <div className="relative">
          <div className="lp-img h-36 rounded-2xl bg-gradient-to-br from-brand-300 to-sky-500 shadow-2xl" />
          <span className="lp-badge absolute -left-3 top-3 rounded-lg bg-white px-2 py-1 text-xs font-bold text-black shadow">⚡ 60fps</span>
          <span className="lp-badge absolute -right-2 bottom-3 rounded-lg bg-slate-900 px-2 py-1 text-xs font-bold text-white shadow">+128%</span>
        </div>
      </div>
    </div>
  );
}

export const examples = [
  { id: "hero-text-reveal", title: "Hero text reveal", Demo: HeroReveal, desc: "Headline lines slide up from behind a mask, followed by subtitle and a popping CTA.",
    tip: "Each line sits in a wrapper with overflow: hidden. Animating the inner span from yPercent: 110 makes it rise into view as if revealed.",
    code: `// HTML: <div class="line"><span>Design that</span></div>\n// CSS:  .line { overflow: hidden }\n\nconst tl = gsap.timeline();\n\ntl.from(".line span", {\n  yPercent: 110,\n  duration: 0.9,\n  ease: "power4.out",\n  stagger: 0.12\n})\n  .from(".sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")\n  .from(".cta", { scale: 0, ease: "back.out(2)" }, "-=0.3");` },
  { id: "navbar-animation", title: "Navbar animation", Demo: NavbarAnim, desc: "Navbar drops in on load, links stagger in, and an active pill glides between links.",
    tip: "The pill reads the clicked link's offsetLeft and offsetWidth and tweens to them — so it always fits any link width.",
    code: `gsap.from(".nav", { y: -80, duration: 0.8, ease: "power3.out" });\ngsap.from(".nav-item", { y: -20, opacity: 0, stagger: 0.08, delay: 0.3 });\n\nfunction setActive(link) {\n  gsap.to(".pill", {\n    x: link.offsetLeft,\n    width: link.offsetWidth,\n    duration: 0.5,\n    ease: "power3.out"\n  });\n}` },
  { id: "hamburger-menu", title: "Hamburger menu", Demo: Hamburger, desc: "Three lines morph into an X while a panel slides in and links stagger.",
    tip: "Build one paused timeline, then call play() to open and reverse() to close — the close animation is free.",
    code: `const tl = gsap.timeline({ paused: true })\n  .to(".l1", { y: 7, rotation: 45, duration: 0.3 })\n  .to(".l2", { opacity: 0, duration: 0.2 }, "<")\n  .to(".l3", { y: -7, rotation: -45, duration: 0.3 }, "<")\n  .to(".panel", { xPercent: -100, duration: 0.5, ease: "power3.inOut" }, "<")\n  .from(".panel a", { x: 40, opacity: 0, stagger: 0.07 }, "-=0.2");\n\nbutton.onclick = () => (open ? tl.reverse() : tl.play());` },
  { id: "card-hover", title: "Card hover (3D tilt)", Demo: CardHover, desc: "Cards tilt toward the cursor with a moving shine, then spring back.",
    tip: "Mouse position is converted to -0.5…0.5 and mapped to rotationX / rotationY. elastic.out makes the release feel physical.",
    code: `card.addEventListener("mousemove", (e) => {\n  const r = card.getBoundingClientRect();\n  const px = (e.clientX - r.left) / r.width - 0.5;\n  const py = (e.clientY - r.top) / r.height - 0.5;\n  gsap.to(card, { rotationY: px * 20, rotationX: -py * 20, y: -8, duration: 0.4 });\n});\n\ncard.addEventListener("mouseleave", () => {\n  gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, ease: "elastic.out(1, 0.5)" });\n});` },
  { id: "image-reveal", title: "Image reveal", Demo: ImageReveal, desc: "A wipe reveal using clip-path, while the image inside zooms out.",
    tip: "clip-path: inset() is animatable. Combining it with a scale on the inner image gives a cinematic feel.",
    code: `gsap.timeline()\n  .fromTo(".img-wrap",\n    { clipPath: "inset(0 100% 0 0)" },\n    { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut" })\n  .from(".img-wrap img", { scale: 1.4, duration: 1.6 }, 0);` },
  { id: "text-reveal", title: "Text reveal", Demo: TextReveal, desc: "Characters un-blur into place in random order.",
    tip: "Split text into spans (or use the free SplitText plugin) and stagger with from: \"random\".",
    code: `// with SplitText: const split = SplitText.create(".text", { type: "chars" });\ngsap.from(".char", {\n  opacity: 0,\n  filter: "blur(10px)",\n  y: 20,\n  duration: 0.6,\n  stagger: { each: 0.025, from: "random" }\n});` },
  { id: "scroll-animation", title: "Scroll animation", Demo: ScrollAnim, desc: "Items slide in from alternating sides as they scroll into view.",
    tip: "One ScrollTrigger per item. toggleActions reverses the animation when you scroll back up.",
    code: `gsap.utils.toArray(".item").forEach((el, i) => {\n  gsap.from(el, {\n    x: i % 2 ? 120 : -120,\n    opacity: 0,\n    scrollTrigger: {\n      trigger: el,\n      start: "top 90%",\n      toggleActions: "play none none reverse"\n    }\n  });\n});` },
  { id: "parallax", title: "Parallax", Demo: Parallax, desc: "Background layers move slower than the foreground, creating depth.",
    tip: "All layers share the same scrubbed ScrollTrigger but move different amounts — farther layers move less relative to the viewer.",
    code: `const st = { trigger: ".scene", start: "top top", end: "bottom top", scrub: true };\n\ngsap.to(".back",  { yPercent: 50, ease: "none", scrollTrigger: st });\ngsap.to(".mid",   { yPercent: 25, ease: "none", scrollTrigger: st });\ngsap.to(".title", { yPercent: 120, opacity: 0, ease: "none", scrollTrigger: st });` },
  { id: "loading-animation", title: "Loading animation", Demo: Loader, desc: "Bouncing dots, a counting percentage and a progress bar — then the curtain lifts.",
    tip: "The percentage is an animated plain object (see the Object Animation lesson) displayed via onUpdate.",
    code: `const o = { v: 0 };\n\ngsap.timeline()\n  .to(".dot", { y: -14, stagger: { each: 0.1, repeat: 7, yoyo: true } }, 0)\n  .to(o, { v: 100, duration: 2.4, onUpdate: () => (pct.textContent = Math.round(o.v) + "%") }, 0)\n  .to(".bar", { scaleX: 1, duration: 2.4 }, 0)\n  .to(".loader", { yPercent: -100, duration: 0.8, ease: "power4.inOut" })\n  .from(".content", { scale: 0.8, opacity: 0 }, "-=0.3");` },
  { id: "page-transition", title: "Page transition", Demo: PageTransition, desc: "Two colored wipes cover the screen, the page changes, then they uncover it.",
    tip: "Swap the content at the midpoint with tl.add(callback). Switching transformOrigin makes the wipe exit on the opposite side.",
    code: `gsap.timeline()\n  .set(".wipe", { transformOrigin: "left" })\n  .to(".wipe", { scaleX: 1, duration: 0.45, ease: "power3.in", stagger: 0.06 })\n  .add(() => navigate("/about"))         // change page here\n  .set(".wipe", { transformOrigin: "right" })\n  .to(".wipe", { scaleX: 0, duration: 0.45, ease: "power3.out", stagger: 0.06 });` },
  { id: "horizontal-scrolling", title: "Horizontal scrolling", Demo: HorizontalScroll, desc: "Scrolling down moves a row of panels sideways.",
    tip: "On a real page you'd use pin: true on the section; here CSS sticky plays that role inside the demo box.",
    code: `const track = document.querySelector(".track");\n\ngsap.to(track, {\n  x: () => -(track.scrollWidth - window.innerWidth),\n  ease: "none",\n  scrollTrigger: {\n    trigger: ".horizontal-section",\n    pin: true,\n    scrub: 0.5,\n    end: () => "+=" + track.scrollWidth,\n    invalidateOnRefresh: true\n  }\n});` },
  { id: "infinite-marquee", title: "Infinite marquee", Demo: Marquee, desc: "Endless scrolling text that slows down on hover.",
    tip: "Duplicate the content, then move the track by xPercent: -50 on a repeat: -1 loop with ease: \"none\" — the seam is invisible. timeScale controls speed.",
    code: `const loop = gsap.to(".track", {\n  xPercent: -50,      // content is duplicated once\n  duration: 12,\n  ease: "none",\n  repeat: -1\n});\n\nmarquee.onmouseenter = () => gsap.to(loop, { timeScale: 0.2 });\nmarquee.onmouseleave = () => gsap.to(loop, { timeScale: 1 });` },
  { id: "image-carousel", title: "Image carousel", Demo: Carousel, desc: "Slides push in from the side while the old slide shrinks and fades.",
    tip: "Place the next slide off-screen with gsap.set, then animate both slides together.",
    code: `function go(dir) {\n  const next = (current + dir + slides.length) % slides.length;\n  gsap.set(slides[next], { xPercent: dir * 100, zIndex: 2 });\n  gsap.to(slides[current], { xPercent: -dir * 30, scale: 0.9, opacity: 0.4, duration: 0.8 });\n  gsap.to(slides[next], { xPercent: 0, scale: 1, opacity: 1, duration: 0.8 });\n  current = next;\n}` },
  { id: "product-showcase", title: "Product showcase", Demo: Product, desc: "Choosing a color re-animates the product, background and details.",
    tip: "In React, pass the selected color as a useGSAP dependency — the timeline replays every time it changes.",
    code: `useGSAP(() => {\n  gsap.timeline()\n    .to(container.current, { backgroundColor: color.bg, duration: 0.6 })\n    .fromTo(".product", { rotation: -30, scale: 0.6, opacity: 0 },\n      { rotation: 0, scale: 1, opacity: 1, ease: "back.out(1.6)" }, 0)\n    .fromTo(".detail", { x: 30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08 }, 0.2);\n}, { scope: container, dependencies: [color] });` },
  { id: "landing-page", title: "Landing page animation", Demo: Landing, desc: "A complete intro: nav, headline, buttons, hero image and floating badges.",
    tip: "Timeline defaults keep the code short; position parameters (\"<\", \"-=0.3\") overlap steps so it feels fluid instead of sequential.",
    code: `gsap.timeline({ defaults: { ease: "power3.out" } })\n  .from(".nav > *", { y: -30, opacity: 0, stagger: 0.08 })\n  .from(".headline span", { yPercent: 100, stagger: 0.1 }, "-=0.2")\n  .from(".lead", { opacity: 0, y: 15 }, "-=0.3")\n  .from(".btn", { scale: 0, stagger: 0.1, ease: "back.out(2)" }, "-=0.2")\n  .from(".hero-img", { x: 80, rotation: 10, opacity: 0 }, "<")\n  .from(".badge", { scale: 0, rotation: -90, stagger: 0.15 }, "-=0.4")\n  .to(".badge", { y: -8, repeat: -1, yoyo: true, ease: "sine.inOut" });` },
];
