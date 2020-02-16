import React from 'react';
import { createUser } from '../components/requests';
import { logIn, logging, logout } from '../components/Auth';

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
		createUser(username, email, password)
	}

	logIn = async (event) => {
		event.preventDefault();
		// Make the login API call
		const { email, password } = this.state;
		const response = await fetch('http://localhost:8091/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		const jwt_token = await response.json();
		logIn(jwt_token);
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
						<button onClick={this.onFormSubmit}>sign Up</button>
						<button onClick={this.logIn}>Log in</button>
						<button onClick={logout}>Log out</button>
						<button onClick={logging}>log</button>
					</form>
			</div>
		)
	}
}

export default UserPage;