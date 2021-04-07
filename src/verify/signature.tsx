import React from "react";
import { Link } from "react-router-dom";
import { links } from "../link";
import * as UCrypto from "../crypto/utils";
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
}) => {
  const l =
    links.verify.link + UCrypto.generateLink(content, publicKey, signature);
  return (
    <>
      {verify === true && (
        <div className={"alert alert-success"}>The signature is correct!</div>
      )}
      {verify === false && (
        <div className={"alert alert-danger"}>The signature is wrong!</div>
      )}

      <ul>
        <li>
          <Link to={l}>Direct Link</Link>
        </li>
        <li>Content: {content}</li>
        <li>
          Signature <code>{signature}</code>
        </li>
        <li>
          Public key: <code>{publicKey}</code>
        </li>
      </ul>
    </>
  );
};

export default Signature;
