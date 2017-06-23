import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import StoryRouter from "storybook-router";

import Item from "./../components/Item";

storiesOf("Item", module)
  .addDecorator(StoryRouter())
  .add("default", () =>
    <Item
      id={0}
      value="Сходи туда, не знаю куда"
      onChange={action("onChange")}
      onEditRequest={action("onEditRequest")}
      onRemove={action("onRemove")}
    />
  )
  .add("checked", () =>
    <Item
      id={0}
      value="Сходи туда, не знаю куда"
      checked={true}
      onChange={action("onChange")}
      onEditRequest={action("onEditRequest")}
      onRemove={action("onRemove")}
    />
  )
  .add("removable", () =>
    <Item
      id={0}
      value="Сходи туда, не знаю куда"
      removable={true}
      onChange={action("onChange")}
      onEditRequest={action("onEditRequest")}
      onRemove={action("onRemove")}
    />
  );
