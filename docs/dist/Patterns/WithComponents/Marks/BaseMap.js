import {geoGraticule} from "../../../../snowpack/pkg/d3.js";
import React from "../../../../snowpack/pkg/react.js";
const BaseMap = ({pathGenerator, data}) => {
  const graticule = geoGraticule();
  return /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("path", {
    className: "sphere",
    fill: "rgba(255,255,255,0.05)",
    d: pathGenerator({type: "Sphere"}) || ""
  }), /* @__PURE__ */ React.createElement("path", {
    className: "graticule",
    fill: "none",
    d: pathGenerator(graticule()) || ""
  }), data && data.land.features.map((d) => /* @__PURE__ */ React.createElement("path", {
    fill: "grey",
    opacity: "0.2",
    className: "land",
    d: pathGenerator(d) || ""
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#184240",
    className: "interior",
    d: pathGenerator(data?.interiors) || ""
  }));
};
export default BaseMap;
