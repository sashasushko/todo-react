import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./style.less";
import Todo from "./components/Todo";

ReactDOM.render(
  <BrowserRouter>
    <Todo />
  </BrowserRouter>,
  document.getElementById("root")
);
