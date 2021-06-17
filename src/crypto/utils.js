export const ab2str = (buf) => String.fromCharCode.apply(null, new Uint8Array(buf));
export const str2ab = (str) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};
export const ab2str2 = (ctBuffer) => {
  const ctArray = Array.from(new Uint8Array(ctBuffer));
  const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join("");
  return btoa(ctStr);
};
export const generateLink = (content, publicKey, signature) => {
  const q = window.btoa(JSON.stringify({content, publicKey, signature}));
  return "?q=" + q;
};
export const toHexString = (s) => Array.from(s).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
export const fromHex = (s) => new Uint8Array(s.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
