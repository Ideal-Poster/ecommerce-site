import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Brand from './pages/Brands';
import Navbar from './navbar/Navbar';
import Product from './pages/Product';

import { BaseCSS } from 'styled-bootstrap-grid';


class App extends React.Component {
  render() {

    return(
      <div>
        <BaseCSS />
        <Router>
          <Navbar/>
          <Switch>
            <div style={{marginTop: '60px'}}>
              <Route exact path="/" component={Home} />
              <Route path="/categories/:cat" component={Categories}/>
              <Route path="/brands/:brand" component={Brand}/>
              <Route path="/product/:productId" component={Product}/>
            </div>
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
