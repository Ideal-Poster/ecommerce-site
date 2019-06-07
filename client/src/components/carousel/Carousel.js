import styled from 'styled-components';

export default styled.div`
	grid-template-columns: 0% 0% 0%;
	grid-column-gap: 0%;
	grid-template-rows: 100%;
	grid-template-areas: 'slide';
	display: grid;
	position: relative;
  overflow: hidden;
  width: 100vw;
  height: calc(100vh - 90px);
`;