import ExampleCard from "../components/ExampleCard";
import { examples } from "../data/examples";

export default function Examples() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">Real World Examples</p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Animations you'll actually ship</h1>
      <p className="mb-6 mt-2 max-w-2xl text-slate-500">15 patterns from real websites. Each one has a live demo, an explanation, the code, a copy button and a reset button.</p>
      <div className="no-scrollbar glass sticky top-16 z-20 -mx-4 mb-8 flex gap-1.5 overflow-x-auto px-4 py-3 sm:mx-0 sm:rounded-xl">
        {examples.map((e, i) => (
          <a key={e.id} href={`#/examples`} onClick={(ev) => { ev.preventDefault(); document.getElementById(e.id)?.scrollIntoView({ behavior: "smooth" }); }}
            className="chip shrink-0 cursor-pointer whitespace-nowrap hover:border-brand-400">{i + 1}. {e.title}</a>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {examples.map((e, i) => <ExampleCard key={e.id} example={e} index={i} />)}
      </div>
    </div>
  );
}
