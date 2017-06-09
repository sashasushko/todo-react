import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Input(props) {
    const { value, focus, onChange, onBlur, onKeyDown } = props;
    return (
        <input
            value={value}
            autoFocus={focus}
            onChange={event => onChange && onChange(event.target.value)}
            onBlur={event => onBlur && onBlur(event.target.value)}
            onKeyDown={event => onKeyDown && onKeyDown(event.key)}
        />
    )
}

Input.propTypes = {
    value: PropTypes.string,
    focus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

Input.defaultProps = {
    value: '',
    focus: false
};