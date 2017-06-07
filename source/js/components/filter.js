import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Filter(props) {
    const options = props.options;
    const optionsList = Object.keys(options).map((item, index) => {
        const value = options[item].value;
        const isSelected = options[item].isSelected;
        return (
            <label key={index}>
                <input type="radio" name="filter" defaultChecked={isSelected} value={item} />
                {value}
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
};