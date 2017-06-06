import React from 'react';
import ReactDOM from 'react-dom';

/** Поле ввода */
export default class Input extends React.Component {
    /** Конструктор */
    constructor(props) {
        super(props);

        // Данные по умолчанию
        // ToDo: заменить на Object.assign
        this.state = {
            placeholder: props.placeholder || '',
            value: props.value || '',
            clear: props.clear || false,
        };

        // Байндим методы на this, чтобы не было проблем с контекстом
        this.submitItem = this.submitItem.bind(this);
        this.inputItem = this.inputItem.bind(this);
    }

    /** Отправляет введённое значение */
    submitItem(event) {
        event.preventDefault();
        // Отправляем значение в коллбек от компонента-родителя
        this.props.onSubmit(this.state.value);
        // Удаляем введённое значение после отправки, если передан соотв. флаг
        this.state.clear && this.setState({ value: '' })
    }

    /** Записывает введённое значение в стейт */
    inputItem(event) {
        // ToDo: добавить проверки на ввод запрещёнки
        this.setState({
            value: event.target.value
        });
    }

    /** Рендер */
    render() {
        return (
            <form onSubmit={this.submitItem}>
                <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.inputItem} />
            </form>
        );
    }
}