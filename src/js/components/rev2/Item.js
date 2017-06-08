import React from 'react';
import PropTypes from 'prop-types';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            editedValue: ''
        }
    }
    render() {
        const { editable, editedValue } = this.state;
        const { data, onChange, onRemove } = this.props;
        const { value, complited } = data;
        return (
            <div>
                {onChange && (
                    <input
                        type='checkbox'
                        value='on'
                        checked={complited}
                        onChange={onChange && (() => onChange({ complited: !complited }))}
                    />
                )}
                <span
                    onClick={event => this.setState({ editable: true })}
                >{value}</span>
                {editable && (
                    <input
                        defaultValue={value}
                        onChange={event => this.setState({ editedValue: event.target.value })}
                        onKeyDown={event => {
                            {/*if (event.key === 'Enter') {
                                onChange && onChange({ value: editedValue });
                            }
                            if (event.key === 'Escape') {
                                this.setState({ editable: false });
                            }*/}
                        }}
                        onBlur={event => {
                            {/*console.log(value, editedValue)*/}
                        }}
                    />
                )}
                {onRemove && (
                    <button
                        onClick={onRemove && (() => onRemove())}
                    >Удалить</button>
                )}
            </div>
        )
    }
}

Item.PropTypes = {
    data: PropTypes.shape({
        value: PropTypes.string,
        complited: PropTypes.bool
    }).isRequired,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
}