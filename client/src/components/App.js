import React from 'react';
import { Container, Row, Col } from 'react-awesome-styled-grid'

const App = () =>  {

  return (
    <Container>
      <Row>
        <Col xs={4} md={2}>Col A</Col>
        <Col xs={4} md={6}>Col B</Col>
      </Row>
    </Container>
  );
}

export default App;
