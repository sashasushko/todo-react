import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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
        return (
            <div>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={event => onChange({ checked: event.target.checked })}
                />
                {!updatable && (
                    <span
                        onClick={() => this.setState({ updatable: true })}
                    >{value}</span>
                )}
                {updatable && (
                    <input
                        value={updatedValue}
                        autoFocus={updatable}
                        onChange={event => this.setState({ updatedValue: event.target.value })}
                        onBlur={() => {
                            if (updatedValue) {
                                onChange({ value: updatedValue });
                            } else {
                                onRemove();
                            }
                            this.setState({ updatable: false });
                        }}
                        onKeyPress={event => {
                            if (event.key !== 'Enter') {
                                return;
                            }
                            if (updatedValue) {
                                onChange({ value: updatedValue });
                            } else {
                                onRemove();
                            }
                            this.setState({ updatable: false });
                        }}
                        onKeyDown={event => {
                            if (event.key === 'Escape') {
                                this.setState({
                                    updatable: false,
                                    updatedValue: value
                                });
                            }
                        }}
                    />
                )}
                <button
                    onClick={onRemove}
                >Удалить</button>
            </div>
        )
    }
}