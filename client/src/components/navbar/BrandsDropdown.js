import React from 'react';
import { QuadSection, QuadDropdown } from './styled/Brands';
import { Link } from 'react-router-dom';
import { DropdownText, DropdownImage } from './styled/Navbar';

import { requestBrands } from '../requests';

class BrandsDropdown extends React.Component {
  state = { brands: [] };

  async componentDidMount() {
    let brandsRequest = [];
    brandsRequest = await requestBrands();
    let brands = [];
    brandsRequest.forEach((brand) => brands.push(brand.name));
    this.setState({ brands });
  };

  render() {
    const brandNames = this.state.brands.map((brand, i) => (
      <Link 
        style={{ textDecoration: 'none'}}
        key={`brand-${i}`}
        to={`/brands/${brand}/`}>
        <DropdownText >{ brand }</DropdownText>
      </Link>
    ));
    return(
      <QuadDropdown id="brands-dropdown">
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
  };
};

export default BrandsDropdown;