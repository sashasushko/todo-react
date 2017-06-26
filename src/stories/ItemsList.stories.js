// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import StoryRouter from "storybook-router";

import ItemsList from "./../components/ItemsList/ItemsList";

const items = [
  {
    id: 0,
    checked: true,
    value: "Сходить туда, не знаю куда"
  },
  {
    id: 1,
    checked: false,
    value: "Принести то, не знаю что"
  }
];

storiesOf("Items List", module)
  .addDecorator(StoryRouter())
  .add("default", () =>
    <ItemsList
      items={[]}
      onChange={action("onChange")}
      onEditRequest={action("onEditRequest")}
      onRemove={action("onRemove")}
    />
  )
  .add("with items", () =>
    <ItemsList
      items={items}
      onChange={action("onChange")}
      onEditRequest={action("onEditRequest")}
      onRemove={action("onRemove")}
    />
  );
