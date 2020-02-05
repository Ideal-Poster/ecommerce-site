import React from 'react';
import { createUser } from '../../components/requests';

class UserPage extends React.Component { 
	state = {
		username: "",
		email: "",
		passowrd: ""
	}
	
	handleChange = ({nativeEvent: {target}}) => {
		this.setState({ [target.name]: target.value });	
	}

	onFormSubmit = event => {
		event.preventDefault();
		const { username, email, passowrd } = this.state;
		createUser(username, email, passowrd)
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
						<button
							onClick={this.onFormSubmit}
						>hello</button>
					</form>
			</div>
		)
	}
}

export default UserPage;