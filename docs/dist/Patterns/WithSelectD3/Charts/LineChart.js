import {
  extent,
  line,
  scaleLinear,
  scaleTime
} from "../../../../snowpack/pkg/d3.js";
import React from "../../../../snowpack/pkg/react.js";
import XTimeAxis from "../Axis/XTimeAxis.js";
import YLinearAxis from "../Axis/YLinearAxis.js";
import Line from "../Marks/Line.js";
const margin = {top: 10, right: 10, bottom: 40, left: 40};
const LineChart = ({
  data,
  selected,
  width,
  height = 300
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const allData = data.reduce((accumulator, countryTimeseries) => accumulator.concat(countryTimeseries), []);
  const xScale = scaleTime().domain(extent(allData, (d) => d.date)).range([0, innerWidth]).nice();
  const yScale = scaleLinear().domain(extent(allData, (d) => +d.population)).range([innerHeight, 0]).nice();
  const tickFormat = (domainValue, index) => `${domainValue / 1e6}M`;
  const lineGenerator = line().x((d) => xScale(d.date)).y((d) => yScale(d.population));
  const selectedData = data.find((countries) => countries[0].code === selected);
  return /* @__PURE__ */ React.createElement("svg", {
    style: {overflow: "visible"},
    width,
    height
  }, /* @__PURE__ */ React.createElement("g", {
    transform: `translate(${margin.left},${margin.top})`
  }, data.map((country) => /* @__PURE__ */ React.createElement(Line, {
    key: country[0].code,
    d: lineGenerator(country) || ""
  })), selectedData && /* @__PURE__ */ React.createElement(Line, {
    selected: true,
    d: lineGenerator(selectedData) || ""
  })), /* @__PURE__ */ React.createElement(XTimeAxis, {
    xScale,
    margin,
    innerHeight,
    innerWidth
  }), /* @__PURE__ */ React.createElement(YLinearAxis, {
    yScale,
    margin,
    tickFormat,
    innerHeight,
    innerWidth
  }));
};
export default LineChart;
