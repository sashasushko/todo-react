import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Filter from "./../components/Filter";

storiesOf("Filter", module).add("default", () =>
  <Filter filter="all" onChange={action("onChange")} />
);
