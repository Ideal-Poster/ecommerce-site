import React from 'react';
import { Container, Row, Col } from '@bootstrap-styled/v4';

import { 
  ProductContainer, 
  ProductMargin, 
  ProductView, 
  ImageSelect,
  ProductSidebarContainer,
  SubContainer
} from './styled/Product';

import { requestProduct } from '../requests';
import Dropdown from '../Dropdown';

class Product extends React.Component {
  state = {
    product: {
      id: this.props.match.params.productId,
      name: '',
      price: 0,
      images: [],
      description: ''
    },
    imageSelect: 0,
    cartItems: [],
    dropdown: true
  };

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

  deleteItemFromCart = itemToDeleteId => {
    const filteredItems = this.state.cartItems.filter(
      item => item._id !== itemToDeleteId
    );
    this.setState({ cortItems: filteredItems });
  }

  selectImage = i => {
    this.setState({ imageSelect: i });
  }

  async componentDidMount() {
    const product = await requestProduct(this.state);
    this.setState({ product });
  }

  renderImageSelection(i) {
    return(
      <Col sm={4}>
        <ImageSelect
          onClick={ () => this.selectImage(i) }
          src={`${this.state.product.images[i]}`} alt="" />
      </Col>
    );
  }

  render() {
    const { name, price, images, description } = this.state.product;
    const { imageSelect } = this.state;

    return(
      <Container fluid={true}>
        <ProductContainer>
          {
            images.length > 0 &&
            <ProductMargin>
              <ProductView image={`url(${images[imageSelect]})`}/>
              <Row>
                { images.map((url, i) => ( images && this.renderImageSelection(i))) }
              </Row>
            </ProductMargin>
          }
      </ProductContainer>
        <ProductSidebarContainer>
          <SubContainer>
            <h2>{ name }</h2>
          </SubContainer>

          <SubContainer>
            <h5>{ price }</h5>
          </SubContainer>

          <SubContainer>
            <h5>Description</h5>
            <h5>{ description }</h5>
          </SubContainer>

          <SubContainer>
            <Dropdown dropdown={this.state.dropdown}/>
            <br/>
            <button onClick={ () => this.addToCart(this.state.product) }>Add To Cart</button>
          </SubContainer>

        </ProductSidebarContainer>
      </Container>
    );
  }
}

export default Product;