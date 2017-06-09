import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToDo from '../src/js/components/ToDo';

const items = [
    {
        value: 'Read "Clean Code"',
        checked: true,
    },
    {
        value: 'Write clean code',
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
            placeholder='Write something'
        />
    ))
    .add('with value for new item', () => (
        <ToDo
            value='Read again'
        />
    ))
    .add('with items and value for new item', () => (
        <ToDo
            value='Read again'
            items={items}
        />
    ));