// @flow

import React from "react";
import PropTypes from "prop-types";

import Group from "retail-ui/components/Group";
import Button from "retail-ui/components/Button";
import type { FilterType } from "./../../domain/Filter";

type Props = {
  filter: string,
  onChange: (filter: FilterType) => void
};

export default function Filter(props: Props) {
  const { filter, onChange } = props;
  return (
    <Group>
      <Button active={filter === "all"} onClick={() => onChange("all")}>
        Все
      </Button>
      <Button active={filter === "active"} onClick={() => onChange("active")}>
        Несделанные
      </Button>
      <Button
        active={filter === "completed"}
        onClick={() => onChange("completed")}
      >
        Сделанные
      </Button>
    </Group>
  );
}

Filter.defaultProps = {
  onChange: () => {}
};
