import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '@bootstrap-styled/v4';

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
      // response = await strapi.request('POST', '/graphql', {
      //   data: {
      //     query: `{
      //       categories {
      //         _id
      //         name
      //       }
      //     }`
      //   }
      // });
      this.categories = response.data.categories;
    } catch (error) {
      console.log(error);
    }
  }

  async requestCategoryProducts() {
    try {
      // const response = await strapi.request('POST', '/graphql', {
      //   data: {
      //     query: `{
      //       category(id: "${this.category._id}") {
      //         name
      //         products {
      //           id
      //           name
      //           description
      //           images {
      //             url
      //           }
      //         }
      //       }
      //     }`
      //   }
      // });
      // this.setState({
      //   products: response.data.category.products
      // });
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
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          {
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
          }
        </Row>
      </Container>
    );
  }
}


export default Categories;