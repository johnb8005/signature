import React from "../_snowpack/pkg/react.js";
import {Route, Switch} from "../_snowpack/pkg/react-router-dom.js";
import {links} from "./link.js";
import Home from "./home.js";
import Verify from "./verify/index.js";
import GenerateKeyPair from "./generate/index.js";
import Sign from "./sign/index.js";
const NotFound = () => /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "Page Not Found"));
export default () => {
  return /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/",
    component: Home
  }), /* @__PURE__ */ React.createElement(Route, {
    path: links.verify.link,
    component: Verify
  }), /* @__PURE__ */ React.createElement(Route, {
    path: links.generateKeyPair.link,
    component: GenerateKeyPair
  }), /* @__PURE__ */ React.createElement(Route, {
    path: links.sign.link,
    component: Sign
  }), /* @__PURE__ */ React.createElement(Route, {
    component: NotFound
  }));
};
