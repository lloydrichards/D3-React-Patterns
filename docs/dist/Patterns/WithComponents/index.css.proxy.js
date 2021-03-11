// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\n  background-color: #184240;\n  color: #c9d1c1;\n  font-family: 'Lato', sans-serif;\n}\n\np code {\n  background: #c9d1c1;\n  color: #184240;\n  padding: 0 0.2em;\n}\n\nh2 {\n  color: #cb862b;\n}\npre {\n  background: #c9d1c1;\n  border: 1px solid #ddd;\n  border-left: 6px solid #cb862b;\n  color: #184240;\n  page-break-inside: avoid;\n  font-family: monospace;\n  font-size: 15px;\n  line-height: 1.6;\n  margin-bottom: 1.6em;\n  max-width: 100%;\n  overflow: auto;\n  padding: 1em 1.5em;\n  display: block;\n  word-wrap: break-word;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}