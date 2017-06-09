import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Item from './Item';

export default function List(props) {
    const { items, onChange, onRemove } = props;

    const itemsList = items.map((item, index) => {
        const { value, checked } = item;
        return (
            <li key={index}>
                <Item
                    value={value}
                    checked={checked}
                    onChange={update => onChange(index, update)}
                    onRemove={() => onRemove(index)}
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