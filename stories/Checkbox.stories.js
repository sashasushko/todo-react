import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from '../src/js/components/Checkbox';

storiesOf('Checkbox', module)
    .add('unchecked', () => (
        <Checkbox
            onChange={action('onChange')}
        />
    ))
    .add('checked', () => (
        <Checkbox
            checked={true}
            onChange={action('onChange')}
        />
    ))
    .add('with label', () => (
        <Checkbox
            label='I am cool'
            onChange={action('onChange')}
        />
    ));