import * as U from "../crypto/symmetric/aes";

const secretKey = "durbdhrbserjvcejg37fg3hcishfjkic"; // key size 256, string length = 256/8 = 32

U.encryptCompact("hello7!", secretKey).then((x) => {
  console.log(x);
  const y = "18c9a475d6a8103069466e25e076b424:9e27d4764d01b8f113fd03204069030a"; // should match nexys/crypto - it does not
  U.decryptCompact(x, secretKey).then((e) => console.log(e));
});
