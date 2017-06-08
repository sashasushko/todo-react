import React from 'react';
import PropTypes from 'prop-types';

export default function Item(props) {
    const { index, data, onChange } = props;
    const { value, complited } = data;
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={complited}
                    value='on'
                    onChange={() => {
                        const update = {
                            complited: !complited
                        }
                        onChange(index, update);
                    }}
                />
                {value}
            </label>
        </div>
    )
}

Item.PropTypes = {
    index: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        value: PropTypes.string,
        complited: PropTypes.bool
    }).isRequired,
    onChange: PropTypes.func.isRequired
}