import React from "react";
import * as Crypto from "../crypto/ecc";
import * as UI from "../util-ui";

const Content = ({ data }: { data: { public: string; private: string } }) => {
  const d = new Date();
  return (
    <>
      <p>
        <i>
          Generated {d.toLocaleDateString()} at {d.toLocaleTimeString()}
        </i>
      </p>
      <p>
        Private <UI.Copy content={data.private} />
      </p>
      <pre>{data.private}</pre>

      <p>
        Public <UI.Copy content={data.public} />
      </p>
      <pre>{data.public}</pre>
    </>
  );
};

export default () => (
  <>
    <h1>Generate Public-Private Key Pair</h1>
    <UI.withLoader<{ public: string; private: string }>
      promise={Crypto.generateKeyPair}
      Component={Content}
    />
  </>
);
