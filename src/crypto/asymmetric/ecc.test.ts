import * as E from "./ecc";
import * as Crypto from "crypto";
/*import * as U from "util";

global.TextEncoder = U.TextEncoder;
global.TextDecoder = U.TextDecoder;*/

global.window = { crypto: new Crypto.SubtleCrypto() };

test("gen", async () => {
  const keys = await E.generateKeyPair();

  expect(true).toEqual(true);
});
