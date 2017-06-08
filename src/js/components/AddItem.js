import React from 'react';
import PropTypes from 'prop-types';

export default function AddItem(props) {
    const { value, onChange, onAddItem } = props;
    return (
        <div>
            <input
                value={value}
                onChange={event => onChange(event.target.value)}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        onAddItem();
                    }
                }}
            />
        </div>
    )
}

AddItem.PropTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired
}

AddItem.defaultProps = {
    value: ''
}