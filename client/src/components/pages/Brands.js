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

  componentDidMount() {
    this.setProductState();
  }

  async setProductState() {
    const pathBrand = this.props.match.params.brand;
    await this.setState({ brand: pathBrand });
    const products = await requestBrandProducts(this.state);
    this.setState({ products });
  }

  render() {
    return(
      <Container fluid={true}>
        <Row>
          {this.state.products.map((product) => (
            <Col sm={6} md={4} xl={3}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <img
                  style={{
                    width: '100%'
                  }}
                  src={require("../../static/photo-1513531926349-466f15ec8cc7.jpeg")}
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