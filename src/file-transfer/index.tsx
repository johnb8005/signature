//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
//https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import React from "react";
import { basename } from "../config";
import { createKeyPair } from "../crypto/asymmetric/ecc2";
import { ab2str } from "../crypto/utils";
import links from "../link";

import RetrieveFile from "./retrieve-file";
import DownloadGeneratedKeyPair from "./download-generated-keypair";

enum State {
  loading = 0,
  init = 1,
  importCipher,
}
const getUrl = (publicKey: string) =>
  (basename || "").slice(0, -1) +
  links.createFileTransfer.link +
  "?publicKey=" +
  encodeURIComponent(publicKey);

export default () => {
  const [state, setState] = React.useState<State>(State.loading);
  const [publicKey, setPublicKey] = React.useState<string>("");
  const [privateKey, setPrivateKey] = React.useState<string>("");

  if (state === State.loading) {
    createKeyPair().then(async ({ publicKey, privateKey }) => {
      const p = await crypto.subtle.exportKey("pkcs8", privateKey);
      setPrivateKey(ab2str(p));
      const p2 = await crypto.subtle.exportKey("raw", publicKey);
      setPublicKey(ab2str(p2));
      setState(State.init);
    });

    return <p>Loading</p>;
  }

  if (state === State.importCipher) {
    return (
      <RetrieveFile
        onReset={() => setState(State.init)}
        privateKey={privateKey}
      />
    );
  }

  return (
    <>
      <h1>Initiate File Transfer</h1>

      <p>
        <a
          className="btn btn-outline-primary"
          target="_blank"
          href={getUrl(publicKey)}
        >
          <i className="fa fa-link" />
          &nbsp; File Transfer Link
        </a>
      </p>

      <button
        onClick={() => setState(State.importCipher)}
        className="btn btn-outline-primary"
      >
        Import encrypted file <i className="fa fa-arrow-right" />
      </button>

      <br />
      <DownloadGeneratedKeyPair privateKey={privateKey} publicKey={publicKey} />
    </>
  );
};
