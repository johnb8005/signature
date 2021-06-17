import React from "../../_snowpack/pkg/react.js";
import * as U from "../crypto/symmetric/aes.js";
const secretKey = "durbdhrbserjvcejg37fg3hcishfjkic";
export default () => {
  U.encryptCompact("hello7!", secretKey).then((x) => {
    console.log(x);
    const y = "18c9a475d6a8103069466e25e076b424:9e27d4764d01b8f113fd03204069030a";
    U.decryptCompact(x, secretKey).then((e) => console.log(e));
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Symmetric"), /* @__PURE__ */ React.createElement("code", null, "rawKey"), /* @__PURE__ */ React.createElement("code", null, "Message: ", "message"));
};
