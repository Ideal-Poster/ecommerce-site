import gql from 'graphql-tag';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { simplifiedCart, setLocalStorageCart } from '../utilities';

let inMemoryToken;
const apiUrl = 'http://localhost:8091/graphql';
const authApiUrl = 'http://localhost:8092/';
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
};

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
};

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
};

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
};

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
};

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
};

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
};

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
};

export const getUserCart = async email => {
  let collection = [];
  try {
    const query = gql`{ getUserCart(email: "eiwne@gmail.com") }`;
    const { data: {getUserCart}} = await client.query({query} );
    const userCart = JSON.parse(getUserCart);

    for (let i = 0; i < userCart.length; i++) {
      const product = await requestProduct({product: {id: userCart[i].id} });
      collection.push({...product ,size: userCart[i].size});
    }
    // console.log(userCart);
    
    // if (collection) setLocalStorageCart(collection);
    return collection;
  } catch (error) {
    console.log(error);
  }
};

export const setUserCart = async () => {
  const cartString = `${JSON.stringify(simplifiedCart())}`.split("\"").join("\\\"");
  try {
    client.mutate({
      mutation: gql`
        mutation {
          setUserCart(cart: "${cartString}") {
            name
          }
        }`,
    });
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------------------------------------------------------
// Authentication Requests

export const isTokenPresent = () => {
	if (!inMemoryToken) {
		this.props.history.push('/login');
	} 
};

export const logIn = async (email, password) => {
  try {
    const response = await fetch(authApiUrl + 'login', {
      credentials: 'include',
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${inMemoryToken}`
      },
      body: JSON.stringify({email: email, password: password})
    });
    const data = await response.json();
    if (data) {
      inMemoryToken = data.accessToken;
      const timeout = parseInt((data.expiryTime + '000').replace('s', ''));
      setTimeout(() => { silentRefresh() }, (timeout - 10000));
      return true
    }
  } catch(err) {
   console.log(err);
  }
};

export const silentRefresh = async () => {
  try {
    const response = await fetch(authApiUrl + 'refresh_token', {
      credentials: 'include',
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
        // authorization: `Bearer ${inMemoryToken}`
      }
    });
    const data = await response.json();
    if (data) {
      inMemoryToken = data.accessToken;
      const timeout = parseInt((data.expiryTime + '000').replace('s', ''));
      setTimeout(() => { silentRefresh() }, (timeout - 10000));
      return true
    }
  } catch(err) {
    console.log(err);
  }
};

export const logout = async event => {
	inMemoryToken = null;
  // window.localStorage.setItem(authApiUrl + 'logout', Date.now());
  try {
    const data = await fetch(authApiUrl + 'logout', {
      credentials: 'include',
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (data.status === 200) return true
  } catch(err) {
    console.log(err);
  }
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