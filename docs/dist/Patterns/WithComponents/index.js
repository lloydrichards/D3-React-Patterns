import React from "../../../snowpack/pkg/react.js";
import {ChartComponent} from "./Dashboard.js";
import "./index.css.proxy.js";
function WithComponents() {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      margin: "2rem",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "1rem"
    }
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ChartComponent, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "With Components Pattern"), /* @__PURE__ */ React.createElement("p", null, "Rather than letting D3 have control of the DOM, in this pattern just uses React Components to returning JSX. In this way, rather than feeding data into the SVG, data can be stored and manipulated in the components and each part can be either smart of dumb to their context."), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, `With Componets
--Axis
----XLinearAxis.tsx
----XTimeAxis.tsx
----YBandAxis
----YLinearAxis
--Charts
----BarChart.tsx
----LineChart.tsx
----WorldMap.tsx
--Marks
----Bar.tsx
----BaseMap.tsx
----Line.tsx
----SelectCountry.tsx
--Util
----useCSVData.tsx
----useResizeObserver.tsx
----useWorldAtlas.tsx
--Dashboard.tsx
--index.tsx
--index.css`))));
}
export default WithComponents;
