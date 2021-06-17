import * as E from "./ecc";

/*import * as U from "util";

global.TextEncoder = U.TextEncoder;
global.TextDecoder = U.TextDecoder;*/

test("gen", async () => {
  const keys = await E.generateKeyPair();

  expect(true).toEqual(true);
});
