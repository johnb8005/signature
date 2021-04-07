import React, {useState} from "../_snowpack/pkg/react.js";
import * as Crypto from "./crypto/ecc.js";
const Signature = ({
  signature,
  content,
  publicKey
}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "The Signature is ", /* @__PURE__ */ React.createElement("code", null, signature)), /* @__PURE__ */ React.createElement("p", null, "for content: "), /* @__PURE__ */ React.createElement("p", null, content), /* @__PURE__ */ React.createElement("p", null, "and public key: "), /* @__PURE__ */ React.createElement("pre", null, publicKey));
const Content = () => {
  const [content, setContent] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hs");
  };
  Crypto.generateKeyPair();
  if (signature) {
    return /* @__PURE__ */ React.createElement(Signature, {
      signature,
      content,
      publicKey
    });
  }
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit
  }, /* @__PURE__ */ React.createElement("textarea", {
    className: "form-control",
    placeholder: "Content",
    value: content,
    onChange: (v) => setContent(v.target.value)
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("textarea", {
    className: "form-control",
    placeholder: "Public Key",
    value: publicKey,
    onChange: (v) => setPublicKey(v.target.value)
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Get Signature"));
};
export default () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Check Signature"), /* @__PURE__ */ React.createElement(Content, null));
