import {axisLeft, select} from "../../../../snowpack/pkg/d3.js";
import React, {useEffect, useRef} from "../../../../snowpack/pkg/react.js";
const YLinearAxis = ({
  yScale,
  innerWidth,
  innerHeight,
  margin,
  ticks = 10
}) => {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current);
    const yAxis = axisLeft(yScale).ticks(ticks);
    svg.select(".y-axis").style("transform", `translate(${margin.left}px, ${margin.top}px)`).attr("color", "cadetblue").call(yAxis);
  }, [innerWidth]);
  return /* @__PURE__ */ React.createElement("svg", {
    style: {overflow: "visible"},
    ref: svgRef
  }, /* @__PURE__ */ React.createElement("g", {
    className: "y-axis"
  }));
};
export default YLinearAxis;
