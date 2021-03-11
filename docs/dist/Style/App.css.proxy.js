// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\n  background-color: #282c34;\n}\n.App {\n  text-align: left;\n  background-color: #282c34;\n  min-height: 50vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n.App code {\n  background: #fff3;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.App p {\n  margin: 0.4rem;\n}\n\n.App-logo {\n  height: 40vmin;\n  padding: 1rem;\n  pointer-events: none;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .App-logo {\n    animation: App-logo-spin infinite 20s linear;\n  }\n}\n\n.App-header {\n  background-color: #282c34;\n  min-height: 35vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: #f5814e;\n}\n\n.App-body {\n  font-size: 1rem;\n}\n\n.App-body a {\n  color: #61dafb;\n}\n\n.App-link {\n  color: #f5814e;\n}\n.route-link a {\n  color: #61dafb;\n  margin-top: 0.5em;\n  font-size: 1.5rem;\n}\n\n@keyframes App-logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\nnav {\n  display: flex;\n  justify-content: space-between;\n  padding: 0 2em;\n}\nnav a {\n  color: #61dafb;\n  font-size: 1.2em;\n  text-decoration: none;\n  padding: 0.5em;\n}\nnav .selected {\n  color: #f5814e;\n  font-size: 1.2em;\n  text-decoration: none;\n  padding: 0.5em;\n  border-bottom: 6px solid #cb862b;\n}\n\nnav .disabled {\n  color: #525a6b;\n\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}