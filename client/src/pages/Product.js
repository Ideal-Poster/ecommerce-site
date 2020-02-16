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
  footwearStock
} from '../components/requests';
import SizeSelection from '../components/SizeSelection';

import { connect } from 'react-redux';
import { addToCart, setCartFromStorage } from '../actions/index';
import { setCart } from '../utilities';

class Product extends React.Component {
  state = {
    product: {
      id: this.props.match.params.productId,
      name: '',
      price: 0,
      images: [],
      description: '',
      size: null
    },
    imageSelect: 0,
    cartItems: [],
    dropdown: true,
    sizes: {},
    notice: false
  };

  componentDidMount() {
    this.getProductSizes();
  }

  async getProductSizes() {
    const apparelSizeCategories = ['Tops', 'Bottoms', 'Jackets'];
    const product = await requestProduct(this.state);
    let sizes;
    if(product.category === "Footwear") {
      sizes = await footwearStock(this.state);
    }
    if(apparelSizeCategories.includes(product.category)) {
      sizes = await requestProductApparelSizes(this.state);
    }    
    if (sizes) delete sizes.__typename;
    this.setState({ product, sizes });
  }

  selectSize(size) {
    let product = this.state.product;
    product = { ...product, size };
    this.setState({ product }); 
  }

  dropdownToggle() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  addToCart = async product => {
    if(this.state.product.size) {
      await this.props.addToCart(product);
      setCart(this.props.cart);
      this.setState({notice: false});
    } else {
      this.setState({notice: true});
    }
  }

  selectImage = i => {
    this.setState({ imageSelect: i });
  }

  renderImageSelection(i) {
    return(
      <Col
        sm={4}
        key={ `${this.state.product.name}image-${i}` }>
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
              addToCart={() => this.addToCart(product)}
              selectSize={size => this.selectSize(size)}/>
            <br/>
          </SubContainer>

          {
          this.state.notice &&
            <p>Please Select a size</p>
          }
          <button onClick={ () => this.addToCart(product) }>poop</button>
          <button onClick={ () => localStorage.clear() }>Clear localStorage</button>

        </ProductSidebarContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps, { addToCart , setCartFromStorage })(Product);