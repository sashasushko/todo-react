import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToDo from '../src/js/components/ToDo';

const items = [
    {
        value: 'Проснуться',
        complited: true
    },
    {
        value: 'Съесть мягких французских булок',
        complited: false
    },
    {
        value: 'Съесть ещё этих мягких французских булок',
        complited: false
    }
];

storiesOf('ToDo', module)
    .add('Empty', () => (
        <ToDo />
    ))
    .add('With preseted new item', () => (
        <ToDo
            value='Съесть булок да выпить чаю'
        />
    ))
    .add('With items', () => (
        <ToDo
            items={items}
        />
    ))
    .add('With preseted new item and items', () => (
        <ToDo
            value='Да выпить чаю'
            items={items}
        />
    ));