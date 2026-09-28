import { Heart } from "lucide-react";
import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <Logo />
        <p className="text-center">Learn GSAP from Beginner to Pro — Visually, Interactively, Step by Step.</p>
        <p className="flex items-center gap-1.5">
          Developed with <Heart size={14} className="fill-red-500 text-red-500" /> by
          <span className="font-semibold text-slate-800 dark:text-white">Muhammed Fayiz</span>
        </p>
      </div>
    </footer>
  );
}
