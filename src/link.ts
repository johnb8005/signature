export const links = {
  verify: { name: "Verify Signature", link: "/verify" },
  sign: { name: "Sign Content", link: "/sign" },
  generateKeyPair: {
    name: "Generate Public/Private key pair",
    link: "/generateKeyPair",
  },
};

export const menus: { name: string; link: string }[] = Object.values(links);

export default links;