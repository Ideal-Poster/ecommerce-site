import React from 'react';
import Strapi from 'strapi-sdk-javascript';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);


class Brands extends React.Component {
  state = {
    products: [],
    brandName: this.props.match.params.brand

  }
  brand: {};
  brands = [];

  async componentDidUpdate() {
    const pathBrand = this.props.match.params.brand;
    if (this.state.brandName !== pathBrand) {
      await this.setState({ brandName: pathBrand });
      this.getProducts();
    }
  }

  async requestBrandIds() {
    let response;
    try {
      response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            brands {
              _id
              name
            }
          }`
        }
      });
    } catch (error) {
      console.log(error);
    }
    this.brands = response.data.brands;
    // console.log(this.brands);

  }

  async requestBrandProducts() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `{
            brand(id: "${this.brand._id}") {
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
        products: response.data.brand.products
      });

      // console.log(this.state.products);

    } catch (error) {
      console.log(error);
      this.setState({ products: [] });
    }
  }

  setBrandState() {
    const brand = this.brands.find((brd) => {
      return brd.name.toLowerCase() ===
             this.state.brandName.toLowerCase()
    });

    this.brand = brand;
  }

  async getProducts() {
    await this.setBrandState();
    await this.requestBrandProducts();
  }

  async componentDidMount() {
    await this.requestBrandIds();
    this.getProducts();
  }

  render() {
    return(
      <div>
        {
          this.state.products.map((product) => (
            <div>
              <img src={`${apiUrl}${product.image.url}`} alt={`${product.name}`}/>
              <h4>{product.name}</h4>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Brands;