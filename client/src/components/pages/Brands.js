import React from 'react';
import Strapi from 'strapi-sdk-javascript';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { Link } from 'react-router-dom';

const strapi = new Strapi('');

class Brands extends React.Component {
  state = {
    products: [],
    brandName: this.props.match.params.brand
  }
  brand: {};
  brands = [];

  async componentDidUpdate() {
    const pathBrand = this.props.match.params.brand;
    if (this.state.brandName !== pathBrand) {
      await this.setState({ brandName: pathBrand });
      this.getProducts();
    }
  }

  async requestBrandIds() {
    let response;
    try {
      response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            brands {
              _id
              name
            }
          }`
        }
      });
      this.brands = response.data.brands;
      console.log('jello',this.brands);

    } catch (error) {
      console.log(error);
    }
    // console.log(this.brands);

  }

  async requestBrandProducts() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            brand(id: "${this.brand._id}") {
              name
              products {
                id
                name
                description
                images {
                  url
                }
              }
            }
          }`
        }
      });


      this.setState({
        products: response.data.brand.products
      });

      // console.log(this.state.products);

    } catch (error) {
      console.log('hello', error);
      this.setState({ products: [] });
    }
  }

  setBrandState() {
    const brand = this.brands.find((brd) => {
      return brd.name.toLowerCase() === this.state.brandName.toLowerCase()
    });

    this.brand = brand;
  }

  async getProducts() {
    await this.setBrandState();
    await this.requestBrandProducts();
  }

  async componentDidMount() {
    await this.requestBrandIds();
    this.getProducts();
  }

  render() {
    return(
      <Container fluid={true}>
        <Row>
        {
          this.state.products.map((product) => (
            <Col xs={6} sm={6} md={4} xl={3}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <img style={{ width: '100%' }} src={`${product.images[0].url}`} alt={`${product.name}`}/>
                  <h4>{product.name}</h4>
                </div>
              </Link>
            </Col>
          ))
        }
        </Row>
      </Container>
    );
  }
}

export default Brands;