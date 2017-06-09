import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '../src/js/components/Input';

storiesOf('Input', module)
    .add('default', () => (
        <Input />
    ))
    .add('with value', () => (
        <Input
            value='Some value'
        />
    ))
    .add('with autofocus', () => (
        <Input
            autofocus={true}
        />
    ))
    .add('with onChange', () => (
        <Input
            onChange={action('onChange')}
        />
    ))
    .add('with onBlur', () => (
        <Input
            onBlur={action('onBlur')}
        />
    ))
    .add('with onKeyDown', () => (
        <Input
            onKeyDown={action('onKeyDown')}
        />
    ));