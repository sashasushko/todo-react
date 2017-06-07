import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '../src/js/components/Input.js';

storiesOf('Input', module)
    .add('Empty', () => (
        <Input
            onChange={action('change')}
        />
    ))
    .add('With text', () => (
        <Input
            value="Some value"
            onChange={action('change')}
        />
    ));