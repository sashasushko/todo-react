import "babel-polyfill";
import { configure } from '@storybook/react';

const req = require.context('../source/stories/', true, /.stories.js$/)

function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
