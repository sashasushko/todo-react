import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Input from "retail-ui/components/Input";

storiesOf("Input", module)
  .add("default", () => <Input />)
  .add("with placeholder", () =>
    <Input placeholder="Например: Сходить, куда глаза глядят" />
  )
  .add("with value", () => <Input value="Сходить, куда глаза глядят" />)
  .add("autofocused", () => <Input autoFocus={true} />);
