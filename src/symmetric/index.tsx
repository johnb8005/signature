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

enum State {
  idle = 0,
  ready = 1,
  loading,
  sent,
}

const cipherfilename = "cipher.txt";

export default () => {
  const [state, setState] = React.useState<State>(State.idle);
  const [publicKey, setPublicKey] = React.useState<string>("");
  const [publicKeyOwn, setPublicKeyOwn] = React.useState<string>("");
  const [privateKey, setPrivateKey] = React.useState<string>("");

  if (state === State.idle) {
    // init keys

    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get("publicKey");

    if (!queryParam) {
      return (
        <p className="alert alert-warning" role="alert">
          The public key of the counterpart must be given (in query string)
        </p>
      );
    }

    setPublicKey(queryParam);

    createKeyPair().then(async ({ publicKey, privateKey }) => {
      const p = await crypto.subtle.exportKey("pkcs8", privateKey);
      setPrivateKey(ab2str(p));
      const p2 = await crypto.subtle.exportKey("raw", publicKey);
      setPublicKeyOwn(ab2str(p2));
    });

    setState(State.ready);

    return <p>Loading</p>;
  }

  if (state === State.loading) {
    return <p>Loading ...</p>;
  }

  if (state === State.ready) {
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

      downloadBlob(cipher, cipherfilename, "text/plain");

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

      setState(State.sent);
    };

    const handleCopyPublicKey = async () => {
      await navigator.clipboard.writeText(publicKey);
      alert("Public Key of Counterpart copied");
    };

    const handleDownloadKeyPair = () => {
      downloadBlob(publicKeyOwn, "public.txt", "text/plain");
      downloadBlob(privateKey, "private.txt", "text/plain");
    };

    return (
      <>
        <h1>Share File Secretly</h1>

        <div className="row">
          <div className="col-6">
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
            <div className="mb-3">
              <label className="form-label">
                Upload file to be shared secretly
              </label>
              <input
                className="form-control"
                type="file"
                onChange={handleUpload}
              />
            </div>

            <hr />

            <div className="mb-3">
              <label className="form-label">Public Key of Counterpart</label>

              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={handleCopyPublicKey}
                >
                  <i className="fa fa-copy" />
                </button>
                <input
                  className="form-control"
                  type="text"
                  value={publicKey}
                  disabled={true}
                  //  onChange={(v) => setPublicKey(v.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={handleDownloadKeyPair}
              >
                <i className="fa fa-key" /> Download Generated Keypair
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="alert alert-success" role="alert">
        The file was downloaded with the name <code>{cipherfilename}</code>
      </p>
      <button
        className="btn btn-outline btn-secondary"
        onClick={() => setState(State.ready)}
      >
        Upload a new file
      </button>
    </>
  );
};
