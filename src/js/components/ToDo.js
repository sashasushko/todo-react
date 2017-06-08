import React from 'react';
import PropTypes from 'prop-types';
import AddItem from './AddItem';
import ItemsList from './ItemsList';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        const { value, items } = props;
        this.state = {
            newValue: value,
            items: items
        }
        this.addItem = this.addItem.bind(this);
    }
    addItem() {
        console.log('addItem');
    }
    render() {
        const { newValue, items } = this.state;
        return (
            <div>
                <AddItem
                    value={newValue}
                    onChange={value => this.setState({ newValue: value })}
                    onAddItem={() => {
                        if (newValue) {
                            // ???
                            const newItem = {
                                value: newValue,
                                complited: false
                            };
                            this.setState({ items: [...items, newItem] });
                            this.setState({ newValue: '' });
                        }
                    }}
                />
                <ItemsList
                    items={items}
                    onChange={(itemIndex, update) => {
                        this.setState({
                            items: [
                                ...items.slice(0, itemIndex),
                                Object.assign(items[itemIndex], update),
                                ...items.slice(itemIndex + 1)
                            ]
                        });
                    }}
                />
            </div>
        )
    }
}

ToDo.PropTypes = {
    value: PropTypes.string,
    items: PropTypes.array
}

ToDo.defaultProps = {
    value: '',
    items: []
}