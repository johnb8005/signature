//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
//https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import React from "react";

import {
  createKeyPair,
  deriveKey,
  encrypt,
  settings,
  toCipherString,
} from "../crypto/asymmetric/ecc2";
import { ab2str, str2ab } from "../crypto/utils";
import { downloadBlob } from "./utils";

export default () => {
  const [publicKey, setPublicKey] = React.useState<string>("");
  const [publicKeyOwn, setPublicKeyOwn] = React.useState<string>("");
  const [privateKey, setPrivateKey] = React.useState<string>("");

  if (publicKey === "") {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get("publicKey");

    if (!queryParam) {
      alert("the link is faulty, the public key must be given");
      return <></>;
    }
    setPublicKey(queryParam);
  }

  if (privateKey === "" && publicKey !== "") {
    createKeyPair().then(async ({ publicKey, privateKey }) => {
      const p = await crypto.subtle.exportKey("pkcs8", privateKey);
      setPrivateKey(ab2str(p));
      const p2 = await crypto.subtle.exportKey("raw", publicKey);
      setPublicKeyOwn(ab2str(p2));
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

    const fileAb = await file.arrayBuffer();
    const fileUArray = new Uint8Array(fileAb);

    const bobPublicKey = await crypto.subtle.importKey(
      "raw",
      str2ab(publicKey),
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
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await encrypt(fileUArray, sharedKey, iv);

    const cipher = toCipherString(
      encrypted,
      iv,
      file.name,
      file.type,
      publicKeyOwn
    ); // <- this is what is to be shared (todo add filename and type)

    downloadBlob(cipher, "cipher.txt", "application/txt");

    // upon receiving
    //const cipherExtra = cipherStringToIvAndCipher(cipher);
    /*const decrypted = await decrypt(
      cipherExtra.ctUint8,
      sharedKey,
      cipherExtra.iv
    );*/
    console.log(cipher);
    // console.log(fileUArray, file.name, file.type, decrypted);

    // downloadBlob(decrypted, file.name, file.type);
  };

  return (
    <>
      <h1>Symmetric</h1>

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Public Key</label>
        <input
          className="form-control"
          type="text"
          value={publicKey}
          disabled={true}
          //  onChange={(v) => setPublicKey(v.target.value)}
        />
      </div>

      {/*   <hr />

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
          value={publicKeyOwn}
          onChange={(v) => setPublicKeyOwn(v.target.value)}
        />
  </div>*/}

      <input type="file" onChange={handleUpload} />
    </>
  );
};
