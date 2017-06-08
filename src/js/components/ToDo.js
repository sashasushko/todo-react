import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ItemCreator from './ItemCreator';
import List from './List';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    label: 'Some label',
                    checked: true,
                    editable: false
                }
            ]
        }
    }
    render() {
        const { items } = this.state;
        return (
            <div>
                <ItemCreator
                    onCreate={(label) => {
                        const newItem = {
                            label,
                            checked: false,
                            editable: false
                        };
                        this.setState({ items: [...items, newItem] });
                    }}
                />
                <List
                    items={items}
                    onChange={(index, update) => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                Object.assign(items[index], update),
                                ...items.slice(index + 1)
                            ]
                        });
                    }}
                    onRemove={index => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                ...items.slice(index + 1)
                            ]
                        });
                    }}
                />
            </div>
        )
    }
}