import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Input(props) {
    const { value, placeholder, autoFocus, onChange, onBlur, onKeyDown } = props;
    return (
        <input
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={event => onChange(event.target.value)}
            onBlur={event => onBlur(event.target.value)}
            onKeyDown={event => onKeyDown(event.key)}
        />
    )
}

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

Input.defaultProps = {
    value: '',
    placeholder: '',
    autoFocus: false,
    onChange: () => {},
    onBlur: () => {},
    onKeyDown: () => {}
};