import { downloadBlob } from "./utils";

const DownloadGeneratedKeyPair = ({
  publicKey,
  privateKey,
}: {
  publicKey: string;
  privateKey: string;
}) => {
  const handleDownloadKeyPair = () => {
    downloadBlob(publicKey, "public.txt", "text/plain");
    downloadBlob(privateKey, "private.txt", "text/plain");
  };

  return (
    <button
      className="btn btn-outline-secondary"
      type="button"
      id="button-addon1"
      onClick={handleDownloadKeyPair}
    >
      <i className="fa fa-key" /> Download Generated Keypair
    </button>
  );
};

export default DownloadGeneratedKeyPair;
