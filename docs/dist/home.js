import React, {useState, useEffect} from "../snowpack/pkg/react.js";
import {Link} from "../snowpack/pkg/react-router-dom.js";
import logo from "./logo.svg.proxy.js";
import "./Style/App.css.proxy.js";
function Home({}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1e3);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "App-header"
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo,
    className: "App-logo",
    alt: "logo"
  }), /* @__PURE__ */ React.createElement("h3", null, " Time to build some D3 chart patterns!")), /* @__PURE__ */ React.createElement("div", {
    className: "App-body",
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(500px, 80vw)"
    }
  }, /* @__PURE__ */ React.createElement("p", null, "The challenge here is to represent different ways of implementing D3 into React. This is not to see which is 'best' but rather to see different techniques and evaluate their strengths and weaknesses. In order to make the comparison, each Pattern should use the same data source and present it in three separate chart, that can be interacted with to update all the charts at once."), /* @__PURE__ */ React.createElement("p", null, "While viewing the pages on the web is nice, the real show is in the", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/lloydrichards/D3-React-Patterns"
  }, "Github D3-React-Patterns"), " ", "repo where you can see the code and compare the different implementations"), /* @__PURE__ */ React.createElement("p", null, "To get started, place a new folder in the ", /* @__PURE__ */ React.createElement("code", null, "src/Patterns"), " ", "directory and create a ", /* @__PURE__ */ React.createElement("code", null, "index.tsx"), " file for your development."), /* @__PURE__ */ React.createElement("p", null, "Next add a route in the ", /* @__PURE__ */ React.createElement("code", null, "src/App.tsx"), " and lazy load your pattern's index.tsx. From here you will have a code split bundle that shouldn't load any extra components."), /* @__PURE__ */ React.createElement("p", null, "Then at a Link tag to the route in this file,", " ", /* @__PURE__ */ React.createElement("code", null, "src/home.tsx")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "Good Luck!"))), /* @__PURE__ */ React.createElement("div", {
    className: "route-link",
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(500px, 80vw)",
      color: "snow"
    }
  }, /* @__PURE__ */ React.createElement("h3", null, "Patterns"), /* @__PURE__ */ React.createElement(Link, {
    to: "/just+d3"
  }, "JustD3"), /* @__PURE__ */ React.createElement(Link, {
    to: "/with+select+d3"
  }, "WithSelectD3 (coming soon)"), /* @__PURE__ */ React.createElement(Link, {
    to: "/with+components"
  }, "WithComponents"), /* @__PURE__ */ React.createElement(Link, {
    to: "/with+context"
  }, "WithContext (coming soon)"), /* @__PURE__ */ React.createElement(Link, {
    to: "/render+props"
  }, "RenderProps (coming soon)"), /* @__PURE__ */ React.createElement(Link, {
    to: "/higher+order+components"
  }, "HOC (coming soon)")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", {
    className: "App-link",
    href: "https://d3js.org/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn D3")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", {
    className: "App-link",
    href: "https://reactjs.org",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn React")));
}
export default Home;
