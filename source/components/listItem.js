import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isComplited: false
        }
    }

    render() {
        return (
            <div>
                <input type="checkbox" checked={this.state.isComplited} />
                {this.props.value}
                <button type="button">Удалить</button>
            </div>
        )
    }
}

ListItem.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
};

ListItem.defaultProps = {
    value: ''
}