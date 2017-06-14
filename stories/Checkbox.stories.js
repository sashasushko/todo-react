import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from '../node_modules/retail-ui/components/Checkbox/';

storiesOf('Checkbox', module)
    .add('default', () => (
        <Checkbox
            checked={true}
            onChange={action('onChange')}
        />
    ));