import React from "../../../../snowpack/pkg/react.js";
function Bar({y, width, height, selected, onSelect}) {
  return /* @__PURE__ */ React.createElement("rect", {
    y,
    width,
    height,
    fill: selected ? "tomato" : "grey",
    onClick: onSelect
  });
}
export default Bar;
