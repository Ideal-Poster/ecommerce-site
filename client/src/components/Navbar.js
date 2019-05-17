import React from 'react';
import styled from 'styled-components';

const height = 60;
const heightString = height.toString() + 'px';

const Navigation =  styled.div`
  display: flexbox;
  background: #040404;
  height: ${heightString};
  width: 100%;
  > * {
    display: flex;
  }
`
const IconContainer = styled.div`
  border-right: 1px solid grey;
`
const Icon = styled.h2`
  color: white;
  margin: 0;
  height: 100%;
  width: 130px;
  transform: translateY(50%);
  text-transform: uppercase;
  text-align: center;
`

class Navbar extends React.Component {
  render() {
    return (
      // <Bar>
        <Navigation>
          <IconContainer>
            <Icon>
              Rebel
            </Icon>
          </IconContainer>
        </Navigation>
      // </Bar>å
    )
  }
}

export default Navbar;