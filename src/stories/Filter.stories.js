import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Filter from "./../components/Filter";

storiesOf("Filter", module)
  .add("default", () =>
    <Filter
      onChange={action("onChange")}
      onRemove={action("onRemove")}
    />
  ).add("with presetted filter", () =>
    <Filter
      filter="all"
      onChange={action("onChange")}
      onRemove={action("onRemove")}
    />
  );
