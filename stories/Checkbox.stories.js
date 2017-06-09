import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from '../src/js/components/Checkbox';

storiesOf('Checkbox', module)
    .add('default', () => (
        <Checkbox />
    ))
    .add('checked', () => (
        <Checkbox
            checked={true}
        />
    ))
    .add('with onChange', () => (
        <Checkbox
            onChange={action('onChange')}
        />
    ));