//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
//https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a
import React from "react";
import * as U from "../crypto/symmetric/aes";

const secretKey = "rbdhrbserjvcejg3rbdhrbserjvcejg3"; // key size 256, string length = 256/8 = 32

export default () => {
  U.encryptCompact("hello7!", secretKey).then((x) => {
    console.log(x);
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
