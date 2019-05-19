import React from 'react';
import styled from 'styled-components';


const BrandsSections = styled.div`
  /* padding: 60px 0 0 0; */
  /* opacity: 0; */
  position: relative;
  border-right: 1px solid #565656;
  height: 100%;
  width: 25vw;
  background: grey;
  overflow: hidden;
  /* display: none; */
`;
const Brands = styled.div`
  height: 100%;
  display: flex;
  opacity: 0;

`;

const Brand = styled.li`
  list-style: none;
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
        </BrandsSections>

        <BrandsSections>
        </BrandsSections>
      </Brands>
    );
  }
}
export default BrandsComp;