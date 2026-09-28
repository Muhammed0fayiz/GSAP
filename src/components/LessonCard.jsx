import { Link } from "react-router-dom";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import Icon from "./Icon";
import { useProgress } from "../context/ProgressContext";

const levelColor = {
  Beginner: "text-brand-600 dark:text-brand-400",
  Intermediate: "text-sky-600 dark:text-sky-400",
  Advanced: "text-fuchsia-600 dark:text-fuchsia-400",
};

export default function LessonCard({ lesson, index }) {
  const { done } = useProgress();
  const isDone = done.includes(lesson.slug);
  return (
    <Link to={`/learn/${lesson.slug}`}
      className="lesson-card card group relative flex flex-col p-5 transition hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-glow">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-400/15 text-brand-600 dark:text-brand-400">
          <Icon name={lesson.icon} size={20} />
        </span>
        {isDone ? <CheckCircle2 className="text-brand-500" size={20} /> : <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="font-semibold">{lesson.title}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-500 dark:text-slate-400">{lesson.summary}</p>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className={`font-semibold ${levelColor[lesson.level]}`}>{lesson.level}</span>
        <span className="flex items-center gap-1 text-slate-400"><Clock size={12} /> {lesson.minutes} min</span>
      </div>
      <ArrowRight size={16} className="absolute bottom-5 right-1/2 translate-x-1/2 opacity-0 transition group-hover:opacity-60" />
    </Link>
  );
}
