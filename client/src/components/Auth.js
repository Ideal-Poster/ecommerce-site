
let inMemoryToken;

export const isTokenPresent = () => {
	if (!inMemoryToken) {
		this.props.history.push('/login');
	} 
};

export const logIn = token => {
	inMemoryToken = token
	console.log(inMemoryToken);
};

export const logout = event => {
	event.preventDefault();
	inMemoryToken = null;
	window.localStorage.setItem('logout', Date.now());
};

export const syncLogout = event => {
  if (event.key === 'logout') {
    console.log('logged out from storage!')
  }
}

export const returnInMemoryToken = () => {
	return inMemoryToken;
};

export const logging = event => {
    event.preventDefault();
    console.log(inMemoryToken);
};

// window.addEventListener('storage', syncLogout());
