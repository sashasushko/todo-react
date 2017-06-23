// @flow

import React from "react";

import Gapped from "retail-ui/components/Gapped";
import Item from "./../Item/Item";

type Props = {
  // ??? (когда ставишь вопрос)
  items: Array<Object>,
  // --------------------------- ???
  onChange: (id: number, update: Object) => void,
  onRemove: (id: number) => void
};

export default function ItemsList(props: Props): React.Element<*> {
  const { items, onChange, onRemove } = props;

  return(
    <Gapped gap= { 20} vertical= { true}>
  { items.length === 0 && <i>Список пуст</i> }
{
  items.map(item => {
    const { id, checked, value }: { id: number, checked: boolean, value: string } = item;
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
  })
}
    </Gapped >
  );
}

ItemsList.defaultProps = {
  items: [],
  onChange: () => { },
  onRemove: () => { }
};
