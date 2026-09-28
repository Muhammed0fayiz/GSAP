// Turn a vars object into nicely formatted GSAP code.
const fmt = (v) => {
  if (typeof v === "string") return v.startsWith("__raw:") ? v.slice(6) : `"${v}"`;
  if (typeof v === "number") return String(Math.round(v * 1000) / 1000);
  if (typeof v === "boolean") return String(v);
  if (v && typeof v === "object") return `{ ${Object.entries(v).map(([k, x]) => `${k}: ${fmt(x)}`).join(", ")} }`;
  return String(v);
};

export const raw = (s) => `__raw:${s}`;

export function varsToString(vars, indent = "  ") {
  return Object.entries(vars)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${indent}${k}: ${fmt(v)}`)
    .join(",\n");
}

export function tweenCode(method, target, vars, fromVars) {
  const t = target.startsWith("__raw:") ? target.slice(6) : `"${target}"`;
  if (method === "fromTo") {
    return `gsap.fromTo(\n  ${t},\n  { ${Object.entries(fromVars).map(([k, v]) => `${k}: ${fmt(v)}`).join(", ")} },\n  {\n${varsToString(vars, "    ")}\n  }\n);`;
  }
  return `gsap.${method}(${t}, {\n${varsToString(vars)}\n});`;
}
