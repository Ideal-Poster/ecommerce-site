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
    padding-right: 10px;
    padding-left: 20px;
  };
  & > .previous {
    left: 0;
    padding-left: 10px;
    padding-right: 20px;
  };
`

export const SlideIndicators = styled.div`
  position: absolute;
  left: calc(50vw - 50px);
  top: calc(100vh - 110px);
`;

export const SlideIndicator = styled.div`
  position: absolute;
  height: 16px;
  width: 16px;
  border: 1px solid orange;
`;

export const ActiveSlideIndicator = styled.div`
  position: absolute;
  height: 16px;
  width: 16px;
  background: orange;
  border: 1px solid orange;
`;
