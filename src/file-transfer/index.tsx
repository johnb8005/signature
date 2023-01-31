//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
//https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import React from "react";
import {
  cipherStringToIvAndCipher,
  createKeyPair,
  decrypt,
  deriveKey,
  encrypt,
  settings,
  toCipherString,
} from "../crypto/asymmetric/ecc2";
import { ab2str, str2ab } from "../crypto/utils";
import links from "../link";
import { downloadBlob } from "../symmetric/utils";

export default () => {
  const [extPublicKey, setExtPublicKey] = React.useState<string>("");
  const [publicKey, setPublicKey] = React.useState<string>("");
  const [privateKey, setPrivateKey] = React.useState<string>("");

  if (publicKey === "") {
    createKeyPair().then(async ({ publicKey }) => {
      console.log(publicKey);
      const p = await crypto.subtle.exportKey("raw", publicKey);
      console.log(p);
      setPublicKey(ab2str(p));
    });
  }

  if (privateKey === "" && publicKey !== "") {
    createKeyPair().then(async ({ publicKey, privateKey }) => {
      const p = await crypto.subtle.exportKey("pkcs8", privateKey);
      setPrivateKey(ab2str(p));
      const p2 = await crypto.subtle.exportKey("raw", publicKey);
      setPublicKey(ab2str(p2));
    });
  }

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

    const bobPublicKey = await crypto.subtle.importKey(
      "raw",
      str2ab(extPublicKey),
      settings.algorithm,
      settings.extractable,
      []
    );

    const alicePrivateKey = await crypto.subtle.importKey(
      "pkcs8",
      str2ab(privateKey),
      settings.algorithm,
      settings.extractable,
      ["deriveKey"]
    );

    const sharedKey = await deriveKey(alicePrivateKey, bobPublicKey);

    console.log(sharedKey);

    const cipher = await file.text();

    // upon receiving
    const cipherExtra = cipherStringToIvAndCipher(cipher);
    const decrypted = await decrypt(
      cipherExtra.ctUint8,
      sharedKey,
      cipherExtra.iv
    );

    const filename = "a.png";
    const filetype = "image/png";

    downloadBlob(decrypted, filename, filetype);
  };

  const url =
    links.createFileTransfer.link +
    "?publicKey=" +
    encodeURIComponent(publicKey);

  return (
    <>
      <h1>Initiate File Transfer</h1>

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Private Key</label>
        <input
          className="form-control"
          type="text"
          value={privateKey}
          onChange={(v) => setPrivateKey(v.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Public Key</label>
        <input
          className="form-control"
          type="text"
          value={publicKey}
          onChange={(v) => setPublicKey(v.target.value)}
        />
      </div>

      <p>
        <a href={url}>
          <code>{url}</code>
        </a>
      </p>

      <hr />

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">External Public Key</label>
        <input
          className="form-control"
          type="text"
          value={extPublicKey}
          onChange={(v) => setExtPublicKey(v.target.value)}
        />
      </div>

      <input type="file" onChange={handleUpload} />
    </>
  );
};
