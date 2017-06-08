import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EditableItem from './EditableItem';

export default function List(props) {
    const { items, onChange, onRemove } = props;
    const listItems = items.map((item, index) => {
        return (
            <div key={index}>
                <EditableItem
                    item={item}
                    onChange={onChange && ((update) => onChange(index, update))}
                    onRemove={onRemove && (() => onRemove(index))}
                />
            </div>
        )
    });
    return (
        <div>
            {listItems}
        </div>
    )
}