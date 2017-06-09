import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '../src/js/components/Input';

storiesOf('Input', module)
    .add('default', () => (
        <Input
            onChange={action('onChange')}
            onBlur={action('onBlur')}
            onKeyDown={action('onKeyDown')}
        />
    ))
    .add('with value by default', () => (
        <Input
            value='Some value'
            onChange={action('onChange')}
            onBlur={action('onBlur')}
            onKeyDown={action('onKeyDown')}
        />
    ))
    .add('with value and autofocus by default', () => (
        <Input
            value='Some value'
            focus={true}
            onChange={action('onChange')}
            onBlur={action('onBlur')}
            onKeyDown={action('onKeyDown')}
        />
    ));