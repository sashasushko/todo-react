/*import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.submitValue = this.submitValue.bind(this);
        this.inputValue = this.inputValue.bind(this);
    }

    submitValue(event) {
        event.preventDefault();
        this.props.onSubmit({
            action: 'submit',
            value: this.state.value
        });
        this.props.clearAfterSubmit && this.setState({ value: '' })
    }

    inputValue(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.submitValue}>
                <input type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this.inputValue} />
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
}*/