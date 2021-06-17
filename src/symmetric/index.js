import React from "../../_snowpack/pkg/react.js";
import * as U from "../crypto/symmetric/aes.js";
const secretKey = "rbdhrbserjvcejg3rbdhrbserjvcejg3";
export default () => {
  U.encryptCompact("hello7!", secretKey).then((x) => {
    console.log(x);
    U.decryptCompact(x, secretKey).then((e) => console.log(e));
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Symmetric"), /* @__PURE__ */ React.createElement("code", null, "rawKey"), /* @__PURE__ */ React.createElement("code", null, "Message: ", "message"));
};
