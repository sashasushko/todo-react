import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ItemCreator from '../src/js/components/ItemCreator';

storiesOf('ItemCreator', module)
    .add('default', () => (
        <ItemCreator />
    ))
    .add('with presetted value', () => (
        <ItemCreator
            value='Some value'
        />
    ))
    .add('with onCreate', () => (
        <ItemCreator
            onCreate={action('onCreate')}
        />
    ));