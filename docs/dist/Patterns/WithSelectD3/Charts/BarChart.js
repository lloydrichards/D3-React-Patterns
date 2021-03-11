import {
  extent,
  scaleBand,
  scaleLinear
} from "../../../../snowpack/pkg/d3.js";
import React from "../../../../snowpack/pkg/react.js";
import XLinearAxis from "../Axis/XLinearAxis.js";
import YBandAxis from "../Axis/YBandAxis.js";
import Bar from "../Marks/Bar.js";
const margin = {top: 10, right: 10, bottom: 40, left: 40};
const BarChart = ({
  data,
  selected,
  onSelect,
  width,
  height = 300
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const latestData = data.map((d) => d[d.length - 1]).slice(0, 25);
  const tickFormat2 = (domainValue, index) => `${domainValue / 1e6}M`;
  const xScale = scaleLinear().domain(extent(latestData, (d) => +d.population)).range([0, innerWidth]).nice();
  const yScale = scaleBand().domain(latestData.map((i) => i.country)).range([0, innerHeight]).paddingInner(0.2);
  return /* @__PURE__ */ React.createElement("svg", {
    style: {overflow: "visible"},
    width,
    height
  }, /* @__PURE__ */ React.createElement("g", {
    transform: `translate(${margin.left},${margin.top})`
  }, latestData && latestData.map((country) => /* @__PURE__ */ React.createElement(Bar, {
    key: `bar-${country.code}`,
    height: yScale.bandwidth(),
    width: xScale(country.population),
    y: yScale(country.country) || 0,
    selected: country.code === selected,
    onSelect: () => onSelect(country.code)
  }))), /* @__PURE__ */ React.createElement(XLinearAxis, {
    innerHeight,
    innerWidth,
    margin,
    tickFormat: tickFormat2,
    xScale
  }), /* @__PURE__ */ React.createElement(YBandAxis, {
    innerHeight,
    innerWidth,
    margin,
    yScale
  }));
};
export default BarChart;
