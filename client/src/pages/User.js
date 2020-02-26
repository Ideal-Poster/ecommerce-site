import React from 'react';
import { logIn, setUserCart, createUser, getUserCart, silentRefresh } from '../components/requests';
import { connect } from 'react-redux';
import { loggedIn, setCartFromStorage } from '../actions/index';

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
    const { email, password } = this.state
		event.preventDefault();
    await logIn(email, password);
    this.props.loggedIn(true);
  }
  
  setUserCart = event => {
    event.preventDefault();    
    setUserCart(); 
  }
  
  getUserCart = event => {
    event.preventDefault();    
    getUserCart();
  }

  silentRefresh = event => {
    event.preventDefault();
    silentRefresh();
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
						<button onClick={ this.onFormSubmit }>sign Up</button>
						<button onClick={ this.logIn }>Log in</button>
						{/* <button onClick={ logout }>Log out</button> */}
						{/* <button onClick={ this.getUserCart }>get User Cart</button> */}
						<button onClick={ this.silentRefresh }>silent refresh</button>

						{/* <button onClick={ this.setUserCart }>set User Cart</button> */}
					</form>
			</div>
		)
	}
}

export default connect(null, { loggedIn, setCartFromStorage })(UserPage) ;