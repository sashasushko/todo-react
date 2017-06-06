import React from 'react';
import ReactDOM from 'react-dom';

import Input from './input.js';
import List from './list.js';

/** Список дел */
export default class ToDo extends React.Component {
    /** Конструктор */
    constructor(props) {
        super(props);

        // Данные по умолчанию
        this.state = {
            items: []
        };

        // Байндим методы на this, чтобы не было проблем с контекстом
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    /**
     * Записывает значение
     * @param {string} value
     */
    addItem(value) {
        this.setState((prevState) => ({
            // ToDo: разобраться, что за "изменяемые данные"
            items: prevState.items.concat(value)
        }));
    }

    /**
     * Изменяет значение
     * @param {number} key
     * @param {string} value
     */
    editItem(value, key) {
        this.setState((prevState) => {
            const items = prevState.items;
            // ToDo: разобраться, почему key раздаётся с единицы
            const index = key - 1;
            items[index] = value;
            return {
                items: items
            }
        });
    }

    /**
     * Удаляет значение
     * @param {number} key
     */
    removeItem(key) {}

    /** Рендер */
    render() {
        return (
            <div>
                <h1>ToDo</h1>
                <Input placehodler="Например, купить хлеб" clear={true} onSubmit={this.addItem} />
                <List items={this.state.items} onAddItem={this.addItem} onEditItem={this.editItem} onRemoveItem={this.removeItem} />
            </div>
        );
    }
}