export const ab2str = (buf: ArrayBuffer): string =>
  String.fromCharCode.apply(null, new Uint8Array(buf) as any);

/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
export const str2ab = (str: string): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

export const ab2str2 = (ctBuffer: ArrayBuffer): string => {
  const ctArray = Array.from(new Uint8Array(ctBuffer)); // ciphertext as byte array
  const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join(""); // ciphertext as string
  return btoa(ctStr);
};

export const generateLink = (
  content: string,
  publicKey: string | undefined,
  signature: string
) => {
  const q = window.btoa(JSON.stringify({ content, publicKey, signature }));

  return "?q=" + q;
};

export const toHexString = (s: Uint8Array) =>
  Array.from(s)
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("");

export const fromHex = (s: string): Uint8Array => {
  const prg = s.match(/.{2}/g)
  if (!prg) {
   return new Uint8Array()
  }
  const rg = prg.map((byte) => parseInt(byte, 16))
  return new Uint8Array(rg);
}

/*const strToUint8 = (s: string) => {
  const ctStr: string = atob(s); // decode base64
  return new Uint8Array(ctStr.match(/[\s\S]/g).map((ch) => ch.charCodeAt(0)));
};*/
