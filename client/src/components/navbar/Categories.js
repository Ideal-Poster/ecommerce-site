import React from 'react';
import { Categories, CategoriesSections, CategoryItem } from './styled/Categories'

class CategoriesComp extends React.Component {
  render() {
    const categories = ['Shoes', 'Hats', 'Tops', 'Bottoms'].map((categories, i) => (
      <CategoryItem key={`category-${i}`}>{ categories }</CategoryItem>
      // <li key={`navbrand-${i}`}>{brand}</li>
    ));
    console.log(this.props);

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
export default CategoriesComp;