import React from 'react';
import Strapi from 'strapi-sdk-javascript';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-awesome-styled-grid';

import { selectProduct } from '../../actions';



const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Categories extends React.Component {
  state = {
    products: [],
    categoryName: this.props.match.params.cat
  };
  category: {};
  categories = [];

  async componentDidUpdate() {
    const pathCategory = this.props.match.params.cat;
    if (this.state.categoryName !== pathCategory) {
      await this.setState({ categoryName: pathCategory });
      this.getProducts();
    }
  }

  async requestCategoryIds() {
    let response;
    try {
      response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            categories {
              _id
              name
            }
          }`
        }
      });
      this.categories = response.data.categories;
    } catch (error) {
      console.log(error);
    }
  }

  async requestCategoryProducts() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            category(id: "${this.category._id}") {
              name
              products {
                name
                description
                image {
                  url
                }
              }
            }
          }`
        }
      });

      this.setState({
        products: response.data.category.products
      });
      // console.log('products',response);
    } catch (error) {
      console.log(error);
      this.setState({ products: [] });
    }
  }

  setCategoryState() {
    {
      const category = this.categories.find((cat) => {
        return cat.name.toLowerCase() === this.state.categoryName.toLowerCase()
      });

      this.category = category;
    }
  }

  async getProducts() {
    await this.setCategoryState();
    this.requestCategoryProducts();
  }

  async componentDidMount() {
    await this.requestCategoryIds();
    this.getProducts();
    // console.log(this.category);
  }

  render() {
    console.log(this.props.productId);
    
    return (
      <Container>
        <Row>
          {
            this.state.products.map((product) => (
              <Col debug xs={2} sm={2}>
                <Link>
                  <div>
                    <img style={{width: '100%'}} src={`${apiUrl}${product.image.url}`} alt={`${product.name}`}/>
                    <h4>{product.name}</h4>
                  </div>
                </Link>
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    productId: state.productId
  }
};

export default connect(mapStateToProps,{ selectProduct })(Categories);