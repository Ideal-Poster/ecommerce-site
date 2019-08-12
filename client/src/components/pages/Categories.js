import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '@bootstrap-styled/v4';

class Categories extends React.Component {
  state = {
    products: [],
    categoryName: this.props.match.params.cat
  };
  category : string;
  categories : Array<string>;

  async componentDidUpdate() {
    const pathCategory = this.props.match.params.cat;
    if (this.state.categoryName !== pathCategory) {
      await this.setState({ categoryName: pathCategory });
      // this.getProducts();
    }
  }

  async requestCategoryIds() {
    let response;
    try {
      response = await fetch(
        'http://localhost:8000', {
          method: 'POST',
          headers: {'content-type': 'application/json'}
        }
      )
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          {/* <button onClick={}>hello<button/> */}
          {/* {
            this.state.products.map((product) => (
              <Col xs={6} sm={6} lg={3}>
                <Link to={`/product/${product.id}`}>
                  <div>
                    <img style={{width: '100%'}} src={`${product.images[0].url}`} alt={`${product.name}`}/>
                    <h4 >{product.name}</h4>
                  </div>
                </Link>
              </Col>
            ))
          } */}
        </Row>
      </Container>
    );
  }
}


export default Categories;