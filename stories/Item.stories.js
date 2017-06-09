import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Item from '../src/js/components/Item';

storiesOf('Item', module)
    .add('default', () => (
        <Item
            value='Some value'
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ))
    .add('checked by default', () => (
        <Item
            value='Some value'
            checked={true}
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ))
    .add('editable by default', () => (
        <Item
            value='Some value'
            editable={true}
            onChange={action('onChange')}
        />
    ))
    .add('checked and editable by default', () => (
        <Item
            value='Some value'
            checked={true}
            editable={true}
            onChange={action('onChange')}
        />
    ));