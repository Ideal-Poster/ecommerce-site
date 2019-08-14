import styled from 'styled-components';

export const QuadDropdown = styled.div`
  height: 250px;
  position: fixed;
  display: flex;
  opacity: 0;
`;

export const QuadSection = styled.div`
  position: relative;
  border-right: 1px solid #787878;
  height: 100%;
  width: 25vw;
  background: #f7f7f7;
  overflow: hidden;
  z-index: 1000;
`;
