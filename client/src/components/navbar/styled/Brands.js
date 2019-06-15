import styled from 'styled-components';

export const Brands = styled.div`
  height: 250px;
  position: fixed;
  display: flex;
  opacity: 0;
`;

export const BrandsSections = styled.div`
  position: relative;
  border-right: 1px solid #787878;
  height: 100%;
  width: 25vw;
  background: #f7f7f7;
  overflow: hidden;
  z-index: 1000;
`;

export const Brand = styled.li`
  list-style: none;
`;

export const FeaturedBrand = styled.img`
  width: 100%;
`;