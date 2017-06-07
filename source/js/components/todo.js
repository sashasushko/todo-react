import React from 'react';
import ReactDOM from 'react-dom';

import Input from './input.js';
import List from './list.js';

// ToDo
// - выделение всех дел
// - счётчик оставшихся
// - сортировка
// - оформление

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {
                1: {
                    isComplited: false,
                    value: 'Попить чай'
                },
                2: {
                    isComplited: false,
                    value: 'Пообедать'
                },
                3: {
                    isComplited: false,
                    value: 'Прогуляться'
                }
            }
        };
        this.addItem = this.addItem.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.changeComplite = this.changeComplite.bind(this);
        this.changeState = this.changeState.bind(this);
        this.setChanges = this.setChanges.bind(this);
    }

    addItem(value) {
        this.setState((prevState) => {
            const oldItems = prevState.items;
            const newItemIndex = Object.keys(oldItems).length + 1;
            const newItem = {
                [newItemIndex]: {
                    isComplited: false,
                    value:value
                }
            };
            const newItems = Object.assign({}, oldItems, newItem);
            return {
                items: newItems
            }
        });
    }

    changeValue(index, value) {
        this.setState((prevState) => {
            const items = prevState.items;
            items[index].value = value;
            return {
                items
            }
        });
    }

    changeComplite(index) {
        this.setState((prevState) => {
            const items = prevState.items;
            items[index].isComplited = !items[index].isComplited;
            return {
                items
            }
        });
    }

    changeState(index) {
        this.setState((prevState) => {
            const items = prevState.items;
            delete items[index];
            return {
                items
            }
        });
    }

    setChanges(options) {
        switch(options.action) {
            case 'complite':
                this.changeComplite(options.index);
                break;
            case 'edit':
                this.changeValue(options.index, options.value)
                break;
            case 'remove':
                this.changeState(options.index)
                break;
        }
    }

    render() {
        return (
            <div>
                <h1>ToDo</h1>
                <Input onSubmit={this.addItem} />
                <List items={this.state.items} onChange={this.setChanges} />
            </div>
        );
    }
}