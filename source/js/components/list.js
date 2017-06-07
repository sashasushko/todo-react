import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Item from './item.js';

export default function List(props) {
    const itemsList = Object.keys(props.items).map((item, index) => {
        const value = props.items[item].value;
        const isComplited = props.items[item].isComplited;
        return (
            <li key={index}>
                <Item index={index} value={value} isComplited={isComplited} onChange={props.onChange} />
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
}