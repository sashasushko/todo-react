import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CreateNewItem from '../src/js/components/CreateNewItem';

storiesOf('Create New Item', module)
    .add('Empty', () => (
        <CreateNewItem
            onCreate={action('create')}
        />
    ));