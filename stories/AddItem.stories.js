import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddItem from '../src/js/components/AddItem';

storiesOf('AddItem', module)
    .add('Empty', () => (
        <AddItem
            onChange={action('onChange')}
            onAddItem={action('onAddItem')}
        />
    ))
    .add('With preseted value', () => (
        <AddItem
            value='Съесть булок да выпить чаю'
            onChange={action('onChange')}
            onAddItem={action('onAddItem')}
        />
    ));