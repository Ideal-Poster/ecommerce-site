import React from 'react';
import { Container, Row, Col } from '@bootstrap-styled/v4';
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
    // console.log(this.state.products);

  }

  async setProductState() {
    const pathBrand = this.props.match.params.category;
    await this.setState({ category: pathBrand });
    const products = await requestProductsByCategory(this.state);
    await this.setState({ products });
    // console.log(products);
  }

  render() {

    return (
      <Container fluid={true}>
        <TitleText title={this.state.category}/>
        <Row>
          {this.state.products.map((product) => (
            <GridUnit product={product}/>
          ))}
        </Row>
      </Container>
    );
  }
}


export default Categories;