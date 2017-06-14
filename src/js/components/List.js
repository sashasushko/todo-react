import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Gapped from '../../../node_modules/retail-ui/components/Gapped/Gapped';
import Item from './Item';

export default function List(props) {
    const { items, onChange, onRemove } = props;

    const itemsList = items.map((item) => {
        const { id, value, checked } = item;
        return (
            <Item
                key={id}
                value={value}
                checked={checked}
                onChange={update => onChange(id, update)}
                onRemove={() => onRemove(id)}
            />
        )
    });
    return (
        <Gapped
            gap={5}
            vertical={true}
        >
            {(itemsList.length == 0) ? (<i>Список пуст</i>) : itemsList}
        </Gapped>
    )
}

List.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
};

List.defaultProps = {
    items: [],
    onChange: () => { },
    onRemove: () => { }
};