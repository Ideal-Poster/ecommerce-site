import React from 'react';
import { Container, Row, Col } from '@bootstrap-styled/v4';
import { requestBrandProducts } from '../requests';

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