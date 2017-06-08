import React from 'react';
import PropTypes from 'prop-types';
import ItemCreator from './ItemCreator';
import ItemsList from './ItemsList';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        const { value, items } = props;
        this.state = {
            newValue: value,
            items: items
        }
    }
    render() {
        const { newValue, items } = this.state;
        return (
            <div>
                <ItemCreator
                    value={newValue}
                    onChange={value => this.setState({ newValue: value })}
                    onCreate={() => {
                        if (newValue) {
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
                    onChange={(index, update) => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                Object.assign(items[index], update),
                                ...items.slice(index + 1)
                            ]
                        });
                    }}
                    onRemove={index => {
                        this.setState({
                            items: [
                                ...items.slice(0, index),
                                ...items.slice(index + 1)
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