/*import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Item from './item.js';

export default function List(props) {
    const items = props.items;
    const itemsList = Object.keys(props.items).map((item) => {
        const index = Number(item);
        const value = items[item].value;
        const isComplited = items[item].isComplited;
        return (
            <li key={index}>
                <Item index={item} value={value} isComplited={isComplited} onChange={props.onChange} />
            </li>
        )
    })
    return (
        <ul>
            {itemsList}
        </ul>
    )
}

List.propTypes = {
    items: PropTypes.object,
    onChange: PropTypes.func
};

List.defaultProps = {
    items: {}
}*/