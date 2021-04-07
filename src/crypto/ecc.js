const ab2str = (buf) => String.fromCharCode.apply(null, new Uint8Array(buf));
export const exportKey = async (key, format, publicPrivate) => {
  const exported = await window.crypto.subtle.exportKey(format, key);
  const str = ab2str(exported);
  const b64 = window.btoa(str);
  const sep = "-".repeat(5);
  return [
    sep + `BEGIN ${publicPrivate} KEY` + sep,
    b64,
    sep + `END ${publicPrivate} KEY` + sep
  ].join("\n");
};
export const exportPrivateKey = async (privateKey) => exportKey(privateKey, "pkcs8", "PRIVATE");
export const exportPublicKey = async (publicKey) => exportKey(publicKey, "spki", "PUBLIC");
export const generateKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey({
    name: "ECDSA",
    namedCurve: "P-384"
  }, true, ["sign", "verify"]);
  const exportedPrivate = await exportPrivateKey(keyPair.privateKey);
  const exportedPublic = await exportPublicKey(keyPair.publicKey);
  console.log({
    keyPair,
    exportedPrivate,
    exportedPublic
  });
};
