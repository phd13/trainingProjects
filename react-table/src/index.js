import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app/App'
import reducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render((
    <Provider store={store}>
      <App/>
    </Provider>),
  document.getElementById('root')
);

registerServiceWorker();