import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, concat } from 'apollo-boost';
import gql from 'graphql-tag';
import { returnInMemoryToken } from './Auth';
import { onError } from 'apollo-link-error';
import { logout } from './Auth';


const apiUrl = process.env.API_URL || 'http://localhost:8091/graphql';
const httpLink = new HttpLink({uri: apiUrl});

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) logout();
 })

let appJWTToken = returnInMemoryToken();
const authMiddleware = new ApolloLink((operation, forward)=> {
  if (appJWTToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${appJWTToken}`
      }
    });
  } 
  return forward(operation);
 });

const client = new ApolloClient({
  link: logoutLink.concat(concat(authMiddleware, httpLink)) ,
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
    const query = gql`{
        createUser(username: "${username}", email: "${email}", password: "${password}") {
        username
        email
     }
    }`
    const {data: {createUser}} = await client.query({query});
    return createUser;
  } catch (error) {
    console.log(error);
  }
}


