import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import List from "./../components/List/List";

const items = [
  {
    id: 0,
    value: 'Read "Clean Code"',
    checked: true
  },
  {
    id: 1,
    value: "Write clean code",
    checked: false
  }
];

storiesOf("List", module)
  .add("default", () =>
    <List onChange={action("onChange")} onRemove={action("onRemove")} />
  )
  .add("with items", () =>
    <List
      items={items}
      onChange={action("onChange")}
      onRemove={action("onRemove")}
    />
  );
