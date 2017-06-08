import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Checkbox(props) {
    const { checked, onChange } = props;
    return (
        <input
            type='checkbox'
            checked={checked}
            onChange={onChange && (event => onChange(event.target.checked))}
        />
    )
}