import * as E from "./ecc";
import {test, expect} from 'vitest'
/*import * as U from "util";

global.TextEncoder = U.TextEncoder;
global.TextDecoder = U.TextDecoder;*/

test("gen", async () => {
  const keys = await E.generateKeyPair();

  console.log(keys)

  expect(true).toEqual(true);
});
