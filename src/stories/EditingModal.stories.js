import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import EditingModal from "./../components/EditingModal";

storiesOf("Editing Modal", module)
  .add("default", () =>
    <EditingModal
      value="Принести то, не знаю что"
      onClose={action("onClose")}
      onSubmit={action("onSubmit")}
    />
  );
