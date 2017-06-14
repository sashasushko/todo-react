import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Group from '../../../node_modules/retail-ui/components/Group/Group';
import Button from '../../../node_modules/retail-ui/components/Button/Button';

export default function Filter(props) {
    const { filter, onChange } = props;
    return (
        <Group>
            <Button
                active={filter === 'all'}
                onClick={() => onChange('all')}
            >Все</Button>
            <Button
                active={filter === 'active'}
                onClick={() => onChange('active')}
            >Несделанные</Button>
            <Button
                active={filter === 'completed'}
                onClick={() => onChange('completed')}
            >Сделанные</Button>
        </Group>
    )
}

Filter.propTypes = {
    onChange: PropTypes.func
};

Filter.defaultProps = {
    onChange: () => { }
};