import React from "../../../../snowpack/pkg/react.js";
const Line = ({d, selected}) => {
  return /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: selected ? "tomato" : "grey",
    strokeWidth: selected ? 3 : 1,
    opacity: selected ? 1 : 0.3,
    d
  });
};
export default Line;
