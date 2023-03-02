interface RetrieveFileProps {
  onUpload: (f: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const RetrieveFile = ({ onUpload, onReset }: RetrieveFileProps) => {
  return (
    <>
      <h1>Retrieve File </h1>

      <input type="file" onChange={onUpload} />

      <button onClick={onReset} className="btn btn-secondary">
        Reset
      </button>
    </>
  );
};

export default RetrieveFile;
