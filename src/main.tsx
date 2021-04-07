import React, { useState } from "react";
import * as Crypto from "./crypto/ecc";

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

  Crypto.generateKeyPair();

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
