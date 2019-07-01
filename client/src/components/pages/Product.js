import React from 'react';
import Strapi from 'strapi-sdk-javascript';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { ProductContainer, ProductMargin, ProductView, ImageSelect } from './styled/Product';

const strapi = new Strapi('');

class Product extends React.Component {
  state = {
    name: '',
    price: 0,
    images: [],
    description: '',
    imageSelect: 0
  };

  async requestProduct() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            product(id: "${this.props.match.params.productId}") {
              name
              price
              images {
                url
              }
              description
            }
          }`
        }
      });

      // console.log(response);
      const { name, price, images, description } = response.data.product;
      this.setState({
        name:  name,
        price:  price,
        images:  images,
        description:  description
      });
      // console.log('product', this.state.images[0].url);
    } catch (error) {
      console.log('hello',error);
    }
  }

  selectImage = i => {
    this.setState({ imageSelect: i });
  }

  componentDidMount() {
    this.requestProduct();
  }

  renderImageSelection(i) {
    return(
      <Col sm={4}>
        <ImageSelect
          onClick={ () => this.selectImage(i) }
          src={`${this.state.images[i].url}`} alt="" />
      </Col>
    );
  }

  render() {
    const { name, price, images, description } = this.state;

    return(
      <Container fluid={true}>
        <ProductContainer>
          { images[0] &&
            <ProductMargin>
              <ProductView image={`url(${this.state.images[this.state.imageSelect].url})`}/>
              <Row>
                { images.map((url, i) => ( images && this.renderImageSelection(i))) }
              </Row>
            </ProductMargin>
          }
        </ProductContainer>

        <div
          style={{
            position: 'absolute',
            top: '0',
            right:'0',
            height: '20px',
            width: '380px',
            minHeight: '850px',
            border: '1px solid black',
            paddingTop: '85px',
          }}>
            <div style={{
              borderBottom: '1px solid black',
              paddingBottom: '30px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}>
              <h2>{ this.state.name }</h2>
            </div>

            <div style={{
              borderBottom: '1px solid black',
              paddingBottom: '30px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}>
              <h5>{ this.state.price }</h5>
            </div>

            <div style={{
              borderBottom: '1px solid black',
              paddingBottom: '30px',
              paddingLeft: '20px',
              paddingRight: '20px'
              }}>
              <h5>Description</h5>
              <h5>{ this.state.description }</h5>
            </div>

        </div>
      </Container>
    );
  }

}

export default Product;