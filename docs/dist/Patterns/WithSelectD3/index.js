import React from "../../../snowpack/pkg/react.js";
import {ChartComponent} from "./Dashboard.js";
import "./index.css.proxy.js";
function WithSelectD3() {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      margin: "2rem",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "1rem"
    }
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ChartComponent, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "With Select D3 Pattern"), /* @__PURE__ */ React.createElement("p", null, "When it comes to certain chart elements such as axises and brushes, its just a lot easier to let D3 have control and render the", " ", /* @__PURE__ */ React.createElement("code", null, `<g>`), " element. This is done by having a wrapped React Component that outputs an ", /* @__PURE__ */ React.createElement("code", null, `<svg>`), " that D3 can control and manipulate this part of the DOM."), /* @__PURE__ */ React.createElement("p", null, "The file structure is more atomic as you can group together all the top level charts which are made up of smaller and smaller components. These could also be organized per chart with the chart at the top level and then nested Axis and Marks folders. But if you wanted to make different types of the same category of charts, then its better to have them broken out atomically."), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, `With Select D3
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
export default WithSelectD3;
