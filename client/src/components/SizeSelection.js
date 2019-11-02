import React from 'react';
import {
  DropdownItem,
  Row
} from '@bootstrap-styled/v4';
import { requestProductSizes } from './requests';
import { SizeButton, SizeButtonText } from './pages/styled/Product';

class Dropdown extends React.Component { 
  constructor(props) {
    super(props);
    this.props = props;
  }

  async componentDidMount() {
    let sizes = await requestProductSizes(this.props.state);
    await this.props.setSizesState(sizes);
    this.props.selectSize('small');
  }

  render() {
    const { sizes, selectedSize } = this.props.state;
    return(
      <div>
        <Row style={{
          paddingTop: '20px'
        }}>
          {
            sizes &&
            Object.entries(sizes).map((entry, i) => {
              if (selectedSize === entry[0]) {
                return(
                  <SizeButton
                    primary
                    className="size"
                    id={`sizeOption-${i}`}>
                      <SizeButtonText>{ entry[0].toUpperCase() }</SizeButtonText>
                  </SizeButton>
                )
              } else {
                return(
                  <SizeButton
                    className="size"
                    id={`sizeOption-${i}`}>
                      <SizeButtonText>{ entry[0].toUpperCase() }</SizeButtonText>
                  </SizeButton>
                )
              }

            })
          }
        </Row>
      </div>
    )
  }
};

export default Dropdown;


