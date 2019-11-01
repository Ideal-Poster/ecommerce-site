import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row
} from '@bootstrap-styled/v4';
import { requestProductSizes } from './requests';

class Dropdown extends React.Component { 
  constructor(props) {
    super(props);
    this.props = props;
  }

  async componentDidMount() {
    let sizes = await requestProductSizes(this.props.state);
    await this.props.setSizeState(sizes);
    this.props.selectSize('small');
  }

  renderSizes() {
    Object.entries(this.state.sizes).forEach((size) => { 
      return (
        <DropdownItem>Hello</DropdownItem>
      );
    })
  }

  render() {
    const { sizes } = this.props.state;
    return(
      // <ButtonDropdown isOpen={this.props.state.dropdown}>
      //   <DropdownToggle
      //     caret
      //     nav
      //     onClick={this.props.dropdownToggle}
      //     style={{background: 'white'}}
      //     >
      //     Dropdown
      //   </DropdownToggle>
      //   <DropdownMenu>
      //     {sizes &&
      //       Object.entries(sizes).map((entry) => { 
      //         return <DropdownItem>{entry[0]}</DropdownItem>
      //       })
      //     }
      //   </DropdownMenu>
      // </ButtonDropdown>

      <div>
        <Row style={{
          paddingTop: '20px'
        }}>
          {
            sizes &&
            Object.entries(sizes).map((entry, i) => { 
              if (i === 0) {
                return(
                  <Col
                  // onClick={this.props.selectSize(entry[0])}
                    className="size"
                    id={`sizeOption-${i}`}
                    sm={4}
                    style={{
                      border: '1px solid black',
                      verticalAlign: 'text-top',
                      fontSize: '12px',
                      height: '35px',
                      paddingTop: '7px',
                      textAlign: 'center',
                      right: '-1px'
                  }}>
                    {entry[0].toUpperCase()}
                  </Col>
                )
              } else if (i === 1) {
                // this.props.selectSize(entry[0])

                return(
                  <Col sm={4}
                  className="size"
                  style={{
                    border: '1px solid black',
                    verticalAlign: 'text-top',
                    fontSize: '12px',
                    height: '35px',
                    paddingTop: '7px',
                    textAlign: 'center'
                  }}>
                    {entry[0].toUpperCase()}
                  </Col>
                )
              } else {
                // this.props.selectSize(entry[0])
                return(
                  <Col
                  sm={4}
                  className="size"
                  style={{
                    border: '1px solid black',
                    verticalAlign: 'text-top',
                    fontSize: '12px',
                    height: '35px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    left: '-1px'
                  }}>
                    { entry[0].toUpperCase() }
                  </Col>
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


