import React from "react";

const T = () => {
  console.log("d");
  return <p>sdf</p>;
};

import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default () => {
  return (
    <Switch>
      <Route path={"/"} component={T} />
    </Switch>
  );
};
