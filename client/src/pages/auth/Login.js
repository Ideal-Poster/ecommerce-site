import React from 'react';
import { logIn, createUser, fetchUserCart, logout } from '../../components/requests';
import { connect } from 'react-redux';
import { setReduxCart } from '../../actions';
import { getLocalCart, logInStatus } from '../../utilities';
import { FormInput } from '../styled/Form';
class LogIn extends React.Component { 
	state = {
		username: "",
		email: "",
    password: "",
    registeredUser: false
	}

	handleChange = ({nativeEvent: {target}}) => {
		this.setState({ [target.name]: target.value });	
	}

	onFormSubmit = event => {
		event.preventDefault();
		const { username, email, password } = this.state;
		createUser(username, email, password);
	}

	logIn = async event => {
		event.preventDefault();
    const { email, password } = this.state

    const logRequestResult = await logIn(email, password);
    if (logRequestResult) logInStatus(true);
    const cart = await fetchUserCart();
    this.props.setReduxCart(cart);
  }

  logout = async event => {
    event.preventDefault();
    const loggedOut = await logout();
    if (loggedOut) {
      logInStatus(false);
      this.props.setReduxCart(getLocalCart());
    }
  }

  toggleLoginSignUp = (event) => {
    event.preventDefault();

    this.setState({registeredUser: !this.state.registeredUser });
  }

  usernameForm = () => (
    <p>
      <FormInput
        id="username"
        type="text"
        name="username"
        placeholder="Username"
        onChange={this.handleChange}
      />
    </p>
  );

  emailAndPasswordForms = () => (
    <div>
      <p>
        <FormInput
          id="email"
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
      </p>

      <p>
        <FormInput
          id="password"
          type="text"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
      </p>
    </div>
  );

	render() { 
    const { registeredUser } = this.state
		return(
			<div>
					<form>
            { !registeredUser && this.usernameForm() }
            { this.emailAndPasswordForms() }
            <button onClick={ this.toggleLoginSignUp }>
              {registeredUser ? 'Sign Up': 'Log In'}
            </button>
						<button onClick={ this.logIn }>Log in</button>
            {/* <button onClick={ this.logout }>logout</button> */}
					</form>
			</div>
		);
	};
};

export default connect(null, { setReduxCart })(LogIn) ;