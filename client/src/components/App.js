import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Categories from '../pages/Categories';
import Brand from '../pages/Brands';
import Navbar from '../components/navbar/Navbar';
import Product from '../pages/Product';
import LogIn from '../pages/auth/Login';
import { BaseCSS } from 'styled-bootstrap-grid';

import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import Cart from '../pages/Cart';
import { getLocalCart, logInStatus, loggedIn } from '../utilities';
import { connect } from 'react-redux';

import { setReduxCart } from '../actions';
import User from '../pages/User';
import { syncLogout, fetchUserCart, silentRefresh } from './requests';

window.addEventListener('storage', (event) => syncLogout(event));


const LoggedOutOnly = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    loggedIn() ?
    <Component {...props}/> :
    <Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }}/>
  )}/>
);

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    !loggedIn() ?
    <Component {...props}/> :
    <Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }}/>
  )}/>
);


class App extends React.Component {
  async componentDidMount() {
    const validToken = await silentRefresh();
    // console.log(validToken);
    if (validToken) {
      await this.getUserCart();
    } else {
      logInStatus(false);
      this.setReduxCartFromStorage();
    };
  };

  async getUserCart() {
    const cart = await fetchUserCart();
    this.props.setReduxCart(cart);
  };

  setReduxCartFromStorage() {
    const localCartLength = Object.keys(getLocalCart()).length;
    if(localCartLength > 0) this.props.setReduxCart(getLocalCart());
  };

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
                <LoggedOutOnly path="/login" component={LogIn}/>
                <Route path="/cart" component={Cart}/>
                <PrivateRoute path="/user" component={User}/>
              </div>
            </Switch>
          </Router>
        </BootstrapProvider>
      </div>
    );
  }
};

export default connect(null, { setReduxCart })(App);
