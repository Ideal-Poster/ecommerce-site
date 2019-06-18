import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './products/Home';
import Categories from './products/Categories';
import Brand from './products/Brands';
import Navbar from './navbar/Navbar';

class App extends React.Component {
  render() {

    return <Router>
      <Navbar/>
      <Switch>
        <div style={{marginTop: '60px'}}>
          <Route exact path="/" component={Home} />
          <Route path="/categories/:cat" component={Categories}/>
          <Route path="/brands/:brand" component={Brand}/>
        </div>
      </Switch>
    </Router>
  }
}

export default App;
