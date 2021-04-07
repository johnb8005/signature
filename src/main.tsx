import React, { useState } from "react";
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey

/*
Convert  an ArrayBuffer into a string
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
const ab2str = (buf: ArrayBuffer) =>
  String.fromCharCode.apply(null, new Uint8Array(buf));

export const exportKey = async (
  key: CryptoKey,
  format: "pkcs8" | "raw" | "spki",
  publicPrivate: "PUBLIC" | "PRIVATE"
): Promise<string> => {
  const exported = await window.crypto.subtle.exportKey(format, key);
  const str = ab2str(exported);
  const b64 = window.btoa(str);
  const sep = "-".repeat(5);
  return [
    sep + `BEGIN ${publicPrivate} KEY` + sep,
    b64,
    sep + `END ${publicPrivate} KEY` + sep,
  ].join("\n");
};

export const exportPrivateKey = async (
  privateKey: CryptoKey
): Promise<string> => exportKey(privateKey, "pkcs8", "PRIVATE");

export const exportPublicKey = async (publicKey: CryptoKey) =>
  exportKey(publicKey, "spki", "PUBLIC");

const generateKeyPair = async () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384",
    },
    true,
    ["sign", "verify"]
  );

  const exportedPrivate = await exportPrivateKey(keyPair.privateKey);
  const exportedPublic = await exportPublicKey(keyPair.publicKey);

  console.log({
    keyPair,

    exportedPrivate,
    exportedPublic,
  });
};
const Signature = ({
  signature,
  content,
  publicKey,
}: {
  signature: string;
  content: string;
  publicKey: string;
}) => (
  <>
    <p>
      The Signature is <code>{signature}</code>
    </p>

    <p>for content: </p>

    <p>{content}</p>

    <p>and public key: </p>

    <pre>{publicKey}</pre>
  </>
);

const Content = () => {
  const [content, setContent] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [signature, setSignature] = useState<string | undefined>();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("hs");
  };

  generateKeyPair();

  if (signature) {
    return (
      <Signature
        signature={signature}
        content={content}
        publicKey={publicKey}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className={"form-control"}
        placeholder={"Content"}
        value={content}
        onChange={(v) => setContent(v.target.value)}
      />
      <br />
      <textarea
        className={"form-control"}
        placeholder={"Public Key"}
        value={publicKey}
        onChange={(v) => setPublicKey(v.target.value)}
      />
      <br />

      <button className="btn btn-primary" type="submit">
        Get Signature
      </button>
    </form>
  );
};

export default () => (
  <>
    <h1>Check Signature</h1>
    <Content />
  </>
);
