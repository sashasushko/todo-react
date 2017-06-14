import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Gapped from 'retail-ui/components/Gapped/Gapped';
import Item from './Item';

export default function List(props) {
    const { items, onChange, onRemove } = props;
    return (
        <Gapped
            gap={5}
            vertical={true}
        >
            {(items.length === 0) && <i style={{ lineHeight: '34px' }}>Список пуст</i>}
            {items.map(({ id, value, checked }) => (
                <Item
                    key={id}
                    value={value}
                    checked={checked}
                    onChange={update => onChange(id, update)}
                    onRemove={() => onRemove(id)}
                />
            ))}
        </Gapped>
    )
}

List.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
};

List.defaultProps = {
    items: [],
    onChange: () => { },
    onRemove: () => { }
};