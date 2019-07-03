import React from 'react';
import Strapi from 'strapi-sdk-javascript';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { ProductContainer, ProductMargin, ProductView, ImageSelect } from './styled/Product';

const strapi = new Strapi('');

class Product extends React.Component {
  state = {
    product: {
      name: '',
      price: 0,
      images: [],
      description: ''
    },
    imageSelect: 0,
    cartItems: []
  };

  async requestProduct() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            product(id: "${this.props.match.params.productId}") {
              _id
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
        product: {
          name,
          price,
          images,
          description
        }
      });
      // console.log('product', this.state.images[0].url);
    } catch (error) {
      console.log('hello',error);
    }
  }

  addToCart = product => {
    const alreadyInCart = this.state.cartItems.findIndex(
      item => item._id === product._id
    );
    if (alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...product,
        quantity: 1
      });
      this.setState({ cartItems: updatedItems });
    } else {
      const updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ cartItems: updatedItems});
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
          src={`${this.state.product.images[i].url}`} alt="" />
      </Col>
    );
  }

  render() {
    const { name, price, images, description } = this.state.product;
    // console.log(images[this.state.imageSelect]);

    return(
      <Container fluid={true}>
        <ProductContainer>
          { images.length > 0 &&
            <ProductMargin>
              <ProductView image={`url(${images[this.state.imageSelect].url})`}/>
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
              <h2>{ name }</h2>
            </div>

            <div style={{
              borderBottom: '1px solid black',
              paddingBottom: '30px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}>
              <h5>{ price }</h5>
            </div>

            <div style={{
              borderBottom: '1px solid black',
              paddingBottom: '30px',
              paddingLeft: '20px',
              paddingRight: '20px'
              }}>
              <h5>Description</h5>
              <h5>{ description }</h5>
            </div>

            <button onClick={ () => this.addToCart(this.state.product) }>Add To Cart</button>

        </div>
      </Container>
    );
  }

}

export default Product;