//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
//https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import React from "react";
import * as U from "../crypto/symmetric/aes";

const secretKey = "durbdhrbserjvcejg37fg3hcishfjkic"; // key size 256, string length = 256/8 = 32

export default () => {
  U.encryptCompact("hello7!", secretKey).then((x) => {
    console.log(x);
    const y =
      "18c9a475d6a8103069466e25e076b424:9e27d4764d01b8f113fd03204069030a"; // should match nexys/crypto - it does not
    U.decryptCompact(x, secretKey).then((e) => console.log(e));
  });

  return (
    <>
      <h1>Symmetric</h1>
      <code>{"rawKey"}</code>
      <code>Message: {"message"}</code>
    </>
  );
};
