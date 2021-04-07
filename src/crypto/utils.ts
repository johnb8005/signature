export const ab2str = (buf: ArrayBuffer) =>
  String.fromCharCode.apply(null, new Uint8Array(buf));

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

export const generateLink = (
  content: string,
  publicKey: string,
  signature: string
) => {
  const q = window.btoa(JSON.stringify({ content, publicKey, signature }));

  return "?q=" + q;
};
