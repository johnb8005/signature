// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
// https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import * as U from "../utils";

const enc = new TextEncoder();
const dec = new TextDecoder();
const ivlength = 16; // AES blocksize
const algorithm = "AES-GCM";
const importSecretKey = (rawKey: Uint8Array) =>
  window.crypto.subtle.importKey("raw", rawKey, algorithm, true, [
    "encrypt",
    "decrypt",
  ]);

const encrypt = (
  encoded: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> =>
  window.crypto.subtle.encrypt(
    {
      name: algorithm,
      iv,
    },
    key,
    encoded
  );

const decrypt = (
  encoded: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> =>
  window.crypto.subtle.decrypt(
    {
      name: algorithm,
      iv,
    },
    key,
    encoded
  );

const encryptMessage = (
  message: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> => {
  const encoded: ArrayBuffer = enc.encode(message);

  return encrypt(encoded, key, iv);
};

const decryptMessage = (
  ctBase64: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> => {
  const ctStr = atob(ctBase64); // decode base64 ciphertext
  const prg = ctStr.match(/[\s\S]/g)

  if (!prg) {
    throw Error('prg is null')
  }
  const rg = prg.map((ch) => ch.charCodeAt(0))
  const ctUint8 = new Uint8Array(
  rg
  ); // ciphertext as Uint8Array

  return decrypt(ctUint8, key, iv);
};

export const secretStringToCrypto = async (secret: string) =>
  importSecretKey(enc.encode(secret));

export const encryptCompact = async (message: string, secret: string) => {
  // secret
  const cryptoSecret = await secretStringToCrypto(secret);

  // generate iv
  const iv = window.crypto.getRandomValues(new Uint8Array(ivlength));
  const ivHex = U.toHexString(iv);

  // encryption
  const ctBuffer = await encryptMessage(message, cryptoSecret, iv);
  const ctBase64 = U.ab2str2(ctBuffer);

  return [ivHex, ctBase64].join(":");
};

export const decryptCompact = async (cipherPlusIv: string, secret: string) => {
  const [iv, ctBase64] = cipherPlusIv.split(":");

  const ivUint8 = U.fromHex(iv);

  // secret
  const cryptoSecret = await secretStringToCrypto(secret);

  const d = await decryptMessage(ctBase64, cryptoSecret, ivUint8);
  return dec.decode(d);
};
