import React from 'react';
import { logIn, setUserCart, createUser, getUserCart, silentRefresh, logout } from '../components/requests';
import { connect } from 'react-redux';
import { loggedIn, setReduxCart } from '../actions/index';
import { getLocalCart } from '../utilities';


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

    const loggedIn = await logIn(email, password);
    if (loggedIn) this.props.loggedIn(true);
    
    const cart  = await getUserCart();
    this.props.setReduxCart(cart);
  }
  
  setUserCart = event => {
    event.preventDefault();    
    setUserCart(); 
  }
  
  getUserCart = async event => {
    event.preventDefault();    
    const cart  = await getUserCart();
    console.log(cart);
    this.props.setReduxCart(cart);
  }

  silentRefresh = event => {
    event.preventDefault();
    silentRefresh();
  }

  logout = async event => {
    event.preventDefault();
    const loggedOut = await logout();
    if (loggedOut) {
      this.props.loggedIn(false);
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
						{/* <button onClick={ this.onFormSubmit }>sign Up</button> */}
						<button onClick={ this.logIn }>Log in</button>
						{/* <button onClick={ logout }>Log out</button> */}
            <button onClick={ this.logout }>logout</button>
						{/* <button onClick={ this.getUserCart }>get User Cart</button> */}
						{/* <button onClick={ this.silentRefresh }>silent refresh</button> */}

						<button onClick={ this.setUserCart }>set User Cart</button>
					</form>
			</div>
		)
	}
}

export default connect(null, { loggedIn, setReduxCart })(UserPage) ;