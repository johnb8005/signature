import React, { useState } from "react";
import * as Crypto from "../crypto/ecc";
import * as UtilUI from "../util-ui";

const Signature = ({
  signature,
  content,
}: {
  signature: string;
  content: string;
}) => (
  <>
    <p>
      The Signature is <UtilUI.Copy content={signature} />{" "}
      <code>{signature}</code>
    </p>

    <p>for content: </p>

    <p>{content}</p>
  </>
);

const Content = () => {
  const [content, setContent] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [signature, setSignature] = useState<string | undefined>();
  const [errors, setErrors] = useState<UtilUI.Error>({});
  const handleSubmit = (a: any) => {
    a.preventDefault();

    const e: UtilUI.Error = {};

    if (privateKey === "") {
      e["privateKey"] = "private key is required";
    }

    if (content === "") {
      e["content"] = "content is required";
    }

    if (Object.values(e).length === 0) {
      Crypto.importPrivateKey(privateKey)
        .then(async (cryptoKey) => {
          const signature = await Crypto.sign(cryptoKey, content);

          setSignature(signature);
        })
        .catch(() => {
          e["privateKey"] = "private key is wrong";
          setErrors(e);
        });
    } else {
      setErrors(e);
    }
  };

  if (typeof signature !== "undefined") {
    return (
      <>
        <Signature signature={signature} content={content} />
        <button
          type="button"
          className={"btn btn-sm"}
          onClick={() => setSignature(undefined)}
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
        name="content"
        placeholder="Content"
        value={content}
        onChange={setContent}
        errors={errors}
        type="textarea"
      />

      <br />
      <UtilUI.Input
        name="privateKey"
        placeholder="Private Key"
        value={privateKey}
        onChange={setPrivateKey}
        errors={errors}
        type="textarea"
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
    <h1>Sign Content</h1>
    <Content />
  </>
);
