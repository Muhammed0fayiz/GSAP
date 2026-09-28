import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, PanelLeft, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { lessons, getLesson, lessonIndex } from "../data/lessons";
import { useProgress } from "../context/ProgressContext";
import { lessonComponents } from "../lessons";

export default function LessonPage() {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const { done, toggleDone, markDone } = useProgress();
  const lesson = getLesson(slug);
  if (!lesson) return <Navigate to="/learn" replace />;
  const i = lessonIndex(slug);
  const prev = lessons[i - 1];
  const next = lessons[i + 1];
  const Content = lessonComponents[slug];
  const isDone = done.includes(slug);

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6 no-scrollbar"><Sidebar /></div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-72 overflow-y-auto bg-white p-5 dark:bg-[#0b0d12]" onClick={(e) => e.stopPropagation()}>
            <button className="btn-ghost btn-sm mb-4" onClick={() => setOpen(false)}><X size={14} /> Close</button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <article className="min-w-0 flex-1">
        <div className="mb-6 flex items-center justify-between gap-2">
          <button className="btn-ghost btn-sm lg:hidden" onClick={() => setOpen(true)}><PanelLeft size={14} /> Lessons</button>
          <span className="chip ml-auto">Lesson {i + 1} of {lessons.length} · {lesson.minutes} min</span>
        </div>

        <Content key={slug} />

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-slate-200 pt-8 dark:border-white/10">
          <button onClick={() => toggleDone(slug)} className={isDone ? "btn-ghost" : "btn-primary"}>
            {isDone ? <CheckCircle2 size={16} className="text-brand-500" /> : <Circle size={16} />}
            {isDone ? "Completed — click to undo" : "Mark lesson as complete"}
          </button>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-between">
            {prev ? (
              <Link to={`/learn/${prev.slug}`} className="card flex items-center gap-3 p-4 transition hover:border-brand-400/60 sm:w-1/2">
                <ArrowLeft size={18} /><div><p className="text-xs text-slate-400">Previous</p><p className="font-semibold">{prev.title}</p></div>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/learn/${next.slug}`} onClick={() => markDone(slug)} className="card flex items-center justify-end gap-3 p-4 text-right transition hover:border-brand-400/60 sm:w-1/2">
                <div><p className="text-xs text-slate-400">Next</p><p className="font-semibold">{next.title}</p></div><ArrowRight size={18} />
              </Link>
            ) : (
              <Link to="/examples" onClick={() => markDone(slug)} className="card flex items-center justify-end gap-3 p-4 text-right transition hover:border-brand-400/60 sm:w-1/2">
                <div><p className="text-xs text-slate-400">You finished the course!</p><p className="font-semibold">Real World Examples</p></div><ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
