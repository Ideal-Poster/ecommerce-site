import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Categories from '../pages/Categories';
import Brand from '../pages/Brands';
import Navbar from '../components/navbar/Navbar';
import Product from '../pages/Product';
import LogIn from '../pages/auth/Login';
import { BaseCSS } from 'styled-bootstrap-grid';

import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import Cart from '../pages/Cart';
import { getLocalCart } from '../utilities';
import { connect } from 'react-redux';

import { setCartFromStorage } from '../actions/index';
import UserPage from '../pages/User';
import { syncLogout, getUserCart } from './requests';

window.addEventListener('storage', (event) => syncLogout(event));

class App extends React.Component {

  componentDidMount = async () => {
    const { loggedIn, setCartFromStorage } = this.props;
    const localCartLength = Object.keys(getLocalCart()).length;
    if(!loggedIn && localCartLength > 0) setCartFromStorage(getLocalCart());
    if(loggedIn) setCartFromStorage(await getUserCart());
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
                <Route path="/user" component={UserPage}/>
              </div>
            </Switch>
          </Router>
        </BootstrapProvider>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, { setCartFromStorage })(App);
