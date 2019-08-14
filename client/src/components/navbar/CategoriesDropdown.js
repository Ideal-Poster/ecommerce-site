import React from 'react';
import { TriDropdown, TriSection } from './styled/Categories'
import { Link } from 'react-router-dom';
import { DropdownText } from './styled/Navbar';

class CategoriesDropdown extends React.Component {
  render() {
    const categories = ['Shoes', 'Hats', 'Tops', 'Bottoms'].map((category, i) => (
      <Link to={`/categories/${category.toLowerCase()}/`}>
        <DropdownText key={`category-${i}`}>{ category }</DropdownText>
      </Link>
    ));

    return(
      <TriDropdown className="categoriesComp">
        <TriSection>
          <ul>
            { categories }
          </ul>
        </TriSection>
        <TriSection/>
        <TriSection/>
      </TriDropdown>
    );
  }
}
export default CategoriesDropdown;