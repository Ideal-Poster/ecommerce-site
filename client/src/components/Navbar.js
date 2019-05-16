import React from 'react';
import styled from 'styled-components';

const Navigation = styled.div`
  background: grey;
`
class Navbar extends React.Component {
  render() {
    return (
      <Navigation>
        <p>Navbar</p>
      </Navigation>
    )
  }
}

export default Navbar;