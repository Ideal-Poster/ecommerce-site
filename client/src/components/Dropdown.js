import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '@bootstrap-styled/v4';

const Dropdown = () => (
    <ButtonDropdown isOpen={false} >
        <DropdownToggle color="link" caret>
        Dropdown
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
    </ButtonDropdown>
);

export default Dropdown;


