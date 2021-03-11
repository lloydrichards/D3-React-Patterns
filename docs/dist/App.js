import React, {lazy, Suspense} from "../snowpack/pkg/react.js";
import {BrowserRouter as Router, Switch, Route} from "../snowpack/pkg/react-router-dom.js";
import Home from "./home.js";
import Navbar from "./Navbar.js";
const JustD3 = lazy(() => import("./Patterns/JustD3/index.js"));
const WithComponents = lazy(() => import("./Patterns/WithComponents/index.js"));
const WithSelectD3 = lazy(() => import("./Patterns/WithSelectD3/index.js"));
const WithContext = lazy(() => import("./Patterns/WithContext/index.js"));
const RenderProps = lazy(() => import("./Patterns/RenderProps/index.js"));
const HigherOrderComponent = lazy(() => import("./Patterns/HigherOrderComponent/index.js"));
const App = () => {
  return /* @__PURE__ */ React.createElement(Router, {
    basename: "/D3-React-Patterns"
  }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement(Suspense, {
    fallback: /* @__PURE__ */ React.createElement("div", null, "Loading...")
  }, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/",
    component: Home
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/just+d3",
    component: JustD3
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/with+components",
    component: WithComponents
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/with+select+d3",
    component: WithSelectD3
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/with+context",
    component: WithContext
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/render+props",
    component: RenderProps
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/higher+order+component",
    component: HigherOrderComponent
  }))));
};
export default App;
