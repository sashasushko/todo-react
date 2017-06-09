import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import List from '../src/js/components/List';

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

storiesOf('List', module)
    .add('default', () => (
        <List
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ))
    .add('with items', () => (
        <List
            items={items}
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ));