import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/evil/ChevronLeft';
import { ChevronRight } from '@styled-icons/evil/ChevronRight';

export const ArrowLeft = styled(ChevronLeft)`
  height: 65px;
  color: white;
  z-index: 100;
  top: calc(50% - 55px);
  transform: translateY(-50%);
  position: relative;
  left: -10px;
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
  transform: translateY(-50%);
  position: relative;
  right: 15px;
  opacity: 0.6;
  cursor: pointer;

`;

export const ArrowLeftContainer = styled.div`
  height: 100vh;
  width: 40px;
  position: absolute;
  z-index: 10000;
  left: 0;
  cursor: pointer;
  &:hover ${ArrowLeft} {
    opacity: 1
  }
`;

export const ArrowRightContainer = styled.div`
  height: 100vh;
  width: 40px;
  position: absolute;
  z-index: 10000;
  right: 0;
  cursor: pointer;
  &:hover ${ArrowRight} {
    opacity: 1
  }
`;