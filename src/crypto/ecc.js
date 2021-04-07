const algorithm = {
  name: "ECDSA",
  namedCurve: "P-384",
  hash: {name: "SHA-384"}
};
const keyUsages = ["sign", "verify"];
const getHeaderFooter = (publicPrivate, beginEnd) => {
  const sep = "-".repeat(5);
  return sep + `${beginEnd} ${publicPrivate} KEY` + sep;
};
const ab2str = (buf) => String.fromCharCode.apply(null, new Uint8Array(buf));
const str2ab = (str) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};
export const exportKey = async (key, format, publicPrivate) => {
  const exported = await window.crypto.subtle.exportKey(format, key);
  const str = ab2str(exported);
  const b64 = window.btoa(str);
  return [
    getHeaderFooter(publicPrivate, "BEGIN"),
    b64,
    getHeaderFooter(publicPrivate, "END")
  ].join("\n");
};
export const importPrivateKey = (pem) => {
  const pemHeader = getHeaderFooter("PRIVATE", "BEGIN");
  const pemFooter = getHeaderFooter("PRIVATE", "END");
  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
  const binaryDerString = window.atob(pemContents);
  const binaryDer = str2ab(binaryDerString);
  return window.crypto.subtle.importKey("pkcs8", binaryDer, algorithm, true, [
    "sign"
  ]);
};
export const importPublicKey = (pem) => {
  const pemHeader = getHeaderFooter("PUBLIC", "BEGIN");
  const pemFooter = getHeaderFooter("PUBLIC", "END");
  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
  const binaryDerString = window.atob(pemContents);
  const binaryDer = str2ab(binaryDerString);
  return window.crypto.subtle.importKey("spki", binaryDer, algorithm, true, [
    "verify"
  ]);
};
export const exportPrivateKey = async (privateKey) => exportKey(privateKey, "pkcs8", "PRIVATE");
export const exportPublicKey = async (publicKey) => exportKey(publicKey, "spki", "PUBLIC");
export const generateKeyPairRaw = async () => {
  const keyPair = await window.crypto.subtle.generateKey(algorithm, true, keyUsages);
  return keyPair;
};
export const generateKeyPair = async () => {
  const keyPair = await generateKeyPairRaw();
  const exportedPrivate = await exportPrivateKey(keyPair.privateKey);
  const exportedPublic = await exportPublicKey(keyPair.publicKey);
  return {private: exportedPrivate, public: exportedPublic};
};
const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");
export const sign = async (privateKey, data) => {
  const binaryDerString = window.atob(data);
  const ab = str2ab(binaryDerString);
  const s = await crypto.subtle.sign(algorithm, privateKey, ab);
  const str = ab2str(s);
  const b64 = window.btoa(str);
  return b64;
};
export const verify = async (publicKey, signature, data) => {
  const binaryDerString = window.atob(data);
  const ab = str2ab(binaryDerString);
  const binarySignature = window.atob(signature);
  const signatureAb = str2ab(binarySignature);
  const s = await crypto.subtle.verify(algorithm, publicKey, signatureAb, ab);
  return s;
};
