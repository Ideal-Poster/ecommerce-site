import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '@bootstrap-styled/v4';
import { requestCategoryProducts } from '../requests';

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

  componentDidMount() {
    this.setProductState();
  }

  async setProductState() {
    const pathBrand = this.props.match.params.category;
    await this.setState({ category: pathBrand });
    const products = await requestCategoryProducts(this.state);
    this.setState({ products });
  }

  render() {
    return (
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


export default Categories;