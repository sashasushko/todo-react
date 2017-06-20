import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Item from "./../components/Item";

storiesOf("Item", module)
  .add("default", () =>
    <Item
      value="Сходи туда, не знаю куда"
      onChange={action("onChange")}
      onRemove={action("onRemove")}
    />
  )
  .add("checked by default", () =>
    <Item
      value="Сходи туда, не знаю куда"
      checked={true}
      onChange={action("onChange")}
      onRemove={action("onRemove")}
    />
  )
  .add("editable by default", () =>
    <Item
      value="Сходи туда, не знаю куда"
      editable={true}
      onChange={action("onChange")}
    />
  )
  .add("checked and editable by default", () =>
    <Item
      value="Сходи туда, не знаю куда"
      checked={true}
      editable={true}
      onChange={action("onChange")}
    />
  );
