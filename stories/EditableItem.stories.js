import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EditableItem from '../src/js/components/EditableItem';

storiesOf('EditableItem', module)
    .add('default', () => (
        <EditableItem
            value='Some value'
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ))
    .add('checked by default', () => (
        <EditableItem
            value='Some value'
            checked={true}
            onChange={action('onChange')}
            onRemove={action('onRemove')}
        />
    ))
    .add('editable by default', () => (
        <EditableItem
            value='Some value'
            editable={true}
            onChange={action('onChange')}
        />
    ))
    .add('checked and editable by default', () => (
        <EditableItem
            value='Some value'
            checked={true}
            editable={true}
            onChange={action('onChange')}
        />
    ));