import React from "../../../../snowpack/pkg/react.js";
const SelectCountry = ({
  pathGenerator,
  data,
  selected,
  onSelect
}) => {
  return /* @__PURE__ */ React.createElement("g", null, data && data.countries.features.map((d, i) => /* @__PURE__ */ React.createElement("path", {
    key: i,
    fill: "tomato",
    opacity: d.id === selected ? 1 : 0,
    className: "features",
    d: pathGenerator(d) || "",
    onClick: () => onSelect(d.id)
  })));
};
export default SelectCountry;
