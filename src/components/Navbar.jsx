import { useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, Moon, Sun, X, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const navLinks = [
  { to: "/learn", label: "Learn" },
  { to: "/playground", label: "Playground" },
  { to: "/learn/easing", label: "Easing" },
  { to: "/examples", label: "Examples" },
  { to: "/library", label: "Library" },
  { to: "/cheatsheet", label: "Cheat Sheet" },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400 text-black shadow-glow"><Zap size={18} fill="currentColor" /></span>
      <span>GSAP <span className="text-brand-600 dark:text-brand-400">Easy Learn</span></span>
    </Link>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const menu = useRef(null);
  const { pathname } = useLocation();

  useGSAP(() => {
    if (!menu.current) return;
    gsap.fromTo(menu.current.children, { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.3, ease: "power2.out" });
  }, { dependencies: [open] });

  return (
    <header className="glass sticky top-0 z-50 border-x-0 border-t-0">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/learn"}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive || (l.to === "/learn" && pathname.startsWith("/learn") && pathname !== "/learn/easing") ? "bg-brand-400/15 text-brand-700 dark:text-brand-300" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="btn-ghost h-9 w-9 !p-0" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/learn/what-is-gsap" className="btn-primary hidden sm:inline-flex">Start Learning</Link>
          <button onClick={() => setOpen((o) => !o)} className="btn-ghost h-9 w-9 !p-0 lg:hidden" aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div ref={menu} className="flex flex-col gap-1 border-t border-slate-200 px-4 py-3 dark:border-white/10 lg:hidden">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5">
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
