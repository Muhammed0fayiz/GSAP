import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play, RotateCcw, Rewind, SkipBack } from "lucide-react";

/**
 * Wraps a demo stage and gives it Play / Pause / Reverse / Restart / Reset.
 * `build(container)` must return a tween or timeline. Selector strings used
 * inside `build` are automatically scoped to this preview (via useGSAP scope).
 */
export default function AnimationPreview({
  build,
  deps = [],
  children,
  height = "h-56",
  controls = true,
  autoplay = true,
  className = "",
  stageClass = "",
}) {
  const scope = useRef(null);
  const anim = useRef(null);
  const playingRef = useRef(autoplay);
  const [playing, setPlaying] = useState(autoplay);

  useGSAP(
    () => {
      const a = build?.(scope.current);
      anim.current = a || null;
      if (a && !autoplay) a.pause();
      // keep the Play/Pause label in sync without touching the user's callbacks
      const sync = () => {
        const active = !!anim.current && anim.current.isActive();
        if (active !== playingRef.current) {
          playingRef.current = active;
          setPlaying(active);
        }
      };
      gsap.ticker.add(sync);
      return () => gsap.ticker.remove(sync);
    },
    { scope, dependencies: deps, revertOnUpdate: true }
  );

  const toggle = () => {
    const a = anim.current;
    if (!a) return;
    if (a.isActive()) return a.pause();
    const atEnd = a.reversed() ? a.progress() === 0 : a.progress() === 1;
    if (atEnd) a.reversed() ? a.play(0) : a.restart();
    else a.resume();
  };
  const reverse = () => anim.current && (anim.current.reversed() ? anim.current.play() : anim.current.reverse());
  const restart = () => anim.current?.restart();
  const reset = () => anim.current?.pause(0);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div ref={scope} className={`stage ${height} ${stageClass}`}>
        {children}
      </div>
      {controls && (
        <div className="flex flex-wrap items-center gap-1.5">
          <button className="btn-ghost btn-sm w-[86px]" onClick={toggle}>
            {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Play"}
          </button>
          <button className="btn-ghost btn-sm" onClick={reverse}><Rewind size={14} /> Reverse</button>
          <button className="btn-ghost btn-sm" onClick={restart}><SkipBack size={14} /> Restart</button>
          <button className="btn-ghost btn-sm" onClick={reset}><RotateCcw size={14} /> Reset</button>
        </div>
      )}
    </div>
  );
}
