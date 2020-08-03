import { Provider } from 'react-redux'
import { render } from 'react-dom'
import App from './components/App'
import React from 'react'
import store from './helpers/store'
import uikit from 'uikit'
uikit.use(require('uikit/dist/js/uikit-icons'))

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(
    (<Provider store={store}>
        <App />
    </Provider>),
    document.getElementById('root'))
