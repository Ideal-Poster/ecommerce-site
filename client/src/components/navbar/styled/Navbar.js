import styled from 'styled-components';
import { LogIn } from 'styled-icons/boxicons-regular';
import { ShoppingCart } from 'styled-icons/fa-solid/ShoppingCart';
import { UserCircle } from 'styled-icons/boxicons-solid/UserCircle';

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
`;
export const IconContainer = styled.div`
  border-right: 1px solid #343434;
  text-align: center;
  width: 130px;
`;
export const Icon = styled.h2`
  color: white;
  height:  100%;
`;
export const Selections = styled.div`
  flex: 1;
  display: flex;
  font-size: 13px;
  font-family: 'Arial Monospaced MT Std';
  font-weight: 900;
`;
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
  color: black;
    &:hover {
      color: gray;
    }
`;

export const DropdownImage = styled.img`
  width: 100%;
`;

export const CartImage = styled.img`
  height: 70px;
  display: inline-block;
  padding-left: 10px;
`;

export const CartInfo = styled.p`
  position: relative;
  display: inline-block;
  padding-left: 20px;
  top: -10px;
`;

export const LogInIcon = styled(LogIn)`
  fontSize: 19px;
  height: 28px;
  position: absolute;
  right: 74px;
  top: 15px;
  paddingRight: 25px;
  color: white;
`;

export const CartIcon = styled(ShoppingCart)`
  cursor: pointer;
  height: 18px;
  position: absolute;
  right: 28px;
  top: 20px;
  paddingRight: 25px;
  z-index: 5000;
`;

export const UserIcon = styled(UserCircle)`
  fontSize: 19px;
  height: 28px;
  position: absolute;
  right: 70px;
  top: 15px;
  paddingRight: 25px;
  color: white;
`;

export const CartDropdown = styled.div`
  position: fixed;
  width: 450px;
  right: 0;
  opacity: 0;
  background: white;
  z-index: 4000;
  box-shadow: 0px 0px 8px;
`;

export const CartTotalCircle = styled.div`
  position: absolute;
   height: 18px;
   width: 18px;
   background: crimson;
   border-radius: 100px;
   right: 15px;
   z-index: 5000;
`;

export const CartTotalText = styled.p`
  font-size: 16px;
  position: absolute;
  top: -19px;
  right: 6px;
`;

