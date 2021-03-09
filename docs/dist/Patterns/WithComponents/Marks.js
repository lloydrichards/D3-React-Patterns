import React from "../../../snowpack/pkg/react.js";
import {geoNaturalEarth1, geoPath, geoGraticule} from "../../../snowpack/pkg/d3.js";
export const Marks = ({
  worldAtlas: {land, interiors},
  cities,
  sizeScale,
  sizeValue,
  width,
  height
}) => {
  const projection = geoNaturalEarth1().fitSize([width, height], {
    type: "Sphere"
  });
  const path = geoPath(projection);
  const graticule = geoGraticule();
  return /* @__PURE__ */ React.createElement("g", {
    className: "marks"
  }, /* @__PURE__ */ React.createElement("path", {
    className: "sphere",
    d: path({type: "Sphere"}) || ""
  }), /* @__PURE__ */ React.createElement("path", {
    className: "graticules",
    d: path(graticule()) || ""
  }), land.features.map((feature) => /* @__PURE__ */ React.createElement("path", {
    className: "land",
    d: path(feature) || ""
  })), /* @__PURE__ */ React.createElement("path", {
    className: "interiors",
    d: path(interiors) || ""
  }), cities.map((d) => {
    const [x, y] = projection([d.lng, d.lat]);
    return /* @__PURE__ */ React.createElement("circle", {
      cx: x,
      cy: y,
      r: sizeScale(sizeValue(d))
    });
  }));
};
