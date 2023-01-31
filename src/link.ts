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
  initFileTransfer: {
    name: "Initiate File Transfer",
    link: "/init-file-transfer",
  },
  createFileTransfer: {
    name: "Create File Transfer",
    link: "/create-file-transfer",
  },
};

export const menus: { name: string; link: string }[] = Object.values(links);

export default links;
