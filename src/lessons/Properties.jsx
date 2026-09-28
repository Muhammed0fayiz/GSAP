import { useState } from "react";
import { LessonHeader, Callout } from "../components/Lesson";
import PropertyCard from "../components/PropertyCard";
import { properties, propertyGroups } from "../data/properties";

export default function Properties() {
  const [group, setGroup] = useState("All");
  const [q, setQ] = useState("");
  const list = properties
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => (group === "All" || p.group === group) && p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <LessonHeader kicker="Lesson 03 · Core" title="GSAP Properties">
        <p>Properties are the things you animate. Each card below has a <strong>live demo</strong>, the <strong>exact code</strong> and a <strong>slider</strong> — drag it and watch both update.</p>
      </LessonHeader>
      <Callout>GSAP uses short names for transforms: <code>x</code> instead of <code>transform: translateX()</code>, <code>rotation</code> instead of <code>rotate()</code>. They're faster and can be animated independently.</Callout>

      <div className="glass sticky top-16 z-20 -mx-2 mb-6 flex flex-wrap items-center gap-2 rounded-xl px-2 py-3">
        {["All", ...propertyGroups].map((g) => (
          <button key={g} onClick={() => setGroup(g)} className={`btn-sm btn ${group === g ? "bg-brand-400 text-black" : "btn-ghost"}`}>{g}</button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search property…" aria-label="Search property"
          className="ml-auto w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm sm:w-48 dark:border-white/10 dark:bg-white/5" />
      </div>

      <div className="space-y-6">
        {list.map(({ p, i }) => <PropertyCard key={p.name} prop={p} index={i} />)}
        {list.length === 0 && <p className="text-slate-500">No property matches “{q}”.</p>}
      </div>
    </>
  );
}
