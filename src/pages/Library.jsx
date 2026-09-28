import { useState } from "react";
import gsap from "gsap";
import { Search } from "lucide-react";
import AnimationPreview from "../components/AnimationPreview";
import CodeViewer from "../components/CodeViewer";
import { library, libraryCategories } from "../data/library";
import { tweenCode } from "../utils/codegen";

export default function Library() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(library[1]);
  const [run, setRun] = useState(0);
  const list = library.filter((a) => (cat === "All" || a.cat === cat) && a.name.toLowerCase().includes(q.toLowerCase()));
  const target = sel.multi ? ".item" : ".box";
  const code = tweenCode(sel.method, target, sel.vars);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">Animation Library</p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Copy-paste animation presets</h1>
      <p className="mb-8 mt-2 max-w-2xl text-slate-500">{library.length} ready-made animations. Click one to preview it, then copy the code into your project.</p>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {["All", ...libraryCategories].map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`btn-sm btn ${cat === c ? "bg-brand-400 text-black" : "btn-ghost"}`}>{c}</button>
            ))}
            <label className="relative ml-auto w-full sm:w-48">
              <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" aria-label="Search animations"
                className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-sm dark:border-white/10 dark:bg-white/5" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
            {list.map((a) => (
              <button key={a.name} onClick={() => { setSel(a); setRun((r) => r + 1); }}
                className={`card p-3 text-left transition hover:border-brand-400/60 ${sel.name === a.name ? "!border-brand-400 shadow-glow" : ""}`}>
                <p className="text-sm font-semibold">{a.name}</p>
                <p className="font-mono text-[11px] text-slate-400">{a.cat} · gsap.{a.method}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="flex items-baseline justify-between"><h2 className="text-xl font-bold">{sel.name}</h2><span className="chip">{sel.cat}</span></div>
          <AnimationPreview height="h-64" stageClass="[perspective:600px]" deps={[sel.name, run]}
            build={() => gsap[sel.method](target, { ...sel.vars })}>
            <div className="flex h-full items-center justify-center gap-2">
              {sel.multi
                ? "GSAP!".split("").map((c, i) => <div key={i} className="item demo-box h-14 w-12 text-xl">{c}</div>)
                : <div className="box demo-box h-20 w-20" style={{ background: "#6ae534" }} />}
            </div>
          </AnimationPreview>
          <CodeViewer code={code} title={`${sel.name.toLowerCase().replace(/\s+/g, "-")}.js`} />
        </div>
      </div>
    </div>
  );
}
