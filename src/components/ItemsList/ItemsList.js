// @flow
import React from "react";
import Gapped from "retail-ui/components/Gapped";
import Item from "./../Item/Item";
import type { ItemType } from "../../domain/Item";

// Как реализовать isRequared???

type Props = {
  items: ItemType[],
  onChange: (id: number, update: $Shape<ItemType>) => void,
  onRemove: (id: number) => void
};

export default function ItemsList(props: Props): React.Element<*> {
  const { items, onChange, onRemove } = props;

  return (
    <Gapped gap={20} vertical={true}>
      {items == null || (items.length === 0 && <i>Список пуст</i>)}
      {items != null &&
        items.map(item => {
          const { id, checked, value } = item;
          return (
            <Item
              key={id}
              id={id}
              value={value}
              checked={checked}
              onChange={checked => onChange(id, { checked })}
              onRemove={() => onRemove(id)}
            />
          );
        })}
    </Gapped>
  );
}
