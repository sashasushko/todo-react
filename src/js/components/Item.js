import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Gapped from '../../../node_modules/retail-ui/components/Gapped/Gapped';
import Checkbox from '../../../node_modules/retail-ui/components/Checkbox/Checkbox';
import Input from '../../../node_modules/retail-ui/components/Input/Input';
import Link from '../../../node_modules/retail-ui/components/Link/Link';

export default class Item extends React.Component {
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
            <Gapped
                gap={20}
            >
                <div>
                    <Checkbox
                        checked={checked}
                        onChange={event => onChange({ checked: event.target.checked })}
                    />
                    {
                        !editable && (
                            <span
                                style={{ lineHeight: '34px' }}
                                width='auto'
                                onClick={() => this.setState({ editable: true })}
                            >{value}</span>
                        )
                    }
                    {
                        editable && (
                            <Input
                                type='text'
                                value={value}
                                autoFocus={true}
                                onChange={event => this.setState({ value: event.target.value })}
                                onBlur={() => this.updateItemValue()}
                                onKeyDown={event => this.handleInputKeyDown(event.key)}
                            />
                        )
                    }
                </div>
                <Link
                    use='danger'
                    icon='remove'
                    onClick={onRemove}
                >Удалить</Link>
            </Gapped>
        )
    }
}

Item.propTypes = {
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
};

Item.defaultProps = {
    checked: false,
    editable: false,
    onChange: () => { },
    onRemove: () => { }
};