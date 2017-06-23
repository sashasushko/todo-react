import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

import "./style.less";

import Todo from "./components/Todo/Todo";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(Todo);

if (module.hot) {
  module.hot.accept("./components/Todo/Todo", () => {
    render(Todo);
  });
}
