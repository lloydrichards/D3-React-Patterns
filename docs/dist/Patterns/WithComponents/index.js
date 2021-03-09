import React from "../../../snowpack/pkg/react.js";
import {ChartComponent} from "./Dashboard.js";
import "./index.css.proxy.js";
function Curran() {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      margin: "2rem",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "1rem"
    }
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ChartComponent, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "With Components Pattern"), /* @__PURE__ */ React.createElement("p", null, "Full credit for this code goes to Curran Kelleher and his tutorials on D3 and React."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", {
    href: "https://vizhub.com/curran/118d7f70085246a58dc7a374fd957c20?edit=files&file=styles.css"
  }, "Source Code")), /* @__PURE__ */ React.createElement("p", null, "Rather than letting D3 have control of the DOM, in his example Curran recreates the effect of D3's rendering but using the React Component model of returning JSX. In this way, rather than feeding data into the SVG, data can be stored and manipulated in the components and each part can be either smart of dumb to their context."), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, `
          --
          `))));
}
export default Curran;
