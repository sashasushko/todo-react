import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import ItemCreator from './ItemCreator';
import Item from './Item';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            allChecked: false
        }
    }
    render() {
        const { items, allChecked } = this.state;
        const todoItemsList = items.map((item, index) => {
            const { value, checked } = item;
            return (
                <Item
                    key={index}
                    value={value}
                    checked={checked}
                    onChange={update => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                Object.assign(items[index], update),
                                ...items.slice(index + 1)
                            ]
                        });
                    }}
                    onRemove={() => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                ...items.slice(index + 1)
                            ]
                        });
                    }}
                />
            )
        });
        return (
            <div>
                <Checkbox
                    checked={allChecked}
                    onChange={checked => {
                        const items = items.map(item => {
                            item.checked = checked;
                            return item;
                        })
                        this.setState({
                            items,
                            allChecked: checked
                        });
                    }}
                />
                <ItemCreator
                    onCreate={value => {
                        const newItem = {
                            value: value.trim(),
                            checked: false
                        };
                        this.setState({ items: [...items, newItem] });
                    }}
                />
                {todoItemsList}
            </div>
        )
    }
}

ToDo.propTypes = {
    items: PropTypes.array
};

ToDo.defaultProps = {
    items: []
};