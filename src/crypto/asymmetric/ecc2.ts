// made with chatGPT
// and https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
const algoSymName = "AES-GCM";

export const settings: Pick<CryptoKey, "extractable" | "usages"> & {
  algorithm: any;
} = {
  algorithm: {
    name: "ECDH",
    namedCurve: "P-384",
  },
  extractable: true,
  usages: ["deriveKey"],
};

export const createKeyPair = (): Promise<CryptoKeyPair> =>
  crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-384",
    },
    true,
    ["deriveKey"]
  );

// Generate Alice's private key
export const deriveKey = async (
  alicePrivateKey: CryptoKey,
  bobPublicKey: CryptoKey
): Promise<CryptoKey> => {
  return crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: bobPublicKey,
    },
    alicePrivateKey,
    {
      name: algoSymName,
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

export const encrypt = async (
  uintMessage: Uint8Array,
  sharedSecretKey: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> => {
  const encryptedMessage = await crypto.subtle.encrypt(
    {
      name: algoSymName,
      iv,
    },
    sharedSecretKey,
    uintMessage
  );

  return encryptedMessage;
};

export const toCipherString = (
  ctBuffer: ArrayBuffer,
  iv: Uint8Array,
  filename: string,
  filetype: string,
  publicKey: string
): string => {
  const ctArray: number[] = Array.from(new Uint8Array(ctBuffer)); // ciphertext as byte array
  const ctStr: string = ctArray
    .map((byte) => String.fromCharCode(byte))
    .join(""); // ciphertext as string
  const ivStr: string = Array.from(iv)
    .map((b) => String.fromCharCode(b))
    .join(""); // iv as utf-8 string

  return [
    filename.replace(/_/g, "%5F"),
    filetype.replace(/_/g, "%5F"),
    publicKey,
    btoa(ivStr + ctStr),
  ].join("_");
};

export const cipherStringToIvAndCipher = (
  input: string
): {
  iv: Uint8Array;
  ctUint8: Uint8Array;
  filename: string;
  filetype: string;
  publicKey: string;
} => {
  const [filename, filetype, publicKey, ciphertext] = input.split("_");

  const decoded: string = atob(ciphertext);

  const ivStr = decoded.slice(0, 12); // decode base64 iv
  const iv = new Uint8Array(Array.from(ivStr).map((ch) => ch.charCodeAt(0))); // iv as Uint8Array
  const ctStr = decoded.slice(12); // decode base64 ciphertext
  const ctUint8 = new Uint8Array(
    Array.from(ctStr).map((ch) => ch.charCodeAt(0))
  );

  return {
    ctUint8,
    iv,
    filename: decodeURIComponent(filename),
    filetype: decodeURIComponent(filetype),
    publicKey,
  };
};

export const decrypt = async (
  encryptedMessage: ArrayBuffer,
  sharedSecretKey: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> => {
  // Decrypt the message

  const decryptedMessage = await crypto.subtle.decrypt(
    {
      name: algoSymName,
      iv,
    },
    sharedSecretKey,
    encryptedMessage
  );

  return decryptedMessage;
};
