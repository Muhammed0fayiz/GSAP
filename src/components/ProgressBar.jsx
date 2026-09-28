import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProgressBar({ percent, label = "Your progress", className = "" }) {
  const bar = useRef(null);
  useGSAP(() => {
    gsap.to(bar.current, { width: `${percent}%`, duration: 0.8, ease: "power3.out" });
  }, { dependencies: [percent] });
  return (
    <div className={className}>
      <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500">
        <span>{label}</span>
        <span className="font-mono text-brand-600 dark:text-brand-400">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div ref={bar} className="h-full w-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-300" />
      </div>
    </div>
  );
}
