import React from 'react';
import ReactDOM from 'react-dom';

/** Список дел */
export default function List(props) {
    // Создаем новый массив и разворачиваем его, чтобы новые пункты добавлялись сверху
    const reverseItems = props.items.slice().reverse();
    // Записываем длинну исходного массива, чтобы после проставить верные ключи
    const length = props.items.length;
    // Собираем пункты списка из нового массива
    const items = reverseItems.map((item, index, arr) => {
        // Вычисляем исходный ключ
        const key = length - index;
        return (
            <li key={key}>{item}</li>
        )
    });
    
    return (
        <ul>{items}</ul>
    );
}