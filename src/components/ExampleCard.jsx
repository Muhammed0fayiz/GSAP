import { useState } from "react";
import { RotateCcw, Code2, Eye } from "lucide-react";
import CodeViewer from "./CodeViewer";

/** Live demo + explanation + code + copy + reset (reset remounts the demo). */
export default function ExampleCard({ example, index }) {
  const [key, setKey] = useState(0);
  const [tab, setTab] = useState("demo");
  const Demo = example.Demo;
  return (
    <article id={example.id} className="card overflow-hidden scroll-mt-24">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 p-5 dark:border-white/10">
        <div>
          <span className="font-mono text-xs text-brand-600 dark:text-brand-400">Example {String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-lg font-semibold">{example.title}</h3>
          <p className="mt-1 max-w-xl text-sm text-slate-500 dark:text-slate-400">{example.desc}</p>
        </div>
        <div className="flex gap-1.5">
          <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-white/10">
            <button onClick={() => setTab("demo")} className={`btn-sm btn ${tab === "demo" ? "bg-brand-400 text-black" : ""}`}><Eye size={14} /> Demo</button>
            <button onClick={() => setTab("code")} className={`btn-sm btn ${tab === "code" ? "bg-brand-400 text-black" : ""}`}><Code2 size={14} /> Code</button>
          </div>
          <button onClick={() => { setKey((k) => k + 1); setTab("demo"); }} className="btn-ghost btn-sm" aria-label="Reset demo"><RotateCcw size={14} /> Reset</button>
        </div>
      </div>
      <div className="p-5">
        {tab === "demo" ? <Demo key={key} /> : <CodeViewer code={example.code} title={`${example.id}.js`} />}
        {example.tip && <p className="mt-4 rounded-lg bg-brand-400/10 px-3 py-2 text-sm text-slate-600 dark:text-slate-300"><strong className="text-brand-700 dark:text-brand-300">How it works: </strong>{example.tip}</p>}
      </div>
    </article>
  );
}
