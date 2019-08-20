import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '@bootstrap-styled/v4';

import { requestBrandProducts } from '../requests';
import Product from './Product';

class Brands extends React.Component {
  state = {
    products: [],
    brand: this.props.match.params.brand
  }

  componentDidUpdate() {
    const brand = this.state.brand;
    const pathBrand = this.props.match.params.brand;
    if (brand !== pathBrand) this.setProductState();
  }

  async componentDidMount() {
    await this.setProductState();
    // console.log(this.state.brand);

  }

  async setProductState() {
    const pathBrand = this.props.match.params.brand;
    await this.setState({ brand: pathBrand });
    const products = await requestBrandProducts(this.state);
    await this.setState({ products });
  }

  render() {
    const { products } = this.state;
    return(
      <Container fluid={true}>
        <Row>
          { products.length > 0 &&
            products.map((product) => (
            <Col sm={6} md={4} xl={3}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <img
                  style={{ width: '100%' }}
                  src={`${product.images[0]}`}
                  alt=""/>

                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Brands;