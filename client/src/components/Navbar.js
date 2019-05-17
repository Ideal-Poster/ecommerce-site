import React from 'react';
import styled from 'styled-components';
import { Link }from 'react-router-dom';

const Navigation =  styled.div`
  width: 100%;
  color: #fff;
  background: #000;
  display: flex;
  align-items: center;
  height: 60px;
  position: absolute;
  top: 0;
  z-index: 1;
  font-family: 'Elephant';
  overflow: hidden;
`
const IconContainer = styled.div`
  border-right: 1px solid #343434;
  text-align: center;
  width: 130px;
`
const Icon = styled.h2`
  color: white;
  height:  100%;
`
const Selections = styled.div`
  flex: 1;
  display: flex;
  padding-left:15px;
`
const NavLink = styled.p`
  color: white;
  font-size: 14px;
  &:hover {
   color: gray;
  }
`;

class Navbar extends React.Component {

  render() {
    const options =  ['brands', 'bategories', 'realeases'].map((link) => {
      return(
        <Link
          to={`${link}`}
          style={{
            textDecoration:'none',
            marginLeft: '15px',
            marginRight: '15px'}}>
          <NavLink>{`${link}`}</NavLink>
        </Link>
      );
    })

    return (
      <Navigation>
        <IconContainer>
          <Link to="/" style={{textDecoration: 'none'}}>
            <Icon>
              Rebel
            </Icon>
          </Link>
        </IconContainer>
        <Selections>
          {options}
        </Selections>
      </Navigation>
    )
  }
}

export default Navbar;