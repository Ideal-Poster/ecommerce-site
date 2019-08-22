import styled from 'styled-components';

export const GridUnitText = styled.p`
  font-size: 12px;
  margin: 0;
  text-decoration: none;
  color: black;
`;

export const GridUnitImg = styled.img`
  width: 100%;
  src: url(${props => props.src});
`;

export const GridUnitImgContainer = styled.div`
  border: 1px solid #e1e1e1;
  padding: 10px;
  margin-bottom: 10px;
`

export const GridUnitContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`