import React from "../_snowpack/pkg/react.js";
const T = () => {
  console.log("d");
  return /* @__PURE__ */ React.createElement("p", null, "sdf");
};
import {Route, Switch} from "../_snowpack/pkg/react-router-dom.js";
export default () => {
  return /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    component: T
  }));
};
