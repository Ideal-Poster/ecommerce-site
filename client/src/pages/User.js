import React from 'react';
import { logIn, createUser, fetchUserCart, logout } from '../components/requests';
import { connect } from 'react-redux';
import { setReduxCart } from '../actions/index';
import { getLocalCart, logInStatus } from '../utilities';

class UserPage extends React.Component { 
	state = {
		username: "",
		email: "",
		password: ""
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

	render() { 
		return(
			<div>
					<p>hellp</p>
					<form>
						<p>
							<input
								id="username"
								type="text"
								name="username"
								placeholder="Username"
								onChange={this.handleChange}
							/>
						</p>

						<p>
							<input
								id="email"
								type="text"
								name="email"
								placeholder="Email"
								onChange={this.handleChange}
							/>
						</p>
						<p>
							<input
								id="password"
								type="text"
								name="password"
								placeholder="Password"
								onChange={this.handleChange}
							/>
						</p>
						<button onClick={ this.logIn }>Log in</button>
            <button onClick={ this.logout }>logout</button>
						<button onClick={ this.setUserCart }>set User Cart</button>
					</form>
			</div>
		)
	}
}

export default connect(null, { setReduxCart })(UserPage) ;