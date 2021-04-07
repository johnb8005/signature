import React from "react";

const Signature = ({
  signature,
  content,
  publicKey,
  verify,
}: {
  signature: string;
  content: string;
  publicKey: string;
  verify: boolean;
}) => (
  <>
    <p>
      The Signature is <code>{signature}</code>
    </p>

    <p>for content: </p>

    <p>{content}</p>

    <p>and public key: </p>

    <pre>{publicKey}</pre>

    <pre>{JSON.stringify({ verify })}</pre>
  </>
);

export default Signature;
