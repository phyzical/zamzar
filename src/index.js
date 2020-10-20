import {
  Provider,
} from 'react-redux';
import {
  render,
} from 'react-dom';
import React from 'react';
import uikit from 'uikit';
import App from './components/App';
import { getStore } from './helpers/store';

uikit.use(require('uikit/dist/js/uikit-icons'));

const root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render((
  <Provider store={getStore()}>
    <App />
  </Provider>),
  document.getElementById('root'));
