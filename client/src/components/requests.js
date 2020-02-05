import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

const apiUrl = process.env.API_URL || 'http://localhost:8091/graphql';

const client = new ApolloClient({
  link: new HttpLink({uri: apiUrl}),
  cache: new InMemoryCache()
});

export const requestProductsByBrand = async ({brand}) => {
  try {
    const query = gql`{
      brandFilter(name: "${brand}") {
        id
        name
        description
        images
        brand
        price
      }
    }`;
    const {data: {brandFilter}} = await client.query({query});
    return brandFilter;
  } catch (error) {
    console.log(error);
  }
}

export const requestProductsByCategory = async ({category}) => {
  try {
    const query = gql`{
      categoryFilter(name: "${category}") {
        id
        name
        description
        images
        brand
        price
      }
    }`;
    const {data: {categoryFilter}} = await client.query({query});
    return categoryFilter;
  } catch (error) {
    console.log(error);
  }
}

export const requestProduct = async ({product: {id}}) => {
  try {
    const query = gql`{
      product(id: "${id}") {
        id
        name
        price
        description
        images
        category
      }
    }`;
    const {data: {product}} = await client.query({query});
    return product;
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
      productSizeStockApparel(id: "${id}") {
        small
        medium
        large
      }
    }`
    const {data: {productSizeStockApparel}} = await client.query({query});
    return productSizeStockApparel;
  } catch(error) {
    console.log(error);
  }
}

export const productSizeStockFootwear = async ({product: {id}}) => {
  try {
    const query =  gql`{
      productSizeStockFootwear(id: "${id}") {
        ten
        eleven
        twelve
        thirteen 
      }
    }`
    const {data: {productSizeStockFootwear}} = await client.query({query});
    return productSizeStockFootwear;
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


