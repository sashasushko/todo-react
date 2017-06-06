import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ListItem from './listItem.js';

export default function List(props) {
    const listItems = props.items.map((value, index) => (
        <li key={index}>
            <ListItem index={index} value={value} onChange={props.onChange} />
        </li>
    ));

    return (
        <ul>
            {listItems}
        </ul>
    )
}

List.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func
};

List.defaultProps = {
    items: []
}