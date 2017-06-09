import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Input from './Input';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatable: false,
            updatedValue: props.value
        }
    }
    render() {
        const { value, checked, onChange, onRemove } = this.props;
        const { updatable, updatedValue } = this.state;
        function updateValue() {
            const trimmedValue = updatedValue.trim();
            if (trimmedValue)
                onChange && onChange({ value: trimmedValue });
            else
                onRemove && onRemove();
            this.setState({ updatable: false });
        }
        return (
            <div>
                <Checkbox
                    checked={checked}
                    onChange={checked => onChange && onChange({ checked })}
                />
                {
                    !updatable && (
                        <span
                            onClick={() => this.setState({ updatable: true })}
                        >{value}</span>
                    )
                }
                {
                    updatable && (
                        <Input
                            value={updatedValue}
                            focus={updatable}
                            onChange={value => this.setState({ updatedValue: value })}
                            onBlur={() => updateValue.call(this)}
                            onKeyDown={key => {
                                if (key === 'Enter')
                                    updateValue.call(this);
                                if (key === 'Escape')
                                    this.setState({ updatable: false, updatedValue: value });
                            }}
                        />
                    )
                }
                <button
                    onClick={onRemove}
                >Удалить</button>
            </div>
        )
    }
}

Item.propTypes = {
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
};

Item.defaultProps = {
    checked: false
};