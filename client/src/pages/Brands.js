import React from 'react';
import { Container, Row } from '@bootstrap-styled/v4';

import { requestProductsByBrand } from '../components/requests';
import TitleText from '../components/TitleText';
import GridUnit from '../components/GridUnit';

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
    this.setProductState();
  }

  async setProductState() {
    const pathBrand = this.props.match.params.brand;
    await this.setState({ brand: pathBrand });
    const products = await requestProductsByBrand(this.state);
    await this.setState({ products });
  }

  render() {
    const { products } = this.state;
    return(
      <Container fluid={true}>
        <TitleText title={this.state.brand}/>
        <Row>
          { 
            products.map((product, i) => (
              <GridUnit key={'grid-unit-' + i} product={product}/>
            ))
          }
        </Row>
      </Container>
    );
  }
}

export default Brands;