import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ListItem from './listItem.js';

export default function List(props) {
    const listItems = Object.keys(props.items).map((index) => {
        const key = Number(index);
        const value = props.items[index].value;
        const isComplited = props.items[index].isComplited;
        return (
            <li key={key}>
                <ListItem index={key} value={value} isComplited={isComplited} onChange={props.onChange} />
            </li>
        )
    })
    return (
        <ul>
            {listItems}
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