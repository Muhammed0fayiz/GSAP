import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NotFound() {
  const s = useRef(null);
  useGSAP(() => { gsap.from(".nf", { y: -200, rotation: -20, duration: 1.2, ease: "bounce.out" }); }, { scope: s });
  return (
    <div ref={s} className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <h1 className="nf text-8xl font-black text-brand-500">404</h1>
      <p className="text-slate-500">This page tweened away.</p>
      <Link to="/" className="btn-primary">Back home</Link>
    </div>
  );
}
