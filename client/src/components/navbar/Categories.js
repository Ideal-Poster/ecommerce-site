import React from 'react';
import styled from 'styled-components';

const CategoriesSections = styled.div`
  position: relative;
  border-right: 1px solid #565656;
  height: 100%;
  width: 25vw;
  background: orange;
  overflow: hidden;
`;
const Categories = styled.div`
  height: 100%;
  background: orange;

  display: flex;
  /* opacity: 0; */
`;
const Brand = styled.li`
  list-style: none;
`;

class CategoriesComp extends React.Component {

  render() {
    // const brandNames = ['Nike', 'Puma', 'Converse', 'Adidas', 'North Face'].map((brand, i) => {
    //   return <Brand key={`brand-${i}`}>{ brand }</Brand>
    // });
    return(
      <Categories className="categoriesComp">
        <CategoriesSections>
          {/* <ul>
            {brandNames}
          </ul> */}
        </CategoriesSections>

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