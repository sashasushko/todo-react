import React from "react";
import PropTypes from "prop-types";

import Gapped from "retail-ui/components/Gapped";
import Item from "./../Item/Item";

export default function ItemsList(props) {
  const { items, onChange, onRemove } = props;
  return (
    <Gapped gap={20} vertical={true}>
      {items.length === 0 && <i>Список пуст</i>}
      {items.map(({ id, checked, value }) => {
        return (
          <Item
            key={id}
            id={id}
            value={value}
            checked={checked}
            onChange={event => onChange(id, { checked: event.target.checked })}
            onRemove={() => onRemove(id)}
          />
        );
      })}
    </Gapped>
  );
}

ItemsList.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

ItemsList.defaultProps = {
  items: [],
  onChange: () => {},
  onRemove: () => {}
};
