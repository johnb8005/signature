//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
//https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import React from "react";
import {
  cipherStringToIvAndCipher,
  createKeyPair,
  decrypt,
  deriveKey,
  encrypt,
  toCipherString,
} from "../crypto/asymmetric/ecc2";
import * as U from "../crypto/symmetric/aes";

const secretKey = "durbdhrbserjvcejg37fg3hcishfjkic"; // key size 256, string length = 256/8 = 32

const downloadURL = (data: any, fileName: string) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = "none";
  a.click();
  a.remove();
};

const downloadBlob = (data: BlobPart, fileName: string, mimeType: string) => {
  const blob = new Blob([data], {
    type: mimeType,
  });

  const url = window.URL.createObjectURL(blob);

  downloadURL(url, fileName);
};

export default () => {
  U.encryptCompact("hello7!", secretKey).then((x) => {
    console.log(x);
    const y =
      "18c9a475d6a8103069466e25e076b424:9e27d4764d01b8f113fd03204069030a"; // should match nexys/crypto - it does not
    U.decryptCompact(x, secretKey).then((e) => console.log(e));
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("here");
    const { files } = e.target;

    console.log(files);

    if (files === null) {
      throw Error("files is null");
    }

    if (files.length === 0) {
      throw Error("files array is empty");
    }

    const [file] = files;

    const fileAb = await file.arrayBuffer();
    const filebUArray = new Uint8Array(fileAb);

    const alice = await createKeyPair();
    const bob = await createKeyPair();

    const sharedKey = await deriveKey(alice.privateKey, bob.publicKey);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await encrypt(filebUArray, sharedKey, iv);

    const cipher = toCipherString(encrypted, iv); // <- this is what is to be shared (todo add filename and type)

    // upon receiving
    const cipherExtra = cipherStringToIvAndCipher(cipher);
    const decrypted = await decrypt(
      cipherExtra.ctUint8,
      sharedKey,
      cipherExtra.iv
    );
    console.log(cipher);
    console.log(filebUArray, file.name, file.type, decrypted);

    downloadBlob(decrypted, file.name, file.type);
  };

  return (
    <>
      <h1>Symmetric</h1>
      <input type="file" onChange={handleUpload} />
      <code>{"rawKey"}</code>
      <code>Message: {"message"}</code>
    </>
  );
};
