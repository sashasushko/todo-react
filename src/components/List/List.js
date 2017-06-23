import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./List.less";

import Gapped from "retail-ui/components/Gapped";
import Item from "../Item/Item";

export default function List(props) {
  const { items, onChange, onRemove } = props;
  return (
    <Gapped gap={5} vertical={true}>
      {items.length === 0 && <i className={styles.noResults}>Список пуст</i>}
      {items.map(({ id, value, checked }) =>
        <Item
          key={id}
          id={id}
          value={value}
          checked={checked}
          onChange={update => onChange(id, update)}
          onRemove={() => onRemove(id)}
        />
      )}
    </Gapped>
  );
}

List.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

List.defaultProps = {
  items: [],
  onChange: () => {},
  onRemove: () => {}
};
