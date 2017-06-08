import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Button(props) {
    const { label, onClick } = props;
    return (
        <button
            onClick={onClick}
        >{label}</button>
    )
}