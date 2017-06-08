import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

export default function ItemsList(props) {
    const { items, onChange, onRemove } = props;
    const itemsList = items.map((data, index) => {
        return (
            <li key={index}>
                <Item
                    data={data}
                    onChange={onChange && ((update) => onChange(index, update))}
                    onRemove={onRemove && (() => onRemove(index))}
                />
            </li>
        )
    });
    return (
        items.length ? <ul>{itemsList}</ul> : <p><i>Всё сделано. Вы молодец</i></p>
    )
}

ItemsList.PropTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
}

ItemsList.defaultProps = {
    items: []
}