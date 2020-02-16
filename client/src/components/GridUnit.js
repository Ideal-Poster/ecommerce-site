import React from 'react';
import { Col } from '@bootstrap-styled/v4';

import { Link } from 'react-router-dom';

import { GridUnitContainer, GridUnitImgContainer, GridUnitImg, GridUnitText } from "../pages/styled/GridUnit";

const GridUnit = (props) => {
  const {product} = props;
  return(
    <Col sm={6} md={4} xl={3}>
      <Link to={`/product/${product.id}`}
        style={{ textDecoration: 'none' }}>
        <GridUnitContainer>
          <GridUnitImgContainer>
            <GridUnitImg src={`${product.images[0]}`} alt={`${product.name} ${product.category}`}/>
          </GridUnitImgContainer>

          <GridUnitText>{product.brand}</GridUnitText>
          <GridUnitText>{product.name}</GridUnitText>
          {
            product.price.toString().includes(".") ?
            <GridUnitText>{product.price}</GridUnitText> :
            <GridUnitText>$ {product.price}.00</GridUnitText>
          }
        </GridUnitContainer>
      </Link>
    </Col>
  )
};

export default GridUnit;