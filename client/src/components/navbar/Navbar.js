import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BrandsComp from './Brands';
// import { Container, Row, Col } from 'react-awesome-styled-grid'

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
  font-family: 'Calibre';
  overflow: hidden;
  text-transform: uppercase;
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
  font-size: 13px;
  font-family: 'Separat';
  font-weight: 900;
`
const NavLink = styled.p`
  color: white;
  &:hover {
   color: gray;
  }
`;
const Sections = styled.div`
  position: fixed;
  height: 300px;
  display: flex;
  border-right: 1px solid peru;
  /* background: orange; */
`;

class Navbar extends React.Component {

  render() {
    const options =  ['brands', 'categories', 'releases'].map((link) => {
      return(
        <Link
          to={`${link}`}
          style={{
            textDecoration:'none',
            marginLeft: '25px'
          }}>
          <NavLink>{`${link}`}</NavLink>
        </Link>
      );
    })

    return (
      <div>
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
        <Sections>
          <BrandsComp/>
        </Sections>
      </div>
    )
  }
}

export default Navbar;