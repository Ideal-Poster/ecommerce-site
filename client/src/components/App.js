import React from 'react';
import styled from 'styled-components';
// import { Container, Row, Col } from 'react-awesome-styled-grid'
const Carousel = styled.div`
  /* ... */
`;

const Image1 = styled.img`
  /* ... */
  /* height: 100vh; */
  width: 100vw;
`;



const App = () =>  {
  return (
    <Carousel>
      <Image1 src="https://hypebeast.com/image/2019/05/butter-goods-q2-2019-collection-lookbook-release-3.jpg"></Image1>
    </Carousel>
  );
}

export default App;
