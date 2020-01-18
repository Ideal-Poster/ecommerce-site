import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Brand from './pages/Brands';
import Navbar from './navbar/Navbar';
import Product from './pages/Product';
import LogIn from './pages/auth/Login';
import { BaseCSS } from 'styled-bootstrap-grid';

import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import Cart from './pages/Cart';
import { getCart } from '../utilities';
import { connect } from 'react-redux';

import { setCartFromStorage } from '../actions/index';



class App extends React.Component {
  componentDidMount() {
    // this.getProductSizes();
    this.props.setCartFromStorage(getCart());
  }

  render() {
    return(
      <div>
        <BaseCSS />
        <BootstrapProvider injectGlobal={true}>
          <Router>
            <Navbar/>
            <Switch>
              <div style={{marginTop: '60px'}}>
                <Route exact path="/" component={Home} />
                <Route path="/categories/:category" component={Categories}/>
                <Route path="/brands/:brand" component={Brand}/>
                <Route path="/product/:productId" component={Product}/>
                <Route path="/LogIn" component={LogIn}/>
                <Route path="/cart" component={Cart}/>
              </div>
            </Switch>
          </Router>
        </BootstrapProvider>
      </div>
    );
  }
}

export default connect(null, { setCartFromStorage })(App);
