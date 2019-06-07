import React from 'react';
import { 
  Brands,
  BrandsSections,
  Brand,
  FeaturedBrand
} from './styled/Brands'


class BrandsComp extends React.Component {

  render() {
    const brandNames = ['Nike', 'Puma', 'Converse', 'Adidas', 'North Face'].map((brand, i) => {
      return <Brand key={`brand-${i}`}>{ brand }</Brand>
    });
    return(
      <Brands className="brandsComp">
        <BrandsSections>
          <ul>
            {brandNames}
          </ul>
        </BrandsSections>

        <BrandsSections>
        </BrandsSections>

        <BrandsSections>
          <FeaturedBrand src={require("../../static/shalom-mwenesi-701767-unsplash.jpg")}/>
        </BrandsSections>

        <BrandsSections>
        </BrandsSections>
      </Brands>
    );
  }
}

export default BrandsComp;