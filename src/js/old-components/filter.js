/*import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Filter(props) {
    const options = props.options;
    const optionsList = Object.keys(options).map((item, index) => {
        const label = options[item].label;
        const isSelected = options[item].isSelected;
        return (
            <label key={index}>
                <input type="radio" name="filter" checked={isSelected} value={item} onChange={props.onChange} />
                {label}
            </label>
        )
    })

    return (
        <fieldset>
            <legend>Показать</legend>
            {optionsList}
        </fieldset>
    )
}

Filter.propTypes = {
    options: PropTypes.object
};*/