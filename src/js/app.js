import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './../less/style.less';
import ToDo from './components/ToDo';

ReactDOM.render(
    <ToDo
        placeholder='Нужно сделать...'
    />,
    document.getElementById('root')
);