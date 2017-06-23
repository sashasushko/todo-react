import "babel-polyfill";
import { configure } from '@storybook/react';

import "./../src/style.less";

const req = require.context('./../src/stories/', true, /.stories.js$/)

function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
