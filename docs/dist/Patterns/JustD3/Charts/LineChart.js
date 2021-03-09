import {
  axisBottom,
  axisLeft,
  extent,
  line,
  scaleLinear,
  scaleTime,
  select
} from "../../../../snowpack/pkg/d3.js";
import React, {useEffect, useRef} from "../../../../snowpack/pkg/react.js";
import useResizeObserver from "../Util/useResizeObserver.js";
const LineChart = ({data, selected}) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!data || data.length === 0)
      return;
    const svg = select(svgRef.current);
    if (!dimensions)
      return;
    const allData = data.reduce((accumulator, countryTimeseries) => accumulator.concat(countryTimeseries), []);
    const xScale = scaleTime().domain(extent(allData, (d) => d.date)).range([0, dimensions.width]).nice();
    const yScale = scaleLinear().domain(extent(allData, (d) => +d.population)).range([dimensions.height, 0]).nice();
    const xAxis = axisBottom(xScale).ticks(5);
    const yAxis = axisLeft(yScale).tickFormat((d) => `${d / 1e6}M`);
    svg.select(".x-axis").style("transform", `translate(0px, ${dimensions.height}px)`).attr("color", "cadetblue").call(xAxis);
    svg.select(".y-axis").attr("color", "cadetblue").call(yAxis);
    svg.selectAll(".center-line").data([0]).join("line").attr("class", "center-line").attr("x1", 0).attr("x2", dimensions.width).attr("y1", yScale(0)).attr("y2", yScale(0)).attr("stroke", "cadetblue").attr("stroke-width", 1);
    svg.selectAll(".x-labels").data([0]).join("text").attr("class", "x-labels").attr("transform", `translate(${dimensions.width / 2}, ${dimensions.height + 40})`).attr("fill", "cadetblue").style("text-anchor", "middle").text("Year");
    svg.selectAll(".y-labels").data([0]).join("text").attr("class", "y-labels").attr("fill", "cadetblue").attr("text-anchor", "middle").attr("transform", `translate(-45, ${dimensions.height / 2}) rotate(-90)`).style("text-anchor", "end").text("Population");
    const lineGenerator = line().x((d) => xScale(d.date)).y((d) => yScale(d.population));
    svg.selectAll(".selected-line").data(data.filter((i) => i[0].code === selected)).join("path").attr("class", "selected-line").attr("fill", "none").attr("stroke", "tomato").attr("stroke-width", 3).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("d", (d) => lineGenerator(d));
    svg.selectAll(".line").data(data).join("path").attr("class", "line").attr("fill", "none").attr("stroke", "grey").attr("opacity", 0.3).attr("stroke-width", 1).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("d", (d) => lineGenerator(d));
  }, [dimensions, data, selected]);
  return /* @__PURE__ */ React.createElement("div", {
    style: {height: "200px", padding: "10px 10px 40px 40px"},
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
export default LineChart;
