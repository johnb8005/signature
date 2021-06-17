import React, {useState} from "../../_snowpack/pkg/react.js";
import * as Crypto from "../crypto/asymmetric/ecc.js";
import * as UtilUI from "../util-ui/index.js";
import Signature from "./signature.js";
const Content = () => {
  const [content, setContent] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [verify, setVerify] = useState();
  const [errors, setErrors] = useState({});
  const [checkedParams, setCheckedParams] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("q");
  if (myParam && !checkedParams) {
    try {
      const b = window.atob(myParam);
      const a = JSON.parse(b);
      setCheckedParams(true);
      setSignature(a.signature);
      setPublicKey(a.publicKey);
      setContent(a.content);
    } catch (err) {
      console.log("could not parse");
    }
  }
  const handleSubmit = (a) => {
    a.preventDefault();
    const e = {};
    if (!signature) {
      e["signature"] = "signature is required";
    }
    if (!publicKey) {
      e["publicKey"] = "public key is required";
    }
    if (!content) {
      e["content"] = "content is required";
    }
    if (Object.values(e).length === 0) {
      Crypto.importPublicKey(publicKey).then(async (cryptoKey) => {
        const verify2 = await Crypto.verify(cryptoKey, signature, content);
        setVerify(verify2);
      }).catch((_cErrors) => {
        e["publicKey"] = "this is not a valid public key";
        setErrors(e);
      });
    } else {
      setErrors(e);
    }
  };
  if (typeof verify !== "undefined") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Signature, {
      signature,
      content,
      publicKey,
      verify
    }), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      className: "btn btn-sm",
      onClick: () => setVerify(void 0)
    }, "Back"));
  }
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit
  }, /* @__PURE__ */ React.createElement(UtilUI.Errors, {
    errors
  }), /* @__PURE__ */ React.createElement(UtilUI.Input, {
    type: "textarea",
    name: "content",
    errors,
    placeholder: "Content",
    value: content,
    onChange: setContent
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(UtilUI.Input, {
    type: "textarea",
    name: "publicKey",
    errors,
    placeholder: "Public Key",
    value: publicKey,
    onChange: setPublicKey
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(UtilUI.Input, {
    name: "signature",
    errors,
    placeholder: "Signature",
    value: signature,
    onChange: setSignature
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Verify Signature"));
};
export default () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Check Signature"), /* @__PURE__ */ React.createElement(Content, null));
