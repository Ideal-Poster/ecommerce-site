import React from 'react';
import { TriDropdown, TriSection } from './styled/Categories'
import { Link } from 'react-router-dom';
import { DropdownText } from './styled/Navbar';

import { requestCategories } from '../requests';

class CategoriesDropdown extends React.Component {
  state = { categories: [] };

  async componentDidMount() {
    const categoriesRequest = await requestCategories();
    let categories = [];
    categoriesRequest.forEach((category) => categories.push(category.name));
    this.setState({ categories });
  };

  render() {
    const { categories } = this.state;
    const categoryNames = categories.map((category, i) => (
      <Link 
        style={{ textDecoration: 'none'}}
        key={`category-${i}`}
        to={`/categories/${category}/`}>
        <DropdownText>{ category }</DropdownText>
      </Link>
    ));
    return(
      <TriDropdown id="categories-dropdown">
        <TriSection>
          <ul>
            { categoryNames }
          </ul>
        </TriSection>
        <TriSection/>
        <TriSection/>
      </TriDropdown>
    );
  }
}
export default CategoriesDropdown;