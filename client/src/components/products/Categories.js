import React from 'react';
import Strapi from 'strapi-sdk-javascript';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Categories extends React.Component {
  state = {
    products: []
  };

  async componentDidMount() {
    this.category = {};
    this.categories = [];
    this.categoryName = this.props.match.params.cat;

    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            categories {
              _id
              name
            }
          }`
        }
      });
      // console.log(response);
      this.categories = response.data.categories;
    } catch (error) {
      console.log(error);
    }

    this.category = this.categories.find((cat) => {
      return cat.name === this.categoryName
    })

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
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <p>Categories</p>
      </div>
    );
  }
}

export default Categories;