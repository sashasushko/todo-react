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
    .add('with presetted items', () => (
        <ToDo
            items={items}
        />
    ))
    .add('with presetted value', () => (
        <ToDo
            presettedValue='Read again'
        />
    ))
    .add('with presetted items and value', () => (
        <ToDo
            presettedValue='Read again'
            items={items}
        />
    ));