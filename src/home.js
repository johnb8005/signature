import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

import React from "../_snowpack/pkg/react.js";
const ghUrl = "https://github.com/johnb8005/signature";
const sha = __SNOWPACK_ENV__.SNOWPACK_GIT_SHA || "arandomsha";
const ghUrlSha = `${ghUrl}/commit/${sha}`;
export default () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Digital Signature"), /* @__PURE__ */ React.createElement("p", null, "Use the menu to browse the different options"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", {
  href: ghUrl
}, /* @__PURE__ */ React.createElement("i", {
  className: "fa fa-code"
}), " Source"), " available under MIT license. Contributions are welcome."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("small", null, /* @__PURE__ */ React.createElement("a", {
  href: ghUrlSha
}, sha.slice(0, 15)))));