import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "./../style.less";
import Todo from "./../components/Todo/Todo";

const items = [
  {
    id: 0,
    value: "Сходить туда, не знаю куда",
    checked: true
  },
  {
    id: 1,
    value: "Принести то, не знаю что",
    checked: false
  }
];

storiesOf("Todo", module)
  .add("default", () => <Todo />)
  .add("with items", () => <Todo items={items} />)
  .add("with value for new item", () =>
    <Todo value="Сходить туда, не знаю куда" />
  )
  .add("with items and value for new item", () =>
    <Todo value="А не то мой меч — твоя голова с плеч" items={items} />
  );
