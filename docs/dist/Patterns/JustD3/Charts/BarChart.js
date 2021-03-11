import {
  axisBottom,
  axisLeft,
  extent,
  scaleBand,
  scaleLinear,
  select
} from "../../../../snowpack/pkg/d3.js";
import React, {useEffect, useRef} from "../../../../snowpack/pkg/react.js";
import useResizeObserver from "../Util/useResizeObserver.js";
const BarChart = ({data, selected, onSelect}) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!data || data.length === 0)
      return;
    const svg = select(svgRef.current);
    if (!dimensions)
      return;
    const latestData = data.map((d) => d[d.length - 1]).slice(0, 25);
    const xScale = scaleLinear().domain(extent(latestData, (d) => +d.population)).range([0, dimensions.width]).nice();
    const yScale = scaleBand().domain(latestData.map((i) => i.country)).range([0, dimensions.height]).paddingInner(0.2);
    const xAxis = axisBottom(xScale).tickFormat((d) => `${d / 1e6}M`);
    const yAxis = axisLeft(yScale).ticks(5);
    svg.select(".x-axis").style("transform", `translate(0px, ${dimensions.height}px)`).attr("color", "cadetblue").call(xAxis);
    svg.select(".y-axis").attr("color", "cadetblue").call(yAxis);
    svg.selectAll(".x-labels").data([0]).join("text").attr("class", "x-labels").attr("transform", `translate(${dimensions.width / 2}, ${dimensions.height + 40})`).attr("fill", "cadetblue").style("text-anchor", "middle").text("Population");
    svg.selectAll(".bars").data(latestData).join("rect").attr("class", "bars").attr("x", 0).attr("y", (d) => yScale(d.country) || 0).attr("width", (d) => xScale(d.population)).attr("height", yScale.bandwidth()).attr("fill", (d) => d.code === selected ? "tomato" : "grey").on("click", (i, d) => onSelect(d.code));
  }, [dimensions, data, selected]);
  return /* @__PURE__ */ React.createElement("div", {
    style: {height: "250px", padding: "10px 10px 40px 40px"},
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
export default BarChart;
