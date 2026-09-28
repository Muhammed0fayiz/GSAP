/**
 * Generic control panel. `controls` is an array of:
 *  { key, label, type: "range" | "select" | "color" | "toggle" | "number", min, max, step, options, unit, hint }
 */
export default function ControlPanel({ controls, values, onChange, className = "", title }) {
  const set = (k, v) => onChange({ ...values, [k]: v });
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h4>}
      {controls.map((c) => {
        const v = values[c.key];
        return (
          <div key={c.key}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <label htmlFor={`ctl-${c.key}`} className="font-mono font-medium text-slate-700 dark:text-slate-300">
                {c.label ?? c.key}
              </label>
              {c.type !== "toggle" && c.type !== "select" && (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-brand-700 dark:bg-white/10 dark:text-brand-300">
                  {String(v)}
                  {c.unit ?? ""}
                </span>
              )}
            </div>
            {(!c.type || c.type === "range") && (
              <input id={`ctl-${c.key}`} type="range" min={c.min} max={c.max} step={c.step ?? 1} value={v}
                onChange={(e) => set(c.key, parseFloat(e.target.value))} />
            )}
            {c.type === "select" && (
              <select id={`ctl-${c.key}`} value={v} onChange={(e) => set(c.key, e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-white/10 dark:bg-white/5">
                {c.options.map((o) => (
                  <option key={o} value={o} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">{o}</option>
                ))}
              </select>
            )}
            {c.type === "color" && (
              <div className="flex items-center gap-2">
                <input id={`ctl-${c.key}`} type="color" value={v} onChange={(e) => set(c.key, e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded-lg border border-slate-300 bg-transparent dark:border-white/10" />
                <div className="flex flex-wrap gap-1">
                  {(c.swatches ?? []).map((s) => (
                    <button key={s} onClick={() => set(c.key, s)} className="h-6 w-6 rounded-md border border-black/10 transition hover:scale-110" style={{ background: s }} aria-label={s} />
                  ))}
                </div>
              </div>
            )}
            {c.type === "toggle" && (
              <button id={`ctl-${c.key}`} onClick={() => set(c.key, !v)}
                className={`relative h-6 w-11 rounded-full transition ${v ? "bg-brand-400" : "bg-slate-300 dark:bg-white/15"}`} aria-pressed={v}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${v ? "left-[22px]" : "left-0.5"}`} />
              </button>
            )}
            {c.hint && <p className="mt-1 text-xs text-slate-500">{c.hint}</p>}
          </div>
        );
      })}
    </div>
  );
}
