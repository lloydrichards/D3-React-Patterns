import {axisLeft, select} from "../../../../snowpack/pkg/d3.js";
import React, {useEffect, useRef} from "../../../../snowpack/pkg/react.js";
const YLinearAxis = ({
  yScale,
  tickFormat,
  innerWidth,
  innerHeight,
  margin,
  ticks = 10
}) => {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current);
    const yAxis = axisLeft(yScale).tickFormat(tickFormat);
    svg.select(".y-axis").style("transform", `translate(${margin.left}px, ${margin.top}px)`).attr("color", "cadetblue").call(yAxis);
    svg.selectAll(".y-labels").data([0]).join("text").attr("class", "y-labels").attr("fill", "cadetblue").attr("text-anchor", "middle").attr("transform", `translate(0, ${(innerHeight - margin.top) / 2}) rotate(-90)`).style("text-anchor", "end").text("Population");
  }, [innerWidth]);
  return /* @__PURE__ */ React.createElement("svg", {
    style: {overflow: "visible"},
    ref: svgRef
  }, /* @__PURE__ */ React.createElement("g", {
    className: "y-axis"
  }));
};
export default YLinearAxis;
