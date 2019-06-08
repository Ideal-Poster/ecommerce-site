import React from 'react';
import Strapi from 'strapi-sdk-javascript';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);


class Brands extends React.Component {
  state = {
    brands: []
  }

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql',{
        data: {
          query: `{
            brands{
              _id
              name
              description
              image {
                url
              }
            }
          }`
        }
      });
      console.log(response);
      this.setState({brands: response.data.brands})
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { brands } = this.state;
    return(
      <div>
        {brands.map(brand => (
          <img src={`${apiUrl}${brand.image.url}`} alt="hello"/>
        ))}
      </div>
    )
  }
}

export default Brands;