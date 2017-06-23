// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Checkbox from "retail-ui/components/Checkbox";

storiesOf("Checkbox", module)
  .add("default", () =>
    <Checkbox checked={false} onChange={action("onChange")}>
      Всё сделано
    </Checkbox>
  )
  .add("checked", () =>
    <Checkbox checked={true} onChange={action("onChange")}>
      Всё сделано
    </Checkbox>
  );
