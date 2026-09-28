import { Sparkles, Play, SlidersHorizontal, Activity, ListOrdered, Rows3, Terminal, Braces, Palette, Crosshair, Puzzle, MousePointer2, Circle } from "lucide-react";

const map = { Sparkles, Play, SlidersHorizontal, Activity, ListOrdered, Rows3, Terminal, Braces, Palette, Crosshair, Puzzle, MousePointer2 };

export default function Icon({ name, ...props }) {
  const C = map[name] ?? Circle;
  return <C {...props} />;
}
