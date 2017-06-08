import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Item from '../src/js/components/Item';

storiesOf('Item', module)
    .add('Not completed', () => (
        <Item
            data={{
                value: 'Съесть мягких французских булок',
                complited: false
            }}
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ))
    .add('Сompleted', () => (
        <Item
            data={{
                value: 'Съесть ещё этих мягких французских булок',
                complited: true
            }}
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ))
    .add('Without change', () => (
        <Item
            data={{
                value: 'Съесть ещё этих мягких французских булок',
                complited: true
            }}
            onRemove={action('onRemove')}
        />
    ))
    .add('Without remove', () => (
        <Item
            data={{
                value: 'Съесть ещё этих мягких французских булок',
                complited: true
            }}
            onChange={action('onChange')}
        />
    ))
    .add('Without all actions', () => (
        <Item
            data={{
                value: 'Съесть ещё этих мягких французских булок',
                complited: false
            }}
        />
    ));