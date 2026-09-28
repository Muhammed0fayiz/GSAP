// Small building blocks shared by every lesson page.
import { Lightbulb, AlertTriangle } from "lucide-react";

export function LessonHeader({ kicker, title, children }) {
  return (
    <header className="mb-10">
      <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">{kicker}</p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
      {children && <div className="prose-lite mt-4 max-w-3xl text-lg">{children}</div>}
    </header>
  );
}

export function Section({ title, id, children }) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      {title && <h2 className="mb-4 text-xl font-bold sm:text-2xl">{title}</h2>}
      <div className="prose-lite">{children}</div>
    </section>
  );
}

export function Callout({ type = "tip", children }) {
  const warn = type === "warn";
  return (
    <div className={`my-4 flex gap-3 rounded-xl border p-4 text-sm ${warn ? "border-amber-400/30 bg-amber-400/10" : "border-brand-400/30 bg-brand-400/10"}`}>
      {warn ? <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" /> : <Lightbulb size={18} className="mt-0.5 shrink-0 text-brand-500" />}
      <div className="text-slate-700 dark:text-slate-300 [&_code]:inline-code">{children}</div>
    </div>
  );
}

export function Grid({ children, cols = 2 }) {
  return <div className={`grid gap-5 ${cols === 3 ? "md:grid-cols-3" : "lg:grid-cols-2"}`}>{children}</div>;
}
