import React from 'react';
import { Container, Row } from '@bootstrap-styled/v4';
import { requestProductsByCategory } from '../requests';
import GridUnit from '../GridUnit';
import TitleText from '../TitleText';

class Categories extends React.Component {
  state = {
    category: this.props.match.params.category,
    products: []
  }

  componentDidUpdate() {
    const category = this.state.category;
    const pathCategory = this.props.match.params.category;
    if (category !== pathCategory) this.setProductState();
  }

  async componentDidMount() {
    await this.setProductState();
  }

  async setProductState() {
    const pathBrand = this.props.match.params.category;
    await this.setState({ category: pathBrand });
    const products = await requestProductsByCategory(this.state);
    await this.setState({ products });
  }

  render() {
    return (
      <Container fluid={true}>
        <TitleText title={this.state.category}/>
        <Row>
          {this.state.products.map((product, i) => (
            <GridUnit key={ 'grid-unit-' + i } product={product}/>
          ))}
        </Row>
      </Container>
    );
  }
}


export default Categories;