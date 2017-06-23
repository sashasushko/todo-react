import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "retail-ui/components/Button";

storiesOf("Button", module)
  .add("default", () =>
    <Button
      onChange={action("onChange")}
    >Всё сделано</Button>
  )
  .add("active", () =>
    <Button
      active={true}
      onChange={action("onChange")}
    >Всё сделано</Button>
  );
