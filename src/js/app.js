import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ToDo from './components/ToDo';

ReactDOM.render(
    <ToDo
        placeholder='Write something'
    />,
    document.getElementById('root')
);