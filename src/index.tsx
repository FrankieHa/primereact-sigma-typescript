import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import ScrollToTop from './ScrollToTop'

ReactDOM.render(
    <HashRouter>
        <ScrollToTop />
        <App />
    </HashRouter>,
    document.getElementById('root')
)

serviceWorker.unregister()
