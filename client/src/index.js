import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware, compose } from 'redux'; // applyMiddleware is used to apply thunk
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
//test a new branch