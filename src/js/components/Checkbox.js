import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Checkbox(props) {
    const { checked, label, onChange } = props;
    return (
        <label>
            <input
                type='checkbox'
                label={label}
                checked={checked}
                onChange={event => onChange(event.target.checked)}
            />
            {label}
        </label>
    )
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    checked: false,
    label: '',
    onChange: () => {}
};