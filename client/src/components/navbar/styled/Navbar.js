import styled from 'styled-components';

export const Navigation = styled.div`
  width: 100%;
  color: #fff;
  background: black;
  display: flex;
  align-items: center;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1;
  font-family: 'Calibre';
  overflow: hidden;
  text-transform: uppercase;
`
export const IconContainer = styled.div`
  border-right: 1px solid #343434;
  text-align: center;
  width: 130px;
`
export const Icon = styled.h2`
  color: white;
  height:  100%;
`
export const Selections = styled.div`
  flex: 1;
  display: flex;
  font-size: 13px;
  font-family: 'Arial Monospaced MT Std';
  font-weight: 900;
`
export const NavLink = styled.p`
  transition: color 0.25s;
  color: white;
  padding-top: 5px;
  height: 100%;
  &:hover {
   color: gray;
  }
  text-decoration: none;
  margin-left: 25px;
  cursor: pointer;
`;

export const Sections = styled.div`
  position: fixed;
  display: flex;
  border-right: 1px solid peru;
  z-index: 10000;
`;

export const DropdownText = styled.li`
  list-style: none;
`;

export const DropdownImage = styled.img`
  width: 100%;
`;

export const CartImage = styled.img`
  height: 70px;
  display: inline-block;
`

export const CartInfo = styled.p`
  display: inline-block;
  padding-left: 20px;
`