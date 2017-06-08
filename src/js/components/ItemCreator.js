import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Input from './Input';

export default class ItemCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }
    render(props) {
        const { value } = this.state;
        const { onCreate } = this.props;
        return (
            <div>
                <Input
                    value={value}
                    onChange={value => this.setState({ value })}
                    onKeyDown={event => {
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

ItemCreator.PropTypes = {
    value: PropTypes.string,
    onCreate: PropTypes.func
}

ItemCreator.defaultProps = {
    value: ''
}