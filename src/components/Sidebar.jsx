import { NavLink } from "react-router-dom";
import { CheckCircle2, Circle } from "lucide-react";
import { lessons } from "../data/lessons";
import { useProgress } from "../context/ProgressContext";
import ProgressBar from "./ProgressBar";

export default function Sidebar({ onNavigate }) {
  const { done, percent, reset } = useProgress();
  const groups = ["Beginner", "Intermediate", "Advanced"];
  return (
    <div className="flex h-full flex-col gap-5">
      <ProgressBar percent={percent} />
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{g}</p>
          <ul className="space-y-0.5">
            {lessons.filter((l) => l.level === g).map((l) => (
              <li key={l.slug}>
                <NavLink to={`/learn/${l.slug}`} onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition ${isActive ? "bg-brand-400/15 font-semibold text-brand-700 dark:text-brand-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"}`}>
                  {done.includes(l.slug) ? <CheckCircle2 size={15} className="shrink-0 text-brand-500" /> : <Circle size={15} className="shrink-0 opacity-40" />}
                  {l.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {done.length > 0 && (
        <button onClick={reset} className="px-2 text-left text-xs text-slate-400 underline-offset-2 hover:underline">Reset progress</button>
      )}
    </div>
  );
}
