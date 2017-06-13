import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Item from './Item';

export default function List(props) {
    const { items, onChange, onRemove } = props;

    const itemsList = items.map((item) => {
        const { id, value, checked } = item;
        return (
            <li key={id}>
                <Item
                    value={value}
                    checked={checked}
                    onChange={update => onChange(id, update)}
                    onRemove={() => onRemove(id)}
                />
            </li>
        )
    });
    return (
        <div>
            <ul>
                {itemsList}
            </ul>
        </div>
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