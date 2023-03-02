import { downloadBlob, toDecrypt } from "./utils";

const RetrieveFile = ({
  onReset,
  privateKey,
}: {
  onReset: () => void;
  privateKey: string;
}) => {
  const handleUpload = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target;

    if (files === null) {
      throw Error("files is null");
    }

    if (files.length === 0) {
      throw Error("files array is empty");
    }

    const [file] = files;

    const cipher = await file.text();

    const { decrypted, filename, filetype } = await toDecrypt(
      privateKey,
      cipher
    );

    downloadBlob(decrypted, filename, filetype);
    onReset();
  };

  return (
    <>
      <h1>Retrieve File </h1>

      <input type="file" onChange={handleUpload} />

      <button onClick={onReset} className="btn btn-secondary">
        Reset
      </button>
    </>
  );
};

export default RetrieveFile;
