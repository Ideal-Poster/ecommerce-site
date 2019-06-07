import styled from 'styled-components';

export default styled.div`
  position: relative;
  width: 100vw;
  background: url(${props => props.img})no-repeat 50% 50%;
  background-size: cover;
`;