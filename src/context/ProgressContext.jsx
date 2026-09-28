import { createContext, useContext, useEffect, useState } from "react";
import { load, save } from "../utils/storage";
import { lessons } from "../data/lessons";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [done, setDone] = useState(() => load("gel-progress", []));
  useEffect(() => save("gel-progress", done), [done]);

  const markDone = (slug) => setDone((d) => (d.includes(slug) ? d : [...d, slug]));
  const toggleDone = (slug) =>
    setDone((d) => (d.includes(slug) ? d.filter((s) => s !== slug) : [...d, slug]));
  const reset = () => setDone([]);
  const percent = Math.round((done.filter((s) => lessons.some((l) => l.slug === s)).length / lessons.length) * 100);

  return (
    <ProgressContext.Provider value={{ done, markDone, toggleDone, reset, percent }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
