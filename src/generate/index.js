import React from "../../_snowpack/pkg/react.js";
import * as Crypto from "../crypto/asymmetric/ecc.js";
import * as UI from "../util-ui/index.js";
const Content = ({data}) => {
  const d = new Date();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "Generated ", d.toLocaleDateString(), " at ", d.toLocaleTimeString())), /* @__PURE__ */ React.createElement("p", null, "Private ", /* @__PURE__ */ React.createElement(UI.Copy, {
    content: data.private
  })), /* @__PURE__ */ React.createElement("pre", null, data.private), /* @__PURE__ */ React.createElement("p", null, "Public ", /* @__PURE__ */ React.createElement(UI.Copy, {
    content: data.public
  })), /* @__PURE__ */ React.createElement("pre", null, data.public));
};
export default () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Generate Public-Private Key Pair"), /* @__PURE__ */ React.createElement(UI.withLoader, {
  promise: Crypto.generateKeyPair,
  Component: Content
}));
