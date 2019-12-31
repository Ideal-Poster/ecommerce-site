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

import {
  requestProduct,
  requestProductApparelSizes,
  productSizeStockFootwear
} from '../requests';
import SizeSelection from '../SizeSelection';

class Product extends React.Component {
  state = {
    product: {
      id: this.props.match.params.productId,
      name: '',
      price: 0,
      images: [],
      description: '',
      size: ''
    },
    imageSelect: 0,
    cartItems: [],
    dropdown: true,
    sizes: {},
    selectedSize: null
  };

  async componentDidMount() {
    const apparelSizeCategories = ['Tops', 'Bottoms', 'Jackets'];
    const product = await requestProduct(this.state);
    // console.log(product.category);
    let sizes;
    if(product.category === "Footwear") {
      sizes = await productSizeStockFootwear(this.state);
    }
    if(apparelSizeCategories.includes(product.category)) {
      sizes = await requestProductApparelSizes(this.state);
    }    
    if (sizes) delete sizes.__typename;
    this.setState({ product, sizes });
    // Add click event listeners to size options
    const sizeNodeElements = document.getElementsByClassName('size');
    this.sizeElements = Array.apply(null, sizeNodeElements);
    this.sizeElements.forEach((sizeButton) => {
      const sizeButtonText = sizeButton.children[0].innerHTML.toLowerCase();
      sizeButton.addEventListener('click', () => this.selectSize(sizeButtonText));
    });
  }

  selectSize(size) {
    this.setState({ selectedSize: size });    
  }

  dropdownToggle() {
    this.setState({ dropdown: !this.state.dropdown });
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

  deleteItemFromCart = itemToDeleteId => {
    const filteredItems = this.state.cartItems.filter(
      item => item._id !== itemToDeleteId
    );
    this.setState({ cortItems: filteredItems });
  }

  selectImage = i => {
    this.setState({ imageSelect: i });
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
    const product = this.state.product
    const { name, price, images, description } = product;
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
            <SizeSelection
              state={this.state}
              addToCart={() => this.addToCart(product)}/>
            <br/>
            {/* <button onClick={ () => {this.addToCart(product)}}>Add To Cart</button> */}
          </SubContainer>

        </ProductSidebarContainer>
      </Container>
    );
  }
}

export default Product;