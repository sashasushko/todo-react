import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ItemCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        const { value } = this.state;
        const { onCreate } = this.props;
        return (
            <div>
                <input
                    value={value}
                    onChange={event => this.setState({ value: event.target.value })}
                    onKeyPress={event => {
                        if (event.key === 'Enter' && value) {
                            onCreate(value);
                            this.setState({ value: '' });
                        }
                    }}
                />
            </div>
        )
    }
}