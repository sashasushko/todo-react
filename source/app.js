import React from 'react';
import ReactDOM from 'react-dom';

/** Поле ввода */
class Input extends React.Component {
    /** Конструктор */
    constructor(props) {
        super(props);
   
        // Данные по умолчанию
        this.state = {
            value: ''
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
        this.props.onSubmitItem(this.state.value);
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
                <input type="text" placeholder="Например, купить хлеба" value={this.state.value} onChange={this.inputItem} />
            </form>
        );
    }
}

class ToDo extends React.Component {
    constructor(props) {
        super(props);
   
        // Байндим методы на this, чтобы не было проблем с контекстом
        this.recordItem = this.recordItem.bind(this);
    }
   
    /**
     * Записываем значение в базу
     * @param {string} value
     */
    recordItem(value) {
        console.log('"' + value + '" recorded');
        // ToDo: разобраться, в каком виде удобнее писать в стейт
    }

    render() {
        return (
            <div>
                <h1>ToDo</h1>
                <Input onSubmitItem={this.recordItem} />
            </div>
        );
    }
}


ReactDOM.render(
    <ToDo />,
    document.getElementById('root')
);