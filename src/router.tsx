import React from "react";
import { Route, Switch } from "react-router-dom";
import { links } from "./link";

import Home from "./home";
import Verify from "./verify";
import GenerateKeyPair from "./generate";
import Sign from "./sign";

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
      <Route component={NotFound} />
    </Switch>
  );
};
