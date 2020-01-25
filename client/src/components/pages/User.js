import React from 'react';

class UserPage extends React.Component { 
	state = {
		username: ""
	}
	
	handleChange = ({nativeEvent: {target}}) => {
		console.log(target.name)
		this.setState({ [target.name]: target.value });	
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
					</form>
			</div>
		)
	}
}

export default UserPage;