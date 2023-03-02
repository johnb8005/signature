import {
  cipherStringToIvAndCipher,
  decrypt,
  deriveKey,
  settings,
} from "../crypto/asymmetric/ecc2";
import {  str2ab } from "../crypto/utils";

const downloadURL = (data: any, fileName: string) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = "none";
  a.click();
  a.remove();
};

export const downloadBlob = (
  data: BlobPart,
  fileName: string,
  mimeType: string
) => {
  const blob = new Blob([data], {
    type: mimeType,
  });

  const url = window.URL.createObjectURL(blob);

  downloadURL(url, fileName);
};

export const toDecrypt = async (
  privateKey: string,
  cipher: string
): Promise<{ decrypted: ArrayBuffer; filename: string; filetype: string }> => {
  const alicePrivateKey = await crypto.subtle.importKey(
    "pkcs8",
    str2ab(privateKey),
    settings.algorithm,
    settings.extractable,
    ["deriveKey"]
  );

  // upon receiving
  const { ctUint8, iv, publicKey, filename, filetype } =
    cipherStringToIvAndCipher(cipher);

  const bobPublicKey = await crypto.subtle.importKey(
    "raw",
    str2ab(publicKey),
    settings.algorithm,
    settings.extractable,
    []
  );
  const sharedKey = await deriveKey(alicePrivateKey, bobPublicKey);

  const decrypted = await decrypt(ctUint8, sharedKey, iv);

  return { decrypted, filename, filetype };
};