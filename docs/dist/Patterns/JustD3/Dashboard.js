import {timeParse} from "../../../snowpack/pkg/d3.js";
import React, {useState} from "../../../snowpack/pkg/react.js";
import BarChart from "./Charts/BarChart.js";
import LineChart from "./Charts/LineChart.js";
import WorldMap from "./Charts/WorldMap.js";
import {useCSVData} from "./Util/useCSVData.js";
import {useWorldAtlas} from "./Util/useWorldAtlas.js";
const parseYear = timeParse("%Y");
const Dashboard = () => {
  const [selected, setSelected] = useState(null);
  const transform = (raw) => {
    const years = raw?.columns?.slice(2);
    return raw.map((d) => {
      return years.map((year) => ({
        date: parseYear(year),
        population: d[year] ? +(d[year] || 0) * 1e3 : null,
        country: d.Country,
        code: (d["Country code"] || 0) < 100 ? `0${d["Country code"]}` : d["Country code"]
      }));
    });
  };
  const data = useCSVData("https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv", transform);
  const worldAtlas = useWorldAtlas();
  if (!data || !worldAtlas)
    /* @__PURE__ */ React.createElement("pre", null, "Loading...");
  console.log(selected);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WorldMap, {
    worldAtlas,
    selected,
    onSelect: setSelected
  }), /* @__PURE__ */ React.createElement(LineChart, {
    selected,
    data
  }), /* @__PURE__ */ React.createElement(BarChart, {
    selected,
    data,
    onSelect: setSelected
  }));
};
export default Dashboard;
