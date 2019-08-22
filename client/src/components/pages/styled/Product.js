import styled from 'styled-components';

export const ProductContainer = styled.div`
  width: calc(100vw - 400px);
`;

export const ProductMargin = styled.div`
  max-width: 600px;
  margin: auto;
`;

export const ProductView = styled.div`
  height: 0;
  width: 100%;
  padding-bottom: 85%;
  background-image: ${ props => props.image };
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 90%;
  /* border: 1px solid black; */
`;

export const ImageSelect = styled.img`
  width: 100%;
  cursor: pointer;
`;

// export const TitleText = styled.h1`

// `;
