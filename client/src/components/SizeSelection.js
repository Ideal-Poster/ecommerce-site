import React from 'react';
import { Row } from '@bootstrap-styled/v4';
// import { requestProductApparelSizes } from './requests';
import { SizeButton, SizeButtonText } from './pages/styled/Product';

class SizeSelection extends React.Component { 
  constructor(props) {
    super(props);
    this.props = props;
  }

  soldOut(sizes) {
    let array = [];
    Object.entries(sizes).forEach((entry) => {
      entry[1] > 0 ? array.push(false) : array.push(true)
    }); 
    return !array.includes(false)
  }

  render() {
    const { sizes, selectedSize, product } = this.props.state;
    return(
      <div>
        <Row style={{ paddingTop: '20px' }}>
          { 
            this.soldOut(sizes) &&
            <p style={{ paddingLeft: '20px' }}>sold out</p>
          }
          {
            sizes &&
            Object.entries(sizes).map((entry, i) => {
              if (selectedSize === entry[0]) {
                if (entry[1] > 0) {
                  return(
                    <SizeButton
                      primary
                      className="size"
                      id={`sizeOption-${i}`}>
                        <SizeButtonText>{ entry[0].toUpperCase() }</SizeButtonText>
                    </SizeButton>
                  )
                }
              } else {
                if (entry[1] > 0) {
                  return(
                    <SizeButton
                      className="size"
                      id={`sizeOption-${i}`}>
                        <SizeButtonText>{ entry[0].toUpperCase() }</SizeButtonText>
                    </SizeButton>
                  )
                }
              }
            })
          }
        </Row>
        {/* <button onClick={ () => {this.props.addToCart(product)}}>Add To Cart</button> */}

      </div>
    )
  }
};

export default SizeSelection;


