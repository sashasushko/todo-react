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
            value: props.value
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

    handleItemChange(index, update) {
        const { items } = this.state;

        this.setState({
            items: [
                ...items.slice(0, index),
                Object.assign(items[index], update),
                ...items.slice(index + 1)
            ]
        });
    }

    handleItemRemove(index) {
        const { items } = this.state;

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
        const { value: srcValue, items } = this.state;
        const value = srcValue.trim();

        if (key === 'Enter' && value) {
            const newItem = {
                value,
                checked: false
            };
            this.setState({
                items: [...items, newItem],
                value: ''
            });
        }
    }

    render() {
        const { items, value } = this.state;
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
                    items={items}
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
            </div>
        )
    }
}

ToDo.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    placeholder: PropTypes.string
};

ToDo.defaultProps = {
    items: [],
    value: '',
    placeholder: ''
};