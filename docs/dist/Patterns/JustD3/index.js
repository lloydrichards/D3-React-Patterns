import React from "../../../snowpack/pkg/react.js";
import Dashboard from "./Dashboard.js";
import "./index.css.proxy.js";
const JustD3 = () => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      margin: "2rem",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "1rem"
    }
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Dashboard, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Just D3 Pattern"), /* @__PURE__ */ React.createElement("p", null, "With the ", /* @__PURE__ */ React.createElement("strong", null, "Just D3 Pattern"), " we break the specific D3 charts up into their own component and then using", " ", /* @__PURE__ */ React.createElement("code", null, "useEffect()"), " and ", /* @__PURE__ */ React.createElement("code", null, "useRef()"), " allow D3 to control a specific SVG element and then construct the chart in the same way it would be done in JS. With Typescript there are some odd moments and the need to create more safe fall backs for the charts, but it works quite closely to examples you can find in ObservableHQ or bl.ocks.org"), /* @__PURE__ */ React.createElement("p", null, "The file structure for this pattern is pretty easy. Basically, there is one top level component ", /* @__PURE__ */ React.createElement("code", null, "Dashboard.tsx"), " which handles the data fetching and state management. Then each chart is self contained in its own file with various helper functions usually in a", " ", /* @__PURE__ */ React.createElement("code", null, "Util"), " folder. After building several graphs I end up with a colder filled with various charts that are each customized to the specific data and visualizations. Though its easy to fork these into other projects and adapt them to other forms, they are ultimately not very generic or flexible."), /* @__PURE__ */ React.createElement("code", null, /* @__PURE__ */ React.createElement("pre", null, `JustD3
--Charts
----BarChart.tsx
----LineChart.tsx
----WorldMap.tsx
--Util
----useData.tsx
----useResizeObserver.tsx
----useWorldAtlas.tsx
--Dashboard.tsx
--index.tsx`))));
};
export default JustD3;
