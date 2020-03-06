import React from 'react';
import { logout } from '../components/requests';
import { getLocalCart } from '../utilities';
import { connect } from 'react-redux';
import { setLogIn ,setReduxCart } from '../actions';

class User extends React.Component {

  logout = async event => {
    event.preventDefault();
    const loggedOut = await logout();
    if (loggedOut) {
      this.props.setLogIn(false);
      this.props.setReduxCart(getLocalCart());
      this.props.history.push('/');
    };
  };

  render() {
    return(
      <div>
        <p>Register</p>
        <button onClick={ this.logout }>logout</button>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(mapStateToProps, { setLogIn, setReduxCart })(User);