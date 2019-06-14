import styled from 'styled-components';

export const Carousel = styled.div`
	grid-template-columns: 0% 0% 0%;
	grid-column-gap: 0%;
	grid-template-rows: 100%;
	grid-template-areas: 'slide';
	display: grid;
	position: relative;
  overflow: hidden;
  width: 100vw;
  height: calc(100vh - 60px);
`;

export const Slide = styled.div`
  position: relative;
  width: 100vw;
  background: url(${props => props.img})no-repeat 50% 50%;
  background-size: cover;
`;

export const Arrows = styled.div`
  position: absolute;
  z-index: 1000;
  width: 100vw;
  & > .previous, .next {
    cursor: pointer;
    position: absolute;
    height: 100vh;
    top: calc(50vh - 30px);
    transform: translateY(-50%);
    /* background: blue; */
  };
  & > .next {
    right: 0;
    padding-right: 5px;
  };
  & > .previous {
    left: 0;
    padding-left: 5px;
  };
`