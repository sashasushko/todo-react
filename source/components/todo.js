import React from 'react';
import ReactDOM from 'react-dom';

import Input from './input.js';
import List from './list.js';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.changeListener = this.changeListener.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    addItem(value) {
        this.setState((prevState) => ({
            items: prevState.items.concat(value)
        }));
    }

    editItem() {}

    removeItem() {}

    changeListener() {}

    render() {
        return (
            <div>
                <h1>ToDo</h1>
                <Input onSubmit={this.addItem} />
                <List items={this.state.items} onChange={this.changeListener} />
            </div>
        );
    }
}