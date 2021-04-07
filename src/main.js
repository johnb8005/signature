import React, {useState} from "../_snowpack/pkg/react.js";
const ab2str = (buf) => String.fromCharCode.apply(null, new Uint8Array(buf));
export const exportKey = async (key, format, publicPrivate) => {
  const exported = await window.crypto.subtle.exportKey(format, key);
  const str = ab2str(exported);
  const b64 = window.btoa(str);
  const sep = "-".repeat(5);
  return [
    sep + `BEGIN ${publicPrivate} KEY` + sep,
    b64,
    sep + `END ${publicPrivate} KEY` + sep
  ].join("\n");
};
export const exportPrivateKey = async (privateKey) => exportKey(privateKey, "pkcs8", "PRIVATE");
export const exportPublicKey = async (publicKey) => exportKey(publicKey, "spki", "PUBLIC");
const generateKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey({
    name: "ECDSA",
    namedCurve: "P-384"
  }, true, ["sign", "verify"]);
  const exportedPrivate = await exportPrivateKey(keyPair.privateKey);
  const exportedPublic = await exportPublicKey(keyPair.publicKey);
  console.log({
    keyPair,
    exportedPrivate,
    exportedPublic
  });
};
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
  generateKeyPair();
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
