import React, { useState } from "react";
import { github } from "./config";

export default () => (
  <>
    <h1>Digital Signature</h1>
    <p>Use the menu to browse the different options</p>

    <p>
      <a href={github.url}>
        <i className="fa fa-code"></i> Source
      </a>
      &nbsp;available under MIT license. Contributions are welcome.
    </p>

    <p>
      <small>todo</small>
    </p>
  </>
);
