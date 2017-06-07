import React from 'react';

import Input from './Input';

export default class CreateNewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        const { onCreate } = this.props;
        return (
            <Input
                onChange={(value) => this.setState({ value })}
            />
            <button onClick={() => }></button>
        )
    }
}