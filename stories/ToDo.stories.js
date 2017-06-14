import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './../src/less/style.less';
import ToDo from './../src/js/components/ToDo';

const items = [
    {
        id: 0,
        value: 'Сходить туда, не знаю куда',
        checked: true,
    },
    {
        id: 1,
        value: 'Принести то, не знаю что',
        checked: false,
    }
];

storiesOf('ToDo', module)
    .add('default', () => (
        <ToDo />
    ))
    .add('with items', () => (
        <ToDo
            items={items}
        />
    ))
    .add('with placeholder', () => (
        <ToDo
            placeholder='Нужно сделать...'
        />
    ))
    .add('with value for new item', () => (
        <ToDo
            value='Сходить туда, не знаю куда'
        />
    ))
    .add('with items and value for new item', () => (
        <ToDo
            value='А не то мой меч — твоя голова с плеч'
            items={items}
        />
    ));