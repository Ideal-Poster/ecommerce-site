import React from 'react';
import styled from 'styled-components';
import { Link }from 'react-router-dom';

const height = 60;
const heightString = height.toString() + 'px';

const Navigation =  styled.div`
  background: #000000;
  position: fixed;
  top: 0;
  font-family: 'Elephant';
  display: flexbox;
  height: ${heightString};
  width: 100%;
  > * {
    display: flex;
  }
`
const IconContainer = styled.div`
  border-right: 1px solid #343434;
  position: relative;
  width:130px;
`
const Icon = styled.h2`
  /* font-size: 14px; */
  position: absolute;
  text-align: center;
  color: white;
  height: 100;
  width:100%;
  margin: 0;
  text-transform: uppercase;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`
const Selections = styled.div`
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
`
const NavLink = styled.p`
  position: relative;
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  margin: 0;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const LinkContainer = styled.div`
  height: ${heightString};
  margin-left: 15px;
  margin-right: 15px;
  /* background: pink; */
`;

class Navbar extends React.Component {

  render() {
    const options =  ['brands', 'bategories', 'realeases'].map((link) => {
      return(
        <Link to={`${link}`} style={{textDecoration: 'none'}}>
          <LinkContainer>
            <NavLink>{`${link}`}</NavLink>
          </LinkContainer>
        </Link>
      );
    })

    return (
      <Navigation>
        <IconContainer>
          <Link to="/">
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