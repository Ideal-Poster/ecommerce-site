import React from 'react';
import {
  Brands,
  BrandsSections,
  Brand,
  FeaturedBrand
} from './styled/Brands';
import { Link } from 'react-router-dom';

class BrandsDropdown extends React.Component {

  render() {
    const brandNames = ['Nike', 'Puma', 'Converse', 'Adidas', 'North Face'].map((brand, i) => (
      <Link to={`/brands/${brand.toLowerCase()}/`}>
        <Brand key={`brand-${i}`}>{ brand }</Brand>
      </Link>
    ));
    return(
      <Brands className="brandsComp">
        <BrandsSections>
          <ul>
            {brandNames}
          </ul>
        </BrandsSections>

        <BrandsSections/>

        <BrandsSections>
          <FeaturedBrand src={require("../../static/shalom-mwenesi-701767-unsplash.jpg")}/>
        </BrandsSections>

        <BrandsSections/>
      </Brands>
    );
  }
}

export default BrandsDropdown;