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
    render() {
        const { value } = this.state;
        const { onCreate } = this.props;
        return (
            <div>
                <Input
                    value={value}
                    onChange={value => this.setState({ value })}
                    onKeyDown={key => {
                        if (key === 'Enter' && value.trim()) {
                            onCreate && onCreate(value);
                            this.setState({ value: '' });
                        }
                    }}
                />
            </div>
        )
    }
}

ItemCreator.propTypes = {
    value: PropTypes.string,
    onCreate: PropTypes.func
};

ItemCreator.defaultProps = {
    value: ''
};