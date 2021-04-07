import React, {useState} from "../../_snowpack/pkg/react.js";
import * as Crypto from "../crypto/ecc.js";
import * as UtilUI from "../util-ui/index.js";
const Signature = ({
  signature,
  content
}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "The Signature is ", /* @__PURE__ */ React.createElement(UtilUI.Copy, {
  content: signature
}), " ", /* @__PURE__ */ React.createElement("code", null, signature)), /* @__PURE__ */ React.createElement("p", null, "for content: "), /* @__PURE__ */ React.createElement("p", null, content));
const Content = () => {
  const [content, setContent] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState();
  const [errors, setErrors] = useState({});
  const handleSubmit = (a) => {
    a.preventDefault();
    const e = {};
    if (privateKey === "") {
      e["privateKey"] = "private key is required";
    }
    if (content === "") {
      e["content"] = "content is required";
    }
    if (Object.values(e).length === 0) {
      Crypto.importPrivateKey(privateKey).then(async (cryptoKey) => {
        const signature2 = await Crypto.sign(cryptoKey, content);
        setSignature(signature2);
      }).catch(() => {
        e["privateKey"] = "private key is wrong";
        setErrors(e);
      });
    } else {
      setErrors(e);
    }
  };
  if (typeof signature !== "undefined") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Signature, {
      signature,
      content
    }), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      className: "btn btn-sm",
      onClick: () => setSignature(void 0)
    }, "Back"));
  }
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit
  }, /* @__PURE__ */ React.createElement(UtilUI.Errors, {
    errors
  }), /* @__PURE__ */ React.createElement(UtilUI.Input, {
    name: "content",
    placeholder: "Content",
    value: content,
    onChange: setContent,
    errors,
    type: "textarea"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(UtilUI.Input, {
    name: "privateKey",
    placeholder: "Private Key",
    value: privateKey,
    onChange: setPrivateKey,
    errors,
    type: "textarea"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Get Signature"));
};
export default () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Sign Content"), /* @__PURE__ */ React.createElement(Content, null));
