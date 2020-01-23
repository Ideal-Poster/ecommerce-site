import React from 'react';
import { Row } from '@bootstrap-styled/v4';
import { SizeButton, SizeButtonText, SizeButtonGreyedOut } from './pages/styled/Product';

class SizeSelection extends React.Component { 
  state = { oneSize: false };
  constructor(props) {
    super(props);
    this.props = props;
  }

  soldOut = () => {
    let array = [];
    const sizes =  this.props.state.sizes;    
    if(sizes) {
      Object.entries(sizes).forEach((entry) => {
        entry[1] > 0 ? array.push(false) : array.push(true)
      });
      return !array.includes(false)
    }
    if (this.state.oneSize === false) this.setState({oneSize: true})
    return false
  }

  selectSize = size => {
    this.props.selectSize(size)
  }

  renderButton = (sizes, size) => {
    return  sizes &&
            Object.entries(sizes).map((entry, i) => {
              if (size === entry[0]) {
                return <SizeButton
                          primary
                          key={ entry + '-button' }
                          className="size"
                          id={`sizeOption-${i}`}>
                          <SizeButtonText>{ entry[0].toUpperCase() }</SizeButtonText>
                        </SizeButton> 
              } else {
                if (!this.soldOut()) {
                  if (entry[1] > 0) {
                    if (this.state.oneSize) this.props.selectSize(entry[0]);
                    return  <SizeButton
                              className="size"
                              key={ entry + '-button' }
                              id={`sizeOption-${i}`}
                              onClick={() => this.props.selectSize(entry[0])}>
                              <SizeButtonText>{ entry[0].toUpperCase() }</SizeButtonText>
                            </SizeButton>
                    
                  } else {
                    return  <SizeButtonGreyedOut
                              key={ entry + '-button' }>
                              <SizeButtonText>{ entry[0].toUpperCase() }</SizeButtonText>
                            </SizeButtonGreyedOut>
                  }
                }
              }
            });
  }

  render() {
    const { sizes} = this.props.state;
    const { size } = this.props.state.product;
    
    return(
      <div>
        <Row style={{ paddingTop: '20px' }}>
          { 
            this.soldOut() &&
            <p style={{ paddingLeft: '20px' }}>sold out</p>
          }

          {
            this.state.oneSize &&
            this.renderButton({oneSize: 1}, size)
          }
          
          { this.renderButton(sizes, size) }
        </Row>
        {/* <button onClick={ () => {this.props.addToCart(product)}}>Add To Cart</button> */}

      </div>
    )
  }
};

export default SizeSelection;


