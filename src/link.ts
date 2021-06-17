export const links = {
  verify: { name: "Verify Signature", link: "/verify" },
  sign: { name: "Sign Content", link: "/sign" },
  generateKeyPair: {
    name: "Generate Public/Private key pair",
    link: "/generateKeyPair",
  },
  symmetric: {
    name: "Symmetric",
    link: "/symmetric",
  },
};

export const menus: { name: string; link: string }[] = Object.values(links);

export default links;
