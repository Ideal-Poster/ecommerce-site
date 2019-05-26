import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './components/App';
import Brands from './components/products/Brands';
import Navbar from './components/navbar/Navbar';

import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar/>
      <Switch>
        <div style={{marginTop: '60px'}}>
          <Route exact path="/" component={App} />
          <Route path="/brands" component={Brands}/>
        </div>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
