// Copy-paste animation presets. Each `vars` is passed to gsap.from / gsap.to / fromTo.
export const libraryCategories = ["Entrances", "Exits", "Attention", "Loops", "Text & Stagger"];

export const library = [
  // Entrances
  { name: "Fade In", cat: "Entrances", method: "from", vars: { opacity: 0, duration: 0.8 } },
  { name: "Fade Up", cat: "Entrances", method: "from", vars: { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" } },
  { name: "Fade Down", cat: "Entrances", method: "from", vars: { opacity: 0, y: -50, duration: 0.8, ease: "power3.out" } },
  { name: "Slide Left", cat: "Entrances", method: "from", vars: { x: 150, opacity: 0, duration: 0.8, ease: "power3.out" } },
  { name: "Slide Right", cat: "Entrances", method: "from", vars: { x: -150, opacity: 0, duration: 0.8, ease: "power3.out" } },
  { name: "Pop In", cat: "Entrances", method: "from", vars: { scale: 0, duration: 0.6, ease: "back.out(1.7)" } },
  { name: "Zoom In", cat: "Entrances", method: "from", vars: { scale: 2, opacity: 0, duration: 0.8, ease: "power3.out" } },
  { name: "Flip In", cat: "Entrances", method: "from", vars: { rotationY: 90, opacity: 0, duration: 0.9, ease: "power2.out" } },
  { name: "Roll In", cat: "Entrances", method: "from", vars: { x: -200, rotation: -360, opacity: 0, duration: 1, ease: "power2.out" } },
  { name: "Drop In", cat: "Entrances", method: "from", vars: { y: -200, duration: 1, ease: "bounce.out" } },
  { name: "Elastic In", cat: "Entrances", method: "from", vars: { scale: 0.2, duration: 1.2, ease: "elastic.out(1, 0.4)" } },
  { name: "Blur In", cat: "Entrances", method: "from", vars: { filter: "blur(20px)", opacity: 0, scale: 1.2, duration: 1 } },
  // Exits
  { name: "Fade Out", cat: "Exits", method: "to", vars: { opacity: 0, duration: 0.6 } },
  { name: "Slide Out Up", cat: "Exits", method: "to", vars: { y: -120, opacity: 0, duration: 0.6, ease: "power2.in" } },
  { name: "Shrink Out", cat: "Exits", method: "to", vars: { scale: 0, duration: 0.5, ease: "back.in(1.7)" } },
  { name: "Spin Out", cat: "Exits", method: "to", vars: { rotation: 360, scale: 0, duration: 0.8, ease: "power2.in" } },
  { name: "Fall Away", cat: "Exits", method: "to", vars: { y: 200, rotation: 25, opacity: 0, duration: 0.8, ease: "power2.in" } },
  // Attention
  { name: "Shake", cat: "Attention", method: "to", vars: { x: "random(-12, 12)", duration: 0.06, repeat: 9, yoyo: true, ease: "none", clearProps: "x" } },
  { name: "Pulse", cat: "Attention", method: "to", vars: { scale: 1.15, duration: 0.3, repeat: 3, yoyo: true, ease: "power1.inOut" } },
  { name: "Wobble", cat: "Attention", method: "to", vars: { rotation: 15, duration: 0.12, repeat: 7, yoyo: true, ease: "sine.inOut", clearProps: "rotation" } },
  { name: "Jello", cat: "Attention", method: "to", vars: { skewX: 12, skewY: 6, duration: 0.15, repeat: 5, yoyo: true, clearProps: "skewX,skewY" } },
  { name: "Rubber Band", cat: "Attention", method: "to", vars: { scaleX: 1.35, scaleY: 0.75, duration: 0.2, repeat: 3, yoyo: true, ease: "power1.inOut" } },
  { name: "Heartbeat", cat: "Attention", method: "to", vars: { scale: 1.3, duration: 0.15, repeat: 5, yoyo: true, ease: "power2.out" } },
  { name: "Flash", cat: "Attention", method: "to", vars: { opacity: 0, duration: 0.2, repeat: 5, yoyo: true } },
  // Loops
  { name: "Float", cat: "Loops", method: "to", vars: { y: -20, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" } },
  { name: "Spin", cat: "Loops", method: "to", vars: { rotation: 360, duration: 2, repeat: -1, ease: "none" } },
  { name: "Breathe", cat: "Loops", method: "to", vars: { scale: 1.1, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" } },
  { name: "Swing", cat: "Loops", method: "to", vars: { rotation: 20, transformOrigin: "top center", duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" } },
  { name: "Bounce Loop", cat: "Loops", method: "to", vars: { y: -60, duration: 0.5, repeat: -1, yoyo: true, ease: "power2.out" } },
  { name: "Color Cycle", cat: "Loops", method: "to", vars: { backgroundColor: "#a855f7", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" } },
  // Text & stagger (targets .item — 5 elements)
  { name: "Stagger Up", cat: "Text & Stagger", multi: true, method: "from", vars: { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" } },
  { name: "Stagger Pop", cat: "Text & Stagger", multi: true, method: "from", vars: { scale: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" } },
  { name: "Wave", cat: "Text & Stagger", multi: true, method: "to", vars: { y: -30, duration: 0.4, repeat: -1, yoyo: true, stagger: 0.1, ease: "sine.inOut" } },
  { name: "Random Scatter", cat: "Text & Stagger", multi: true, method: "from", vars: { x: "random(-150, 150)", y: "random(-100, 100)", rotation: "random(-180, 180)", opacity: 0, duration: 1, stagger: 0.05, ease: "power3.out" } },
  { name: "Center Out", cat: "Text & Stagger", multi: true, method: "from", vars: { scaleY: 0, duration: 0.5, stagger: { each: 0.08, from: "center" }, ease: "power2.out" } },
];
