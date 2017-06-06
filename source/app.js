import React from 'react';
import ReactDOM from 'react-dom';

/** Поле ввода */
class Input extends React.Component {
    /** Конструктор */
    constructor(props) {
        super(props);

        // Данные по умолчанию
        this.state = {
            value: props.value || '',
            index: props.index || null
        };

        // Байндим методы на this, чтобы не было проблем с контекстом
        this.submitItem = this.submitItem.bind(this);
        this.inputItem = this.inputItem.bind(this);
    }

    /**
     * Отправляет введённое значение в список
     */
    submitItem(event) {
        event.preventDefault();
        // Отправляем занчение в коллбек от компонента-родителя
        this.props.onSubmitItem(this.state.value, this.state.index);
        // Удаляем введённое значение после отправки
        this.setState({
            value: ''
        })
    }

    /**
     * Записывает введённое значение в стейт
     */
    inputItem(event) {
        // ToDo: добавить проверки на введённое значение
        this.setState({
            value: event.target.value
        });
    }

    /** Рендер */
    render() {
        return (
            <form onSubmit={this.submitItem}>
                <input type="text" value={this.state.value} onChange={this.inputItem} />
            </form>
        );
    }
}

/** Список дел */
function List(props) {
    // Создаем новый массив и разворачиваем его, чтобы новые пункты добавлялись сверху
    const reverseItems = props.items.slice().reverse();
    // Записываем длинну исходного массива, чтобы после проставить верные ключи
    const length = props.items.length;
    // Собираем пункты списка из нового массива
    const items = reverseItems.map((item, index, arr) => {
        console.log(length, index);
        // Вычисляем исходный ключ
        const key = length - index;
        return (
            <li key={key}>
                <span>{item}</span>
                <Input index={key} value={item} onSubmitItem={props.onEditItem} />
            </li>
        )
    });

    // Возвращаем готовый список
    return (
        <ul>{items}</ul>
    )
}

class ToDo extends React.Component {
    /** Конструктор */
    constructor(props) {
        super(props);

        // Данные по умолчанию
        this.state = {
            items: []
        };

        // Байндим методы на this, чтобы не было проблем с контекстом
        this.recordItem = this.recordItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    /**
     * Записываем значение в базу
     * @param {string} value
     */
    recordItem(value) {
        this.setState((prevState) => ({
            // ToDo: разобраться, что за именяемые данные
            items: prevState.items.concat(value)
        }));
    }

    /**
     * Изменяем значение в базе значение в базу
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

    render() {
        return (
            <div>
                <h1>ToDo</h1>
                <Input onSubmitItem={this.recordItem} />
                <List items={this.state.items} onEditItem={this.editItem} />
            </div>
        );
    }
}


ReactDOM.render(
    <ToDo />,
    document.getElementById('root')
);