import { ab2str, str2ab } from "../utils";

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey

/*
Convert  an ArrayBuffer into a string
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/

const algorithm = {
  name: "ECDSA",
  namedCurve: "P-384",
  hash: { name: "SHA-384" },
};

const keyUsages: KeyUsage[] = ["sign", "verify"];

const getHeaderFooter = (
  publicPrivate: "PUBLIC" | "PRIVATE",
  beginEnd: "BEGIN" | "END"
): string => {
  const sep = "-".repeat(5);
  return sep + `${beginEnd} ${publicPrivate} KEY` + sep;
};

export const exportKey = async (
  key: CryptoKey,
  format: "pkcs8" | "raw" | "spki",
  publicPrivate: "PUBLIC" | "PRIVATE"
): Promise<string> => {
  const exported = await crypto.subtle.exportKey(format, key);
  const str = ab2str(exported);
  const b64 = window.btoa(str);
  return [
    getHeaderFooter(publicPrivate, "BEGIN"),
    b64,
    getHeaderFooter(publicPrivate, "END"),
  ].join("\n");
};

export const importPrivateKey = (pem: string): Promise<CryptoKey> => {
  // fetch the part of the PEM string between header and footer
  const pemHeader = getHeaderFooter("PRIVATE", "BEGIN");
  const pemFooter = getHeaderFooter("PRIVATE", "END");

  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  );
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return crypto.subtle.importKey("pkcs8", binaryDer, algorithm, true, [
    "sign",
  ]);
};

export const importPublicKey = (pem: string): Promise<CryptoKey> => {
  // fetch the part of the PEM string between header and footer
  const pemHeader = getHeaderFooter("PUBLIC", "BEGIN");
  const pemFooter = getHeaderFooter("PUBLIC", "END");

  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  );
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return crypto.subtle.importKey("spki", binaryDer, algorithm, true, [
    "verify",
  ]);
};

export const exportPrivateKey = async (
  privateKey: CryptoKey
): Promise<string> => exportKey(privateKey, "pkcs8", "PRIVATE");

export const exportPublicKey = async (publicKey: CryptoKey) =>
  exportKey(publicKey, "spki", "PUBLIC");

export const generateKeyPairRaw = async () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
  const keyPair = await crypto.subtle.generateKey(
    algorithm,
    true,
    keyUsages
  );

  return keyPair;
};

export const generateKeyPair = async (): Promise<{
  private: string;
  public: string;
}> => {
  const keyPair = await generateKeyPairRaw();

  const exportedPrivate = await exportPrivateKey(keyPair.privateKey);
  const exportedPublic = await exportPublicKey(keyPair.publicKey);

  return { private: exportedPrivate, public: exportedPublic };
};

export const sign = async (
  privateKey: CryptoKey,
  data: string
): Promise<string> => {
  const binaryDerString = window.atob(data);
  // convert from a binary string to an ArrayBuffer
  const ab = str2ab(binaryDerString);
  const s = await crypto.subtle.sign(algorithm, privateKey, ab);
  const str = ab2str(s);
  const b64 = window.btoa(str);

  return b64; //decoder.decode(s);
};

export const verify = async (
  publicKey: CryptoKey,
  signature: string,
  data: string
): Promise<boolean> => {
  const binaryDerString = window.atob(data);
  // convert from a binary string to an ArrayBuffer
  const ab = str2ab(binaryDerString);
  const binarySignature = window.atob(signature);
  const signatureAb = str2ab(binarySignature);
  const s = await crypto.subtle.verify(algorithm, publicKey, signatureAb, ab);

  return s;
};
