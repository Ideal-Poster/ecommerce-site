import React from 'react';
import { Categories, CategoriesSections } from './styled/Categories'

class CategoriesComp extends React.Component {
  render() {
    // const brandNames = ['Nike', 'Puma', 'Converse', 'Adidas', 'North Face'].map((brand, i) => {
    //   return <Brand key={`brand-${i}`}>{ brand }</Brand>
    // });
    return(
      <Categories className="categoriesComp">
        <CategoriesSections>
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