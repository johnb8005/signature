import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout";
import App from "./main";
import Router from "./router";

ReactDOM.render(
  <Layout>
    <App />
    <Router />
  </Layout>,
  document.getElementById("root")
);
