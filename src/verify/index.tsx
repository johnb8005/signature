import React, { useState } from "react";
import * as Crypto from "../crypto/ecc";
import * as UtilUI from "../util-ui";
import Signature from "./signature";

const Content = () => {
  const [content, setContent] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [verify, setVerify] = useState<boolean | undefined>();
  const [errors, setErrors] = useState<UtilUI.Error>({});
  const [checkedParams, setCheckedParams] = useState<boolean>(false);

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("q");

  if (myParam && !checkedParams) {
    try {
      const b = window.atob(myParam);
      const a: {
        signature?: string;
        publicKey?: string;
        content?: string;
      } = JSON.parse(b);
      setCheckedParams(true);
      setSignature(a.signature);
      setPublicKey(a.publicKey);
      setContent(a.content);
    } catch (err) {
      console.log("could not parse");
    }
  }

  const handleSubmit = (a: any) => {
    a.preventDefault();

    const e: UtilUI.Error = {};

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
      Crypto.importPublicKey(publicKey)
        .then(async (cryptoKey) => {
          const verify = await Crypto.verify(cryptoKey, signature, content);
          setVerify(verify);
        })
        .catch((_cErrors) => {
          e["publicKey"] = "this is not a valid public key";
          setErrors(e);
        });
    } else {
      setErrors(e);
    }
  };

  if (typeof verify !== "undefined") {
    return (
      <>
        <Signature
          signature={signature}
          content={content}
          publicKey={publicKey}
          verify={verify}
        />
        <button
          type="button"
          className={"btn btn-sm"}
          onClick={() => setVerify(undefined)}
        >
          Back
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <UtilUI.Errors errors={errors} />
      <UtilUI.Input
        type={"textarea"}
        name="content"
        errors={errors}
        placeholder={"Content"}
        value={content}
        onChange={setContent}
      />
      <br />

      <UtilUI.Input
        type={"textarea"}
        name="publicKey"
        errors={errors}
        placeholder={"Public Key"}
        value={publicKey}
        onChange={setPublicKey}
      />

      <br />
      <UtilUI.Input
        name="signature"
        errors={errors}
        placeholder={"Signature"}
        value={signature}
        onChange={setSignature}
      />

      <br />

      <button className="btn btn-primary" type="submit">
        Verify Signature
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
