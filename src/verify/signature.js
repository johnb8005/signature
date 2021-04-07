import React from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {links} from "../link.js";
import * as UCrypto from "../crypto/utils.js";
const Signature = ({
  signature,
  content,
  publicKey,
  verify
}) => {
  const l = links.verify.link + UCrypto.generateLink(content, publicKey, signature);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, verify === true && /* @__PURE__ */ React.createElement("div", {
    className: "alert alert-success"
  }, "The signature is correct!"), verify === false && /* @__PURE__ */ React.createElement("div", {
    className: "alert alert-danger"
  }, "The signature is wrong!"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Link, {
    to: l
  }, "Direct Link")), /* @__PURE__ */ React.createElement("li", null, "Content: ", content), /* @__PURE__ */ React.createElement("li", null, "Signature ", /* @__PURE__ */ React.createElement("code", null, signature)), /* @__PURE__ */ React.createElement("li", null, "Public key: ", /* @__PURE__ */ React.createElement("code", null, publicKey))));
};
export default Signature;
