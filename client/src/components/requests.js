import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

const apiUrl = process.env.API_URL || 'http://localhost:8091/graphql';

const client = new ApolloClient({
  link: new HttpLink({uri: apiUrl}),
  cache: new InMemoryCache()
});

export const requestBrandProducts = async ({brand}) => {
  brand = brand.charAt(0).toUpperCase() + brand.slice(1);
  try {
    const query = gql`{
      brandFilter(name: "${brand}") {
        id
        name
        description
      }
    }`;
    const {data: {brandFilter}} = await client.query({query});
    // console.log(brandFilter);
    return brandFilter;
  } catch (error) {
    console.log(error);
  }
}