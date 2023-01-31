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
export const deriveKey = async (alicePrivateKey: CryptoKey, bobPublicKey: CryptoKey): Promise<CryptoKey> => {
  return crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: bobPublicKey,
    },
    alicePrivateKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};



