import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToDo from '../src/js/components/ToDo';

const items = [
    {
        id: 0,
        value: 'Read "Clean Code"',
        checked: true,
    },
    {
        id: 1,
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
    .add('with filter', () => (
        <ToDo
            items={items}
            filterEnable={true}
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