import styled from 'styled-components';
import { ChevronLeft } from 'styled-icons/material/ChevronLeft';
import { ChevronRight } from 'styled-icons/material/ChevronRight';

export const ArrowLeft = styled(ChevronLeft)`
  height: 65px;
  color: white;
  z-index: 100;
  top: calc(50% - 55px);
  position: absolute;
  left: 0;
  padding-left: 10px;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1
  }
`;

export const ArrowRight = styled(ChevronRight)`
  height: 65px;
  color: white;
  z-index: 100;
  top: calc(50% - 55px);
  position: absolute;
  right: 0;
  padding-right: 10px;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1
  }
`;