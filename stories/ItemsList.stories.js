import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ItemsList from '../src/js/components/ItemsList';

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

storiesOf('ItemsList', module)
    .add('Empty', () => (
        <ItemsList />
    ))
    .add('With items', () => (
        <ItemsList
            items={items}
        />
    ));