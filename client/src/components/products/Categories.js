import React from 'react';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Categories extends React.Component {
  state = {
    categories: []
  };

  async componentDidMount() {
    try {
      const response = strapi.request('POST', '/graphql', {
        data: {
          query: `{
            brands {
              products {
                name
                description
                brand {
                  name
                  image {
                    url
                  }
                }
              }
            }
          }`
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {

        }
        <p>Categories</p>
      </div>
    );
  }
}

export default Categories;