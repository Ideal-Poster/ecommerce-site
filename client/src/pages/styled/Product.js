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
`;

export const ImageSelect = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const ProductSidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 380px;
  min-height: 950px;
  border: 1px solid black;
  padding-top: 85px;
`;

export const SubContainer = styled.div`
  border-bottom: 1px solid black;
  padding-left: 20px;
  padding-right: 20px;
`;

export const SizeButton = styled.div`
  position: relative;
  border: 1px solid black;
  width: 33.333%;
  height: 35px;
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
`;

export const SizeButtonGreyedOut = styled.div`
  position: relative;
  border: 1px solid grey;
  width: 33.333%;
  height: 35px;
  background: lightgrey;
  color: white;
`;

export const SizeButtonText = styled.p`
  position: relative;
  font-size: 12px;
  height: 100%;
  text-align: center;
  margin: 7px 0px 0px 0px;
  cursor: default;
`;

export const AddToCartButton = styled.button`
  width: 125px;
  margin-top: 20px;
  margin-left: 5px;
  background: black;
  height: 35px;
  color: white;
`;


