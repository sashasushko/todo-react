import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Item from '../src/js/components/Item';

storiesOf('Item', module)
    .add('Not completed', () => (
        <Item
            index={0}
            data={{
                value: 'Съесть мягких французских булок',
                complited: false
            }}
            onChange={action('onChange')}
        />
    ))
    .add('Сompleted', () => (
        <Item
            index={1}
            data={{
                value: 'Съесть ещё этих мягких французских булок',
                complited: true
            }}
            onChange={action('onChange')}
        />
    ));