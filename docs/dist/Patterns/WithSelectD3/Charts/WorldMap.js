import {geoNaturalEarth1, geoPath} from "../../../../snowpack/pkg/d3.js";
import React from "../../../../snowpack/pkg/react.js";
import BaseMap from "../Marks/BaseMap.js";
import SelectCountry from "../Marks/SelectCountry.js";
const WorldMap = ({
  worldAtlas,
  selected,
  onSelect,
  width,
  height = 300
}) => {
  const projection = geoNaturalEarth1().fitSize([width, height], {
    type: "Sphere"
  });
  const pathGenerator = geoPath().projection(projection);
  return /* @__PURE__ */ React.createElement("svg", {
    width,
    height
  }, /* @__PURE__ */ React.createElement(BaseMap, {
    pathGenerator,
    data: worldAtlas
  }), /* @__PURE__ */ React.createElement(SelectCountry, {
    pathGenerator,
    data: worldAtlas,
    selected,
    onSelect
  }));
};
export default WorldMap;
