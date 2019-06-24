import React from 'react';
import Strapi from 'strapi-sdk-javascript';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-awesome-styled-grid';

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
                id
                name
                description
                images {
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
    return (
      <Container>
        <Row>
          {
            this.state.products.map((product) => (
              <Col debug xs={2} sm={2}>
                <Link to={`/product/${product.id}`}>
                  <div>
                    <div style={{height: '100%', background: 'yellow'}}>
                      <img style={{width: '100%'}} src={`${apiUrl}${product.images[0].url}`} alt={`${product.name}`}/>
                    </div>
                    <h4 style={{ bottom: '0', position: 'relative', verticalAlign: 'center' }}>{product.name}</h4>
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


export default Categories;