import React from 'react';
import Strapi from 'strapi-sdk-javascript';
import { Container, Row, Col } from 'react-awesome-styled-grid';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Product extends React.Component {
  state = {
    name: '',
    price: 0,
    images: [],
    description: ''
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
  componentDidMount() {
    this.requestProduct();
  }
  render() {
    // console.log(this.props.match.params.productId);
    const { name, price, images, description } = this.state;
    console.log(images);


    return(
      <Container>
        <Row>
          <Col xs={4} sm={4} style={{background:'yellow'}}>
            {
              images[0] &&
              <img style={{width: '100%'}} src={`${apiUrl}${this.state.images[0].url}`} alt=""/>
            }
          </Col>
        </Row>
        <Row>
          <Col xs={1} sm={1} style={{background:'yellow'}}>
            { images[0] &&
              <img style={{width: '100%'}} src={`${apiUrl}${this.state.images[0].url}`} alt=""/>
            }
          </Col>
        </Row>
      </Container>
    );
  }

}

export default Product;