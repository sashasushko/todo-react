import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ItemCreator from '../src/js/components/ItemCreator';

storiesOf('ItemCreator', module)
    .add('Empty', () => (
        <ItemCreator
            onChange={action('onChange')}
            onCreate={action('onCreate')}
        />
    ))
    .add('With preseted value', () => (
        <ItemCreator
            value='Съесть булок да выпить чаю'
            onChange={action('onChange')}
            onCreate={action('onCreate')}
        />
    ));