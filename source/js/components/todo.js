import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Input from './input.js';
import List from './list.js';
import Filter from './filter.js';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                all: {
                    label: 'Все',
                    isSelected: true
                },
                active: {
                    label: 'Выполненные',
                    isSelected: false
                },
                complite: {
                    label: 'Не выполненные',
                    isSelected: false
                }
            },
            items: {
                0: {
                    isComplited: false,
                    value: 'Попить чай'
                },
                1: {
                    isComplited: false,
                    value: 'Пообедать'
                },
                2: {
                    isComplited: false,
                    value: 'Прогуляться'
                }
            },
            allLength: 3,
            complitedLength: 0,
            allDone: false
        };
        this.changeItem = this.changeItem.bind(this);
        this.compliteAll = this.compliteAll.bind(this);
        this.resetCounters = this.resetCounters.bind(this);
    }

    changeItem(options) {
        const add = (value) => {
            this.setState((prevState) => {
                const oldItems = prevState.items;
                const newItemIndex = Object.keys(oldItems).length + 1;
                const newItem = {
                    [newItemIndex]: {
                        isComplited: false,
                        value: value
                    }
                };
                const newItems = Object.assign({}, oldItems, newItem);
                return {
                    items: newItems
                }
            });
        }
        const edit = (index, value) => {
            this.setState((prevState) => {
                const newItems = prevState.items;
                newItems[index].value = value;
                return {
                    items: newItems
                }
            });
        }
        const complite = (index) => {
            this.setState((prevState) => {
                const newItems = prevState.items;
                newItems[index].isComplited = !newItems[index].isComplited;
                return {
                    items: newItems
                }
            });
        }
        const remove = (index) => {
            this.setState((prevState) => {
                const newItems = prevState.items;
                delete newItems[index];
                return {
                    items: newItems
                }
            });
        }
        switch (options.action) {
            case 'submit':
                add(options.value);
                break;
            case 'edit':
                edit(options.index, options.value);
                break;
            case 'complite':
                complite(options.index);
                break;
            case 'remove':
                remove(options.index);
                break;
        }
        this.resetCounters();
    }

    compliteAll() {
        this.setState((prevState) => {
            const newItems = prevState.items;
            const compliteState = prevState.allDone ? false : true;
            Object.keys(newItems).forEach((index) => {
                newItems[index].isComplited = compliteState;
            });
            return {
                items: newItems,
                allDone: compliteState
            }
        });
        this.resetCounters();
    }

    resetCounters() {
        this.setState((prevState) => {
            const items = prevState.items;
            const itemsKeys = Object.keys(prevState.items);
            const allLength = itemsKeys.length;
            let complitedLength = 0;
            itemsKeys.forEach((index) => {
                items[index].isComplited && complitedLength++
            });
            const allDone = (allLength == complitedLength && allLength !== 0) ? true : false;
            return {
                allLength,
                complitedLength,
                allDone
            }
        });
    }

    render() {
        return (
            <div>
                <h1>ТуДу</h1>
                <input type="checkbox" checked={this.state.allDone} onChange={this.compliteAll} />
                <Input onSubmit={this.changeItem} />
                <List items={this.state.items} onChange={this.changeItem} />
                <span>
                    Осталось
                    {' '}
                    {this.state.allLength - this.state.complitedLength}
                </span>
            </div>
        );
    }
}