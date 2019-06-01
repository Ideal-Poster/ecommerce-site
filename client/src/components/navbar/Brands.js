import React from 'react';
import styled from 'styled-components';

const BrandsSections = styled.div`
  position: relative;
  border-right: 1px solid #787878;
  height: 100%;
  width: 25vw;
  background: #f7f7f7;
  overflow: hidden;
`;
const Brands = styled.div`
  position: fixed;
  height: 225px;
  display: flex;
  opacity: 0;
  position: fixed;
  * > {
    height: 60px;
  }
`;
const Brand = styled.li`
  list-style: none;
`;
const FeaturedBrand = styled.img`
  width: 100%;
`;

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