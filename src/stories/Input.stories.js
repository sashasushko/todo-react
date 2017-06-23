// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Input from "retail-ui/components/Input";

storiesOf("Input", module)
  .add("default", () => <Input value="" />)
  .add("with placeholder", () =>
    <Input value="" placeholder="Например: Сходить, куда глаза глядят" />
  )
  .add("with value", () => <Input value="Сходить, куда глаза глядят" />)
  .add("autofocused", () => <Input value="" autoFocus={true} />);
