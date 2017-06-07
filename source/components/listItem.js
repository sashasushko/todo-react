import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Input from './input.js';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.compliteItem = this.compliteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    compliteItem(event) {
        this.props.onChange({
            action: 'complite',
            index: this.props.index
        });
    }

    editItem(value) {
        this.props.onChange({
            action: 'edit',
            index: this.props.index,
            value: value
        });
    }

    removeItem() {
        this.props.onChange({
            action: 'remove',
            index: this.props.index
        });
    }

    render() {
        const value = this.props.value;
        const isComplited = this.props.isComplited;
        return (
            <div>
                <input type="checkbox" checked={isComplited} onChange={this.compliteItem} />
                {value}
                <button type="button" onClick={this.removeItem}>Удалить</button>
                <Input value={value} clearAfterSubmit={false} onSubmit={this.editItem} />
            </div>
        )
    }
}

ListItem.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string,
    isComplited: PropTypes.bool,
    onChange: PropTypes.func
};

ListItem.defaultProps = {
    value: '',
    isComplited: false
}