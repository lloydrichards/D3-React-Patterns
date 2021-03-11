import {
  geoGraticule,
  geoNaturalEarth1,
  geoPath,
  select
} from "../../../../snowpack/pkg/d3.js";
import React, {useEffect, useRef} from "../../../../snowpack/pkg/react.js";
import useResizeObserver from "../Util/useResizeObserver.js";
const WorldMap = ({worldAtlas, selected, onSelect}) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!worldAtlas)
      return;
    const svg = select(svgRef.current);
    if (!dimensions)
      return;
    const projection = geoNaturalEarth1().fitSize([dimensions.width, dimensions.height], {
      type: "Sphere"
    });
    const pathGenerator = geoPath().projection(projection);
    const graticule = geoGraticule();
    svg.selectAll(".sphere").data([1]).join("path").attr("class", "sphere").attr("fill", "rgba(255,255,255,0.05)").attr("d", pathGenerator({type: "Sphere"}) || "");
    svg.selectAll(".graticule").data([1]).join("path").attr("class", "graticule").attr("fill", "none").attr("stroke", "grey").attr("opacity", 0.2).attr("d", pathGenerator(graticule()) || "");
    svg.selectAll(".land").data(worldAtlas.land.features.map((d) => d)).join("path").attr("class", "land").attr("fill", "grey").attr("opacity", 0.8).attr("d", (d) => pathGenerator(d));
    svg.selectAll(".interior").data([worldAtlas.interiors]).join("path").attr("class", "interior").attr("fill", "none").attr("stroke", "#184240").attr("d", (d) => pathGenerator(d));
    svg.selectAll(".features").data(worldAtlas.countries.features).join("path").attr("class", "features").attr("opacity", (d) => d.id === selected ? 1 : 0).attr("fill", "tomato").attr("d", (d) => pathGenerator(d)).on("click", (i, d) => onSelect(d.id));
  }, [dimensions, worldAtlas, selected]);
  return /* @__PURE__ */ React.createElement("div", {
    style: {height: "300px"},
    ref: wrapperRef
  }, /* @__PURE__ */ React.createElement("svg", {
    style: {overflow: "visible"},
    ref: svgRef
  }, /* @__PURE__ */ React.createElement("g", {
    className: "x-axis"
  }), /* @__PURE__ */ React.createElement("g", {
    className: "y-axis"
  })));
};
export default WorldMap;
