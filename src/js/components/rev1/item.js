/*import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false
        }
        this.compliteItem = this.compliteItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    compliteItem(event) {
        this.props.onChange({
            action: 'complite',
            index: this.props.index
        });
    }

    changeItem(event) {
        this.setState({
            isEditable: true
        });
    }

    editItem(event) {
        const value = event.target.value;
        if (event.key && event.key !== 'Enter') {
            return;
        }
        if (!value) {
            this.removeItem();
            return;
        }
        this.setState({
            isEditable: false
        });
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
        const isEditable = this.state.isEditable;
        const classNames = [
            isEditable ? 'editable' : 'noEditable',
            isComplited ? 'complite' : ''
        ]
        return (
            <div className={classNames.join(' ').trim()}>
                <div className="view">
                    <input type="checkbox" checked={isComplited} onChange={this.compliteItem} />
                    <span className="title" onClick={this.changeItem}>{value}</span>
                    <button type="button" onClick={this.removeItem}>Удалить</button>
                </div>
                <input
                    className="edit"
                    type="text"
                    defaultValue={value}
                    onBlur={this.editItem}
                    onKeyPress={this.editItem}
                    ref={(input) => { if(input) ReactDOM.findDOMNode(input).focus()}}
                />
            </div>
        )
    }
}

ListItem.propTypes = {
    index: PropTypes.string.isRequired,
    value: PropTypes.string,
    isComplited: PropTypes.bool,
    onChange: PropTypes.func
};

ListItem.defaultProps = {
    value: '',
    isComplited: false
}*/