// The ordered learning path. Each lesson maps to a component in src/lessons.
export const lessons = [
  { slug: "what-is-gsap", title: "What is GSAP?", level: "Beginner", minutes: 5, icon: "Sparkles", summary: "What GSAP is, why developers love it and where it's used." },
  { slug: "how-gsap-works", title: "How GSAP Works", level: "Beginner", minutes: 8, icon: "Play", summary: "gsap.to(), gsap.from() and gsap.fromTo() explained visually." },
  { slug: "properties", title: "GSAP Properties", level: "Beginner", minutes: 20, icon: "SlidersHorizontal", summary: "27 properties — each with a live demo, code and a slider." },
  { slug: "easing", title: "Easing", level: "Beginner", minutes: 10, icon: "Activity", summary: "Control how motion feels over time. Compare every ease side by side." },
  { slug: "timeline", title: "Timelines", level: "Intermediate", minutes: 12, icon: "ListOrdered", summary: "Sequence animations and master the position parameter." },
  { slug: "stagger", title: "Stagger", level: "Intermediate", minutes: 8, icon: "Rows3", summary: "Animate many elements one after another." },
  { slug: "callbacks", title: "Callbacks", level: "Intermediate", minutes: 8, icon: "Terminal", summary: "Run code when an animation starts, updates or completes." },
  { slug: "object-animation", title: "Object Animation", level: "Intermediate", minutes: 6, icon: "Braces", summary: "Animate plain JavaScript values — counters, progress & more." },
  { slug: "colors", title: "Color Animation", level: "Beginner", minutes: 6, icon: "Palette", summary: "Tween backgroundColor, color and borderColor." },
  { slug: "transform-origin", title: "Transform Origin", level: "Intermediate", minutes: 6, icon: "Crosshair", summary: "Choose the pivot point for rotation and scale." },
  { slug: "plugins", title: "Plugins", level: "Advanced", minutes: 15, icon: "Puzzle", summary: "Draggable, Flip, MotionPath, TextPlugin and ScrollTrigger." },
  { slug: "scrolltrigger", title: "ScrollTrigger", level: "Advanced", minutes: 15, icon: "MousePointer2", summary: "Link animations to scroll: start, end, scrub, pin & markers." },
];

export const getLesson = (slug) => lessons.find((l) => l.slug === slug);
export const lessonIndex = (slug) => lessons.findIndex((l) => l.slug === slug);
