import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './components/App';
import Categories from './components/products/Categories';
import Brand from './components/products/Brands';
import Navbar from './components/navbar/Navbar';


ReactDOM.render(
  <Router>
    <Navbar/>
    <Switch>
      <div style={{marginTop: '60px'}}>
        <Route exact path="/" component={App} />
        <Route path="/categories/:cat" component={Categories}/>
        <Route path="/brands/:brand" component={Brand}/>

      </div>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
