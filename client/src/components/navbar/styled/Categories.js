import styled from 'styled-components';

export const Categories = styled.div`
  height: 250px;
  position: fixed;
  display: flex;
  opacity: 0;
  background: orange;
`;
 export const CategoriesSections = styled.div`
  position: relative;
  border-right: 1px solid #565656;
  height: 100%;
  width: 33.333vw;
  background: orange;
  overflow: hidden;
  z-index: 10000;
`;

export const CategoryItem = styled.li`
  list-style: none;
`;