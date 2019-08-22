import React from 'react';
import { Row, Col } from '@bootstrap-styled/v4';

export const TitleText = (props) => {
  const {title} = props
  return(
    <Row>
      <Col sm={12}>
        <h1>{title}</h1>
      </Col>
    </Row>
  )
}

export default TitleText;