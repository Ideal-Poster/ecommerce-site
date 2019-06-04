import React from 'react';
import styled from 'styled-components';
import anime from 'animejs';

const Carousel = styled.div`
	grid-template-columns: 0% 0% 0%;
	grid-column-gap: 0%;
	grid-template-rows: 100%;
	grid-template-areas: 'slide';
	display: grid;
	position: absolute;
  /* overflow: hidden; */
  width: 100vw;
`;

const Image = styled.img`
  max-width: 100vw;
  min-width: 100vw;
  position: relative;
`;

class App extends React.Component {
  isAnimating = false;
  position = [
    // 0 left out of view
    { left: '-100vw', right: '100vw' },
    // 1 center in view
    { left: '0vw', right: 0 },
    // 2 right out of view,
    { left: '100vw', right: '-100vw' }
  ];
  currentSlide = 1;

  componentDidMount() {
    this.galleryImages = document.querySelectorAll('.gallery-image');
    this.setSlideshowImages();
    // this.carouselRight();
  }

  carouselRight = () => {
    if (!this.isAnimating) {
      const currentSlide = this.galleryImages[this.currentSlide];
      const nextSlide =
        this.currentSlide === (this.galleryImages.length - 1) ?
        this.galleryImages[0] :
        this.galleryImages[this.currentSlide +1];
      const prevSlide =
        this.currentSlide === 0 ?
        this.galleryImages[this.galleryImages.length - 1] :
        this.galleryImages[this.currentSlide - 1]
      // console.log(this.currentSlide, "current", currentSlide, "nrxt", nextSlide,"prv",prevSlide);
      this.setSlideTo(prevSlide, 2);
      this.moveSlideTo(nextSlide, 1);
      this.moveSlideTo(currentSlide, 0);

      this.currentSlide =
        this.currentSlide === this.galleryImages.length - 1 ?
          0 : this.currentSlide + 1;
    }
  }

  setSlideTo(slide, pos) {
    anime.set(slide ,{
      left: this.position[pos].left,
      right: this.position[pos].right
    });
  }

  moveSlideTo(slide, pos) {
    this.isAnimating = true;
    anime({
      targets: slide,
      duartion: 500,
      delay: 100,
      easing: 'easeInOutQuad',
      left: this.position[pos].left,
      right: this.position[pos].right,
      complete: () => {
        this.isAnimating = false;
      }
    });
  }

  setSlideToRight(slide) {
    anime.set(slide, {
      left: this.position[2].left,
      right: this.position[2].right
    });
  }

  setSlideToLeft(slide) {
    anime.set(slide, {
      left: this.position[0].left,
      right: this.position[0].right
    });
  }

  setSlideshowImages() {
    const galleryImages = document.querySelectorAll('.gallery-image');

    anime.set( galleryImages[2], {
      left: '100vw'
    });
    anime.set( galleryImages[0], {
      left: '-100vw'
    });
  }

  render() {
    return (
      <Carousel onClick={this.carouselRight}>
        {/* <SlidesContainer> */}
          <Image className="gallery-image image1" src={require("../static/photo-1513531926349-466f15ec8cc7.jpeg")}/>
          <Image className="gallery-image image2" src={require("../static/warren-wong-248636-unsplash.jpg")}/>
          <Image className="gallery-image image3" src={require("../static/photo-1527905804285-2f67b86e3bf6.jpeg")}/>
        {/* </SlidesContainer> */}
      </Carousel>
    );
  }
}

export default App;
