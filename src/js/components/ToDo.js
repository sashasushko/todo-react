import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Input from './Input';
import List from './List';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            newItemValue: props.presettedValue
        }
    }
    render() {
        const { items, newItemValue } = this.state;
        const itemsLength = items.length;
        const complitedItemsLength = items.reduce((counter, item) => (item.checked ? ++counter : counter), 0);
        const allDone = (complitedItemsLength === itemsLength) ? true : false;
        return (
            <div>
                {
                    !!itemsLength && (
                        <Checkbox
                            checked={allDone}
                            label='All done'
                            onChange={checked => {
                                const newItems = items.map(item => {
                                    item.checked = checked;
                                    return item;
                                })
                                this.setState({
                                    items: newItems,
                                    allItemsChecked: checked
                                });
                            }}
                        />
                    )
                }
                <div>
                    <Input
                        value={newItemValue}
                        onChange={value => this.setState({ newItemValue: value })}
                        onKeyDown={key => {
                            if (key === 'Enter' && newItemValue.trim()) {
                                const newItem = {
                                    value: newItemValue.trim(),
                                    checked: false
                                };
                                this.setState({
                                    items: [...items, newItem],
                                    newItemValue: ''
                                });
                            }
                        }}
                    />
                </div>
                <List
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
                {/*<List>
                    <Item />
                </List>*/}
            </div>
        )
    }
}

ToDo.propTypes = {
    items: PropTypes.array,
    presettedValue: PropTypes.string
};

ToDo.defaultProps = {
    items: [],
    presettedValue: ''
};