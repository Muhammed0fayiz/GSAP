// Tiny, dependency-free JS/CSS syntax highlighter for the code viewer.
const KW = new Set([
  "const","let","var","function","return","if","else","for","while","new","import","from",
  "export","default","true","false","null","undefined","this","of","in","=>","async","await",
]);

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlight(code) {
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?(?:s|px|%|deg)?\b)|([A-Za-z_$][\w$-]*)(\s*:)?|(=>)|([{}()[\];,.])/g;
  let out = "";
  let last = 0;
  let m;
  while ((m = re.exec(code))) {
    out += escape(code.slice(last, m.index));
    last = re.lastIndex;
    const [full, com, str, num, word, colon, arrow, punc] = m;
    if (com) out += `<span class="tok-com">${escape(com)}</span>`;
    else if (str) out += `<span class="tok-str">${escape(str)}</span>`;
    else if (num) out += `<span class="tok-num">${num}</span>`;
    else if (word) {
      const next = code[last];
      if (colon) out += `<span class="tok-prop">${word}</span><span class="tok-punc">${colon}</span>`;
      else if (KW.has(word)) out += `<span class="tok-kw">${word}</span>`;
      else if (next === "(") out += `<span class="tok-fn">${word}</span>`;
      else out += escape(word);
    } else if (arrow) out += `<span class="tok-kw">=&gt;</span>`;
    else if (punc) out += `<span class="tok-punc">${escape(punc)}</span>`;
    else out += escape(full);
  }
  out += escape(code.slice(last));
  return out;
}
