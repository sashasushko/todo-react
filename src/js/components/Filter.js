import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Filter(props) {
    const { onChange } = props;
    return (
        <fieldset>
            <legend>Show</legend>
            <label>
                <input
                    type='radio'
                    name='filter'
                    defaultChecked={true}
                    onChange={() => onChange('all')}
                />All
            </label>
            <label>
                <input
                    type='radio'
                    name='filter'
                    onChange={() => onChange('active')}
                />Active
            </label>
            <label>
                <input
                    type='radio'
                    name='filter'
                    onChange={() => onChange('completed')}
                />Completed
            </label>
        </fieldset>
    )
}

Filter.propTypes = {
    onChange: PropTypes.func
};

Filter.defaultProps = {
    onChange: () => { }
};