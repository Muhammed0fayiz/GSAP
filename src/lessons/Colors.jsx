import { useState } from "react";
import gsap from "gsap";
import { LessonHeader, Section, Callout } from "../components/Lesson";
import AnimationPreview from "../components/AnimationPreview";
import ControlPanel from "../components/ControlPanel";
import CodeViewer from "../components/CodeViewer";

const sw = ["#ff3d71", "#3b82f6", "#f59e0b", "#a855f7", "#14b8a6", "#ffffff", "#111827"];

export default function Colors() {
  const [v, setV] = useState({ backgroundColor: "#ff3d71", color: "#ffffff", borderColor: "#f59e0b", duration: 2 });
  const code = `gsap.to(".box", {\n  backgroundColor: "${v.backgroundColor}",\n  color: "${v.color}",\n  borderColor: "${v.borderColor}",\n  duration: ${v.duration}\n});`;
  return (
    <>
      <LessonHeader kicker="Lesson 09 · Style" title="Color Animation">
        <p>GSAP can smoothly blend between any two colors. Use the <strong>camelCase</strong> version of the CSS property name: <code>backgroundColor</code>, <code>color</code>, <code>borderColor</code>, <code>fill</code>, <code>stroke</code>…</p>
      </LessonHeader>

      <Section title="Pick colors — the code updates automatically">
        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="flex min-w-0 flex-col gap-4">
            <AnimationPreview height="h-64" deps={[JSON.stringify(v)]}
              build={() => gsap.to(".box", { backgroundColor: v.backgroundColor, color: v.color, borderColor: v.borderColor, duration: v.duration })}>
              <div className="flex h-full items-center justify-center">
                <div className="box flex h-36 w-56 items-center justify-center rounded-2xl border-[6px] text-3xl font-black"
                  style={{ backgroundColor: "#6ae534", color: "#0b0d12", borderColor: "#0b0d12" }}>GSAP</div>
              </div>
            </AnimationPreview>
            <CodeViewer code={code} />
          </div>
          <div className="card h-fit p-5">
            <ControlPanel values={v} onChange={setV} controls={[
              { key: "backgroundColor", type: "color", swatches: sw },
              { key: "color", type: "color", swatches: sw },
              { key: "borderColor", type: "color", swatches: sw },
              { key: "duration", min: 0.2, max: 5, step: 0.1, unit: "s" },
            ]} />
          </div>
        </div>
      </Section>

      <Section title="Color formats">
        <CodeViewer code={`gsap.to(".box", { backgroundColor: "red" });                  // named\ngsap.to(".box", { backgroundColor: "#ff3d71" });              // hex\ngsap.to(".box", { backgroundColor: "rgb(59, 130, 246)" });    // rgb\ngsap.to(".box", { backgroundColor: "hsl(270, 90%, 60%)" });   // hsl\ngsap.to("svg circle", { fill: "#6ae534", stroke: "#000" });  // SVG`} />
        <Callout>Want to cycle through several colors on many elements? Use a function: <code>{"backgroundColor: (i) => colors[i % colors.length]"}</code> — GSAP calls it once per element.</Callout>
      </Section>
    </>
  );
}
