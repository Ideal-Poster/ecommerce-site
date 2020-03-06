import React from 'react';
import { logIn, createUser, fetchUserCart } from '../../components/requests';
import { connect } from 'react-redux';
import { setReduxCart } from '../../actions';
import { FormInput } from '../styled/Form';
import { Col } from '@bootstrap-styled/v4';
import { setLogIn } from '../../actions';

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
    if (logRequestResult) this.props.setLogIn(true);

    const cart = await fetchUserCart();
    this.props.setReduxCart(cart);
    this.props.history.push('/');
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

  signInText = () => (
    <p>Don't have an account&nbsp;
      <span 
        style={{ color: 'blue', cursor: 'pointer'}}
        onClick={ this.toggleLoginSignUp }>
        Sign Up
      </span>
    </p>
  );

  logInText = () => (
    <p>Have an account?&nbsp;
      <span 
        style={{ color: 'blue', cursor: 'pointer'}}
        onClick={ this.toggleLoginSignUp }> 
        Log In
      </span>
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
			<div style={{paddingTop: '20px'}}>
        <Col xs={12} sm={{ size: 6, offset: 3 }}>  
					<form>
            { !registeredUser && this.usernameForm() }
            { this.emailAndPasswordForms() }
            {
              registeredUser ?
              <button onClick={ this.logIn }>Log in</button> :
              <button onClick={ this.onFormSubmit }>Sign up</button>
            }
            <div style={{ border: '1px solid black', paddingLeft: '10px' }}>
              { registeredUser ? this.signInText() : this.logInText() }
            </div>
					</form>
        </Col>
			</div>
		);
	};
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps, { setLogIn, setReduxCart })(LogIn) ;