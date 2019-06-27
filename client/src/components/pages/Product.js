import React from 'react';
import Strapi from 'strapi-sdk-javascript';
import styled from 'styled-components';

import { Container, Row, Col } from 'styled-bootstrap-grid';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

const ProductView = styled.img`
  position: relative;
  width: 100%;
  padding-left: 100px;
  padding-right: 100px;
  max-width: 700px;
  margin: auto;
`;

const ImageSelect = styled.img`
  width: 100%;
  margin-left: ${ props => props.marginLeft || 0 };
  cursor: pointer;
  /* max-width: 220px; */
`;

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
    if (i === 0 || i === 3) {
      return(
        <Col sm={4}
          style={{ paddingLeft: '40px', paddingRight: '40px' }}
          onClick={ () => this.selectImage(i) } >
          <ImageSelect marginLeft={'30px'} src={`${apiUrl}${this.state.images[i].url}`} alt="" />
        </Col>
      );
    }
    else if(i === 1 || i === 4) {
      return(
        <Col sm={4}
          style={{ paddingLeft: '40px', paddingRight: '40px' }}
          onClick={ () => this.selectImage(i) } >
            <ImageSelect src={`${apiUrl}${this.state.images[i].url}`} alt="" />
        </Col>
      );
    } else {
      return(
        <Col sm={4}
          style={{ paddingLeft: '40px', paddingRight: '40px' }}
          onClick={ () => this.selectImage(i) } >
          <ImageSelect marginLeft={'-30px'} src={`${apiUrl}${this.state.images[i].url}`} alt="" />
        </Col>
      );
    }
  }

  render() {
    // console.log(this.props.match.params.productId);
    const { name, price, images, description } = this.state;

    return(
      <Container fluid={true}>
        <div style={{ width: 'calc(100vw - 400px)', border: '1px solid black' }}>
          <Row>
            { images[0] &&
                <ProductView src={`${apiUrl}${this.state.images[this.state.imageSelect].url}`} alt=""/> }
          </Row>
          <div style={{ maxWidth: '750px', margin: 'auto'}}>
            <Row>
              { images.map((url, i) => ( images && this.renderImageSelection(i))) }
            </Row>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '0',
            right:'0',
            height: '20px',
            width: '380px',
            minHeight: '850px',
            border: '1px solid black'
          }}
        />
      </Container>
    );
  }

}

export default Product;