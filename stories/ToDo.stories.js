import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToDo from '../src/js/components/ToDo';

storiesOf('ToDo', module)
    .add('default', () => (
        <ToDo />
    ))
    .add('with presetted items', () => (
        <ToDo
            items={[
                {
                    value: 'Read "Clean Code"',
                    checked: true,
                },
                {
                    value: 'Write clean code',
                    checked: false,
                }
            ]}
        />
    ));