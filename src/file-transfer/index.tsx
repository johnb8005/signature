//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
//https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import React from "react";
import { basename } from "../config";
import {
  cipherStringToIvAndCipher,
  createKeyPair,
  decrypt,
  deriveKey,
  settings,
} from "../crypto/asymmetric/ecc2";
import { ab2str, str2ab } from "../crypto/utils";
import links from "../link";
import { downloadBlob } from "./utils";

import RetrieveFile from "./retrieve-file";

enum State {
  loading = 0,
  init = 1,
  importCipher,
}

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

  const handleDownloadKeyPair = () => {
    downloadBlob(publicKey, "public.txt", "text/plain");
    downloadBlob(privateKey, "private.txt", "text/plain");
  };

  if (state === State.importCipher) {
    const handleUpload = async ({
      target,
    }: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = target;

      if (files === null) {
        throw Error("files is null");
      }

      if (files.length === 0) {
        throw Error("files array is empty");
      }

      const [file] = files;

      const alicePrivateKey = await crypto.subtle.importKey(
        "pkcs8",
        str2ab(privateKey),
        settings.algorithm,
        settings.extractable,
        ["deriveKey"]
      );

      const cipher = await file.text();

      // upon receiving
      const cipherExtra = cipherStringToIvAndCipher(cipher);

      const bobPublicKey = await crypto.subtle.importKey(
        "raw",
        str2ab(cipherExtra.publicKey),
        settings.algorithm,
        settings.extractable,
        []
      );
      const sharedKey = await deriveKey(alicePrivateKey, bobPublicKey);

      const decrypted = await decrypt(
        cipherExtra.ctUint8,
        sharedKey,
        cipherExtra.iv
      );

      downloadBlob(decrypted, cipherExtra.filename, cipherExtra.filetype);
      setState(State.init);
    };

    return (
      <RetrieveFile
        onReset={() => setState(State.init)}
        onUpload={handleUpload}
      />
    );
  }

  const url =
    (basename || "").slice(0, -1) +
    links.createFileTransfer.link +
    "?publicKey=" +
    encodeURIComponent(publicKey);

  return (
    <>
      <h1>Initiate File Transfer</h1>

      <p>
        <a className="btn btn-outline-primary" target="_blank" href={url}>
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
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon1"
        onClick={handleDownloadKeyPair}
      >
        <i className="fa fa-key" /> Download Generated Keypair
      </button>
    </>
  );
};
