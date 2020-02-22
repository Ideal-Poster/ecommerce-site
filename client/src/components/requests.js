import gql from 'graphql-tag';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

let inMemoryToken;
const apiUrl = process.env.API_URL || 'http://localhost:8091/graphql';
const httpLink = new HttpLink({uri: apiUrl});

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) logout();
 });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: inMemoryToken ? `Bearer ${inMemoryToken}` : "",
    }
  }
});

const client = new ApolloClient({
  link: logoutLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache()
});

export const requestProductsByBrand = async ({brand}) => {
  try {
    const query = gql`{
      filterByBrand(name: "${brand}") {
        id
        name
        description
        images
        brand
        price
      }
    }`;
    const {data: {filterByBrand}} = await client.query({query});
    return filterByBrand;
  } catch (error) {
    console.log(error);
  }
}

export const requestProductsByCategory = async ({category}) => {
  try {
    const query = gql`{
      filterByCategory(name: "${category}") {
        id
        name
        description
        images
        brand
        price
      }
    }`;
    const {data: {filterByCategory}} = await client.query({query});
    return filterByCategory;
  } catch (error) {
    console.log(error);
  }
}

export const requestProduct = async ({product: {id}}) => {
  try {
    const query = gql`{
      getProductById(id: "${id}") {
        id
        name
        price
        description
        images
        category
      }
    }`;
    const {data: {getProductById}} = await client.query({query});
    return getProductById;
  } catch (error) {
    console.log(error);
  }
}

export const requestBrands = async () => {
  try {
    const query = gql`{
      brands {
        name
      }
    }`
    const {data: {brands}} = await client.query({query});
    return brands;
  } catch (error){
    console.log(error);
  }
}

export const requestCategories = async () => {
  try {
    const query = gql`{
      categories {
        name
      }
    }`
    const {data: {categories}} = await client.query({query});
    return categories;
  } catch (error){
    console.log(error);
  }
}

export const requestProductApparelSizes = async ({product: {id}}) => {
  try {
    const query =  gql`{
      apparelStock(id: "${id}") {
        small
        medium
        large
      }
    }`
    const {data: {apparelStock}} = await client.query({query});
    return apparelStock;
  } catch(error) {
    console.log(error);
  }
}

export const footwearStock = async ({product: {id}}) => {
  try {
    const query =  gql`{
      footwearStock(id: "${id}") {
        ten
        eleven
        twelve
        thirteen 
      }
    }`
    const {data: {footwearStock}} = await client.query({query});
    return footwearStock;
  } catch(error) {
    console.log(error);
  }
}

export const createUser = async (username, email, password) => {
  try {
    client.mutate({
      mutation: gql`
        mutation {
          createUser(username: "${username}", email: "${email}", password: "${password}") {
            username
            email
          }
        }`,
    });
  } catch (error) {
    console.log(error);
  }
}

export const getUserCart = async email => {
  try {
    const query = gql`
      {
        getUserCart(email: "${email}") {
        }
      }`;
   const {data: {getUserCart}} = await client.query({query});
   return getUserCart;
  } catch (error) {
    console.log(error);
  }
}

export const setUserCart = async (cart) => {
  try {
    client.mutate({
      mutation: gql`
        mutation {
          setUserCart(cart: "${cart}") {
            name
          }
        }`,
    });
  } catch (error) {
    console.log(error);
  }
}

//------------------------------------------------------------------------------------------
// Authentication Requests

export const isTokenPresent = () => {
	if (!inMemoryToken) {
		this.props.history.push('/login');
	} 
};

export const logIn = async (email, password) => {
	const response = await fetch('http://localhost:8092/login', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
      authorization: `Bearer ${inMemoryToken}`
		},
		body: JSON.stringify({email: email, password: password})
	});
  const data = await response.json();
  if (data) inMemoryToken = data.accessToken;
  console.log(inMemoryToken);
}

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

export const logging = event => {
    event.preventDefault();
    console.log(inMemoryToken);
};