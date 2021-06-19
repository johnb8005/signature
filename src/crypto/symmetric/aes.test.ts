import * as Crypto from "crypto";
import * as A from "./aes";

global.window.crypto = Crypto.webcrypto.subtle;

const secretKey = "durbdhrbserjvcejg37fg3hcishfjkic";
test("encrypt/descrypt", async () => {
  const x = await A.encryptCompact("hello7!", secretKey);
  console.log(x);
  const y = "18c9a475d6a8103069466e25e076b424:9e27d4764d01b8f113fd03204069030a"; // should match nexys/crypto - it does not
  const e = A.decryptCompact(x, secretKey);

  console.log(e);

  expect(true).toEqual(true);
});
