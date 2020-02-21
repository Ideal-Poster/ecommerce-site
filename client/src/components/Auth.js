// let inMemoryToken;

// export const isTokenPresent = () => {
// 	if (!inMemoryToken) {
// 		this.props.history.push('/login');
// 	} 
// };

// export const logIn = async (email, password) => {
// 	const response = await fetch('http://localhost:8092/login', {
// 		method: 'POST', 
// 		headers: {
// 			'Content-Type': 'application/json',
// 			authorization: `Bearer ${inMemoryToken}`
// 		},
// 		body: JSON.stringify({email: email, password: password})
// 	});
//   const data = await response.json();
//   if (data) inMemoryToken = data.accessToken;
//   console.log(inMemoryToken);
// }

// export const logout = event => {
// 	event.preventDefault();
// 	inMemoryToken = null;
// 	window.localStorage.setItem('logout', Date.now());
// };

// export const syncLogout = event => {
//   if (event.key === 'logout') {
//     console.log('logged out from storage!')
//   }
// }

// export const setInMemoryToken = token => {
//   inMemoryToken = token;
// }

// export const returnInMemoryToken = () => {
// 	return inMemoryToken;
// };

// export const logging = event => {
//     event.preventDefault();
//     console.log(inMemoryToken);
// };