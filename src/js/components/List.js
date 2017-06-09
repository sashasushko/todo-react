import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import EditableItem from './EditableItem';

export default function List(props) {
    const { items, onChange, onRemove } = props;
    const itemsList = items.map((item, index) => {
        const { value, checked } = item;
        return (
            <li key={index}>
                <EditableItem
                    value={value}
                    checked={checked}
                    onChange={update => onChange && onChange(index, update)}
                    onRemove={() => onRemove && onRemove(index)}
                />
            </li>
        )
    });
    return (
        <ul>
            {itemsList}
        </ul>
    )
}

List.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
};

List.defaultProps = {
    items: []
};