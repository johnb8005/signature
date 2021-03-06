import React, { useState } from "react";

const ghUrl = "https://github.com/johnb8005/signature";
const sha = import.meta.env.SNOWPACK_PUBLIC_GIT_SHA || "arandomsha";
const ghUrlSha = `${ghUrl}/commit/${sha}`;

export default () => (
  <>
    <h1>Digital Signature</h1>
    <p>Use the menu to browse the different options</p>

    <p>
      <a href={ghUrl}>
        <i className="fa fa-code"></i> Source
      </a>
      &nbsp;available under MIT license. Contributions are welcome.
    </p>

    <p>
      <small>
        <a href={ghUrlSha}>{sha.slice(0, 15)}</a>
      </small>
    </p>
  </>
);
