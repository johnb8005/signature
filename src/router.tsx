import React from "react";
import { Route, Switch } from "react-router-dom";
import { links } from "./link";

import Home from "./home";
import Verify from "./verify";
import GenerateKeyPair from "./generate";
import Sign from "./sign";

import InitFileTransfer from "./file-transfer/index";
import FileTransferUpload from "./file-transfer/upload";

const NotFound = () => (
  <p>
    <i>Page Not Found</i>
  </p>
);

export default () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />
      <Route path={links.verify.link} component={Verify} />
      <Route path={links.generateKeyPair.link} component={GenerateKeyPair} />
      <Route path={links.sign.link} component={Sign} />
      <Route path={links.symmetric.link} component={FileTransferUpload} />
      <Route path={links.initFileTransfer.link} component={InitFileTransfer} />
      <Route
        path={links.createFileTransfer.link}
        component={FileTransferUpload}
      />
      <Route component={NotFound} />
    </Switch>
  );
};
