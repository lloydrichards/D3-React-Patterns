import React from "../snowpack/pkg/react.js";
import {NavLink} from "../snowpack/pkg/react-router-dom.js";
function Navbar({}) {
  return /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement(NavLink, {
    activeClassName: "selected",
    exact: true,
    to: "/"
  }, "Home"), /* @__PURE__ */ React.createElement(NavLink, {
    activeClassName: "selected",
    to: "/just+d3"
  }, "JustD3"), /* @__PURE__ */ React.createElement(NavLink, {
    activeClassName: "selected",
    to: "/with+select+d3"
  }, "WithSelectD3"), /* @__PURE__ */ React.createElement(NavLink, {
    activeClassName: "selected",
    to: "/with+components"
  }, "WithComponents"), /* @__PURE__ */ React.createElement(NavLink, {
    className: "disabled",
    activeClassName: "selected",
    to: "/with+context"
  }, "WithContext"), /* @__PURE__ */ React.createElement(NavLink, {
    className: "disabled",
    activeClassName: "selected",
    to: "/render+props"
  }, "RenderProps"), /* @__PURE__ */ React.createElement(NavLink, {
    className: "disabled",
    activeClassName: "selected",
    to: "/higher+order+components"
  }, "HOC"));
}
export default Navbar;
