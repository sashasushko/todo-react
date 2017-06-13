import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Input from './Input';
import List from './List';
import Filter from './Filter';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            value: props.value,
            filter: props.filter,
            idCounter: props.items.length
        }
    }

    handleAllDoneChange(checked) {
        const { items } = this.state;
        const newItems = items.map(item => {
            item.checked = checked;
            return item;
        });

        this.setState({
            items: newItems,
            allItemsChecked: checked
        });
    }

    handleItemAdd(value) {
        const { idCounter, items } = this.state;
        const newId = idCounter + 1;
        const newItem = {
            id: newId,
            value: value.trim(),
            checked: false
        };

        this.setState({
            idCounter: newId,
            items: [...items, newItem],
            value: ''
        });
    }

    handleItemChange(id, update) {
        const { items } = this.state;
        const index = items.findIndex(item => item.id == id);

        if (index === -1) {
            return;
        }

        this.setState({
            items: [
                ...items.slice(0, index),
                Object.assign(items[index], update),
                ...items.slice(index + 1)
            ]
        });
    }

    handleItemRemove(id) {
        const { items } = this.state;
        const index = items.findIndex(item => item.id == id);

        if (index === -1) {
            return;
        }

        this.setState({
            items: [
                ...items.slice(0, index),
                ...items.slice(index + 1)
            ]
        });
    }

    handleCompletedClear() {
        const { items } = this.state;

        this.setState({
            items: items.filter(i => !i.checked)
        })
    }

    handleInputKeyDown(key) {
        const { value, items } = this.state;

        if (key === 'Enter' && value.trim()) {
            this.handleItemAdd(value.trim());
        }
    }

    filterItems() {
        const { filter, items } = this.state;
        const filters = {
            all: i => true,
            active: i => !i.checked,
            completed: i => i.checked 
        };

        return items.filter(filters[filter]);
    }

    render() {
        const { items, value, filter } = this.state;
        const { placeholder } = this.props;

        return (
            <div>
                {
                    (items.length != 0) && (
                        <div>
                            <Checkbox
                                checked={items.every(x => x.checked)}
                                label='All done'
                                onChange={checked => this.handleAllDoneChange(checked)}
                            />
                        </div>
                    )
                }
                <div>
                    <Input
                        value={value}
                        placeholder={placeholder}
                        onChange={value => this.setState({ value })}
                        onKeyDown={key => this.handleInputKeyDown(key)}
                    />
                </div>
                <List
                    items={this.filterItems()}
                    onChange={(index, update) => this.handleItemChange(index, update)}
                    onRemove={index => this.handleItemRemove(index)}
                />
                {
                    (items.length != 0) && (
                        <div>Left: {items.filter(i => !i.checked).length}</div>
                    )
                }
                {
                    (items.filter(i => i.checked).length != 0) && (
                        <button onClick={() => this.handleCompletedClear()}>Clear completed</button>
                    )
                }
                {
                    (items.length != 0) && (
                        <Filter
                            onChange={filter => this.setState({ filter })}
                        />
                    )
                }
            </div>
        )
    }
}

ToDo.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    filter: PropTypes.string
};

ToDo.defaultProps = {
    items: [],
    value: '',
    placeholder: '',
    filter: 'all'
};