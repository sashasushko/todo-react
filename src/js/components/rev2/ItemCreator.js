import React from 'react';
import PropTypes from 'prop-types';

export default function ItemCreator(props) {
    const { value, onChange, onCreate } = props;
    return (
        <div>
            <input
                value={value}
                onChange={onChange && (event => onChange(event.target.value))}
                onKeyPress={onCreate && (event => {
                    if (event.key === 'Enter') {
                        onCreate();
                    }
                })}
            />
        </div>
    )
}

ItemCreator.PropTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
}

ItemCreator.defaultProps = {
    value: ''
}