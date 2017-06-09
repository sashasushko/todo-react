import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Item from '../src/js/components/Item';

storiesOf('Item', module)
    .add('default', () => (
        <Item
            value='Some value'
        />
    ))
    .add('checked', () => (
        <Item
            value='Some value'
            checked={false}
        />
    ))
    .add('with onChange', () => (
        <Item
            value='Some value'
            onChange={action('onChange')}
        />
    ))
    .add('with onRemove', () => (
        <Item
            value='Some value'
            onRemove={action('onRemove')}
        />
    ));