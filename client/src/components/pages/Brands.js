import React from 'react';
import { Container, Row, Col } from '@bootstrap-styled/v4';
// import { Link } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:8091/graphql'}),
  cache: new InMemoryCache()
});

class Brands extends React.Component {
  state = {
    products: [],
    brand: this.props.match.params.brand
  }

  async componentDidUpdate() {
    const brand = this.state.brand;
    const pathBrand = this.props.match.params.brand;
    if (brand !== pathBrand) {
      await this.setState({ brand: pathBrand });
    }
  }

  requestBrandProducts = async (name:string) => {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    try {
      const query = gql`{
        brandFilter(name: "${name}") {
          id
          name
          description
        }
      }`;
      const {data: {brandFilter}} = await client.query({query});
      this.setState({products: brandFilter});
      console.log(brandFilter);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return(
      <Container fluid={true}>
        <button onClick={() => this.requestBrandProducts(this.state.brand)}>hello</button>
        <Row>
          {this.state.products.map(() => (
            <Col sm={6} md={4} xl={3}>
              <p>hello</p>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Brands;