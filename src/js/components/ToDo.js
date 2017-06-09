import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ItemCreator from './ItemCreator';
import Item from './Item';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    value: 'Some label',
                    checked: false
                }
            ],
            allChecked: false
        }
    }
    render() {
        const { items, allChecked } = this.state;
        const todoItemsList = items.map((item, index) => {
            const { value, checked } = item;
            return (
                <Item
                    key={index}
                    value={value}
                    checked={checked}
                    onChange={update => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                Object.assign(items[index], update),
                                ...items.slice(index + 1)
                            ]
                        });
                    }}
                    onRemove={() => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                ...items.slice(index + 1)
                            ]
                        });
                    }}
                />
            )
        });
        return (
            <div>
                <input
                    type='checkbox'
                    checked={allChecked}
                    onChange={() => {
                        const updatedItems = items.map(item => {
                            item.checked = !allChecked;
                            return item;
                        })
                        this.setState({
                            items: updatedItems,
                            allChecked: !allChecked
                        });
                    }}
                />
                <ItemCreator
                    onCreate={value => {
                        const newItem = {
                            value,
                            checked: false
                        };
                        this.setState({ items: [...items, newItem] });
                    }}
                />
                {todoItemsList}
            </div>
        )
    }
}