import * as U from "../utils.js";
const enc = new TextEncoder();
const dec = new TextDecoder();
const ivlength = 16;
const algorithm = "AES-GCM";
const importSecretKey = (rawKey) => window.crypto.subtle.importKey("raw", rawKey, algorithm, true, [
  "encrypt",
  "decrypt"
]);
const encrypt = (encoded, key, iv) => window.crypto.subtle.encrypt({
  name: algorithm,
  iv
}, key, encoded);
const decrypt = (encoded, key, iv) => window.crypto.subtle.decrypt({
  name: algorithm,
  iv
}, key, encoded);
const encryptMessage = (message, key, iv) => {
  const encoded = enc.encode(message);
  return encrypt(encoded, key, iv);
};
const decryptMessage = (ctBase64, key, iv) => {
  const ctStr = atob(ctBase64);
  const ctUint8 = new Uint8Array(ctStr.match(/[\s\S]/g).map((ch) => ch.charCodeAt(0)));
  return decrypt(ctUint8, key, iv);
};
export const secretStringToCrypto = async (secret) => importSecretKey(enc.encode(secret));
export const encryptCompact = async (message, secret) => {
  const cryptoSecret = await secretStringToCrypto(secret);
  const iv = window.crypto.getRandomValues(new Uint8Array(ivlength));
  const ivHex = U.toHexString(iv);
  const ctBuffer = await encryptMessage(message, cryptoSecret, iv);
  const ctBase64 = U.ab2str2(ctBuffer);
  return [ivHex, ctBase64].join(":");
};
export const decryptCompact = async (cipherPlusIv, secret) => {
  const [iv, ctBase64] = cipherPlusIv.split(":");
  const ivUint8 = U.fromHex(iv);
  const cryptoSecret = await secretStringToCrypto(secret);
  const d = await decryptMessage(ctBase64, cryptoSecret, ivUint8);
  return dec.decode(d);
};
