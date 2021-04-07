import React from "../../_snowpack/pkg/react.js";
const Signature = ({
  signature,
  content,
  publicKey,
  verify
}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "The Signature is ", /* @__PURE__ */ React.createElement("code", null, signature)), /* @__PURE__ */ React.createElement("p", null, "for content: "), /* @__PURE__ */ React.createElement("p", null, content), /* @__PURE__ */ React.createElement("p", null, "and public key: "), /* @__PURE__ */ React.createElement("pre", null, publicKey), /* @__PURE__ */ React.createElement("pre", null, JSON.stringify({verify})));
export default Signature;
