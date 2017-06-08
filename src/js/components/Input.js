import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Input(props) {
    const { value, onChange, onBlur, onKeyDown, autofocus } = props;
    return (
        <input
            value={value}
            onChange={onChange && (event => onChange(event.target.value))}
            onBlur={onBlur && (event => onBlur(event.target.value))}
            onKeyDown={onKeyDown && (event => onKeyDown(event))}
            autoFocus={autofocus}
        />
    )
}