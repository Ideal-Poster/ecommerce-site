import React from 'react';
import styled from 'styled-components';

const CategoriesSections = styled.div`
  position: relative;
  border-right: 1px solid #565656;
  height: 100%;
  width: 33.333vw;
  /* background: #f7f7f7; */
  background: orange;
  overflow: hidden;
  z-index: 10000;
`;
const Categories = styled.div`
  height: 100px;
  background: orange;
  position: fixed;
  display: flex;
  opacity: 0;
`;
// const Brand = styled.li`
//   list-style: none;
// `;

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