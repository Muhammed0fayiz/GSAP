import InteractivePlayground from "../components/InteractivePlayground";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="mb-2 font-mono text-sm text-brand-600 dark:text-brand-400">Playground</p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Interactive Property Playground</h1>
      <p className="mb-8 mt-2 max-w-2xl text-slate-500">Change any control — the animation replays and the code rewrites itself. Use Play, Pause, Reverse, Restart and Reset to control it. When you like it, copy the code.</p>
      <InteractivePlayground />
    </div>
  );
}
