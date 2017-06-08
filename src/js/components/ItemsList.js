import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

export default function ItemsList(props) {
    const { items, onChange } = props;
    const itemsList = items.map((data, index) => {
        return (
            <li key={index}>
                <Item
                    index={index}
                    data={data}
                    onChange={onChange}
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
    onChange: PropTypes.func.isRequired
}

ItemsList.defaultProps = {
    items: []
}