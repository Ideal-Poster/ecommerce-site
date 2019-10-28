import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
  }

  renderSizes() {
    Object.entries(this.state.sizes).forEach((size) => { 
      return (
        <DropdownItem>Hello</DropdownItem>
      )
    })
  }

  render() {
    return(
      <ButtonDropdown isOpen={this.props.state.dropdown}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
          {
            this.props.state.sizes &&
            Object.entries(this.props.state.sizes).map((entry) => { 
              return (
                <DropdownItem>{entry[0]}</DropdownItem>
              )
            })
          }
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
};

export default Dropdown;


