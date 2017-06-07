import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            placeholder: props.placeholder,
            clearAfterSubmit: props.clearAfterSubmit || false,
        };

        this.submitValue = this.submitValue.bind(this);
        this.inputValue = this.inputValue.bind(this);
    }

    submitValue(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
        this.state.clearAfterSubmit && this.setState({ value: '' })
    }

    inputValue(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.submitValue}>
                <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.inputValue} />
            </form>
        );
    }
}

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    clearAfterSubmit: PropTypes.bool,
    onSubmit: PropTypes.func
};

Input.defaultProps = {
    value: '',
    placeholder: '',
    clearAfterSubmit: true
}