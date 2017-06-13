import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Input from './Input';

export default class EditableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            editable: props.editable
        }
    }

    updateItemValue() {
        const { onChange, onRemove } = this.props;
        const { value } = this.state;

        if (value.trim())
            onChange({ value: value.trim() });
        else
            onRemove();
        this.setState({ editable: false });
    }

    handleInputKeyDown(key) {
        const { value } = this.props;

        if (key === 'Enter')
            this.updateItemValue();
        if (key === 'Escape')
            this.setState({ editable: false, value });
    }

    render() {
        const { checked, onChange, onRemove } = this.props;
        const { value, editable } = this.state;

        return (
            <div>
                <Checkbox
                    checked={checked}
                    onChange={checked => onChange({ checked })}
                />
                {
                    !editable && (
                        <span
                            onClick={() => this.setState({ editable: true })}
                        >{value}</span>
                    )
                }
                {
                    editable && (
                        <Input
                            value={value}
                            autoFocus={true}
                            onChange={value => this.setState({ value })}
                            onBlur={() => this.updateItemValue()}
                            onKeyDown={key => this.handleInputKeyDown(key)}
                        />
                    )
                }
                <button
                    onClick={onRemove}
                >Remove</button>
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
    editable: false,
    onChange: () => { },
    onRemove: () => { }
};