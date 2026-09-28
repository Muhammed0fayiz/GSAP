import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlight } from "../utils/highlight";

export default function CodeViewer({ code, title = "script.js", className = "", compact = false }) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlight(code.trim()), [code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
    } catch {
      const t = document.createElement("textarea");
      t.value = code.trim();
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-800 bg-[#0f1117] text-slate-200 shadow-lg ${className}`}>
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-brand-400/80" />
          </span>
          <span className="ml-2 font-mono text-xs text-slate-400">{title}</span>
        </div>
        <button onClick={copy} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Copy code">
          {copied ? <Check size={14} className="text-brand-400" /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={`overflow-x-auto font-mono leading-relaxed ${compact ? "p-3 text-xs" : "p-4 text-[13px]"}`}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}
