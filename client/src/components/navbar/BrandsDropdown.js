import React from 'react';
import { QuadSection, QuadDropdown } from './styled/Brands';
import { Link } from 'react-router-dom';
import { DropdownText, DropdownImage } from './styled/Navbar';

class BrandsDropdown extends React.Component {

  render() {
    const brandNames = ['Nike', 'Puma', 'Converse', 'Adidas', 'North Face'].map((brand, i) => (
      <Link to={`/brands/${brand.toLowerCase()}/`}>
        <DropdownText key={`brand-${i}`}>{ brand }</DropdownText>
      </Link>
    ));
    return(
      <QuadDropdown className="brandsComp">
        <QuadSection>
          <ul>
            {brandNames}
          </ul>
        </QuadSection>

        <QuadSection/>

        <QuadSection>
          <DropdownImage src={require("../../static/shalom-mwenesi-701767-unsplash.jpg")}/>
        </QuadSection>

        <QuadSection/>
      </QuadDropdown>
    );
  }
}

export default BrandsDropdown;