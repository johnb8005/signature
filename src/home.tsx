import React, { useState } from "react";

const ghUrl = "https://github.com/johnb8005/signature";

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
  </>
);
