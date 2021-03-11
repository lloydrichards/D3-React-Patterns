import {axisBottom, select} from "../../../../snowpack/pkg/d3.js";
import React, {useEffect, useRef} from "../../../../snowpack/pkg/react.js";
const XTimeAxis = ({
  xScale,
  innerWidth,
  innerHeight,
  margin,
  ticks = 10
}) => {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current);
    const xAxis = axisBottom(xScale).ticks(ticks);
    svg.select(".x-axis").style("transform", `translate(${margin.left}px, ${innerHeight + margin.top}px)`).attr("color", "cadetblue").call(xAxis);
    svg.selectAll(".x-labels").data([0]).join("text").attr("class", "x-labels").attr("transform", `translate(${innerWidth / 2}, ${innerHeight + 40})`).attr("fill", "cadetblue").style("text-anchor", "middle").text("Year");
  }, [innerWidth]);
  return /* @__PURE__ */ React.createElement("svg", {
    style: {overflow: "visible"},
    ref: svgRef
  }, /* @__PURE__ */ React.createElement("g", {
    className: "x-axis"
  }));
};
export default XTimeAxis;
