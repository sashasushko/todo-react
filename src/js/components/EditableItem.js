import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Input from './Input';

export default class EditableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: props.editable,
            updatedValue: props.value
        }
    }
    render() {
        const { value, checked, onChange, onRemove } = this.props;
        const { editable, updatedValue } = this.state;
        function updateValue() {
            const trimmedValue = updatedValue.trim();
            if (trimmedValue)
                onChange && onChange({ value: trimmedValue });
            else
                onRemove && onRemove();
            this.setState({ editable: false });
        }
        return (
            <div>
                <Checkbox
                    checked={checked}
                    onChange={checked => onChange && onChange({ checked })}
                />
                {
                    !editable && (
                        <span
                            onClick={onChange && (() => this.setState({ editable: true }))}
                        >{value}</span>
                    )
                }
                {
                    editable && (
                        <Input
                            value={updatedValue}
                            focus={editable}
                            onChange={value => this.setState({ updatedValue: value })}
                            onBlur={() => updateValue.call(this)}
                            onKeyDown={key => {
                                if (key === 'Enter')
                                    updateValue.call(this);
                                if (key === 'Escape')
                                    this.setState({ editable: false, updatedValue: value });
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

EditableItem.propTypes = {
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
};

EditableItem.defaultProps = {
    checked: false,
    editable: false
};