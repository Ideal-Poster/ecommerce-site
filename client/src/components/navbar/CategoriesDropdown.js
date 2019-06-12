import React from 'react';
import { Categories, CategoriesSections, CategoryItem } from './styled/Categories'
import { Link } from 'react-router-dom';

class CategoriesDropdown extends React.Component {
  render() {
    const categories = ['Shoes', 'Hats', 'Tops', 'Bottoms'].map((categories, i) => (
      <Link to={`/categories/${categories.toLowerCase()}/`}>
        <CategoryItem key={`category-${i}`}>{ categories }</CategoryItem>
      </Link>
    ));

    return(
      <Categories className="categoriesComp">
        <CategoriesSections>
          <ul>
            { categories }
          </ul>
        </CategoriesSections>

        <CategoriesSections>
        </CategoriesSections>

        <CategoriesSections>
        </CategoriesSections>
      </Categories>
    );
  }
}
export default CategoriesDropdown;