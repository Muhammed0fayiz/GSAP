import LessonCard from "../components/LessonCard";
import ProgressBar from "../components/ProgressBar";
import { lessons } from "../data/lessons";
import { useProgress } from "../context/ProgressContext";

export default function LearnIndex() {
  const { percent, done } = useProgress();
  const next = lessons.find((l) => !done.includes(l.slug));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">Learning path</p>
          <h1 className="text-4xl font-extrabold tracking-tight">Learn GSAP step by step</h1>
          <p className="mt-2 max-w-xl text-slate-500">Start at lesson 1 if you're new. Every lesson is interactive — change values, watch, copy code.</p>
        </div>
        <div className="w-full md:w-72">
          <ProgressBar percent={percent} />
          {next && <p className="mt-2 text-xs text-slate-500">Up next: <span className="font-semibold text-slate-800 dark:text-slate-200">{next.title}</span></p>}
        </div>
      </div>
      {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
        <section key={lvl} className="mb-10">
          <h2 className="mb-4 text-lg font-bold">{lvl}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lessons.map((l, i) => l.level === lvl && <LessonCard key={l.slug} lesson={l} index={i} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
