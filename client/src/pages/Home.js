
import React from 'react';
import anime from 'animejs';
import { 
  Carousel,
  Slide,
  SlideIndicators,
  SlideIndicator,
  ActiveSlideIndicator
} from '../components/carousel/Carousel';

import slideImg1 from '../static/photo-1513531926349-466f15ec8cc7.jpeg';
import slideImg2 from '../static/warren-wong-248636-unsplash.jpg';
import slideImg3 from '../static/photo-1527905804285-2f67b86e3bf6.jpeg';

import { ArrowRight, ArrowLeft } from '../pages/styled/Home';

interface Position {
  left: string | number,
  right: string | number
}
class Home extends React.Component {
  state = {
    activeSlide: 1
  }
  isAnimating : boolean = false;
  position : Array<Position> = [
    // 0 left out of view
    { left: '-100vw', right: '100vw' },
    // 1 center in view
    { left: '0vw', right: 0 },
    // 2 right out of view,
    { left: '100vw', right: '-100vw' }
  ];
  currentSlide : number = 1;
  galleryImages : NodeList;
  
  async componentDidMount() {
    this.galleryImages = document.querySelectorAll('.slide');
    this.setSlideshowImages();
  }

  carouselRight = () => {
    if (!this.isAnimating) {
      const currentSlide : Node = this.galleryImages[this.currentSlide];
      const nextSlide : Node =
        this.currentSlide === (this.galleryImages.length - 1) ?
        this.galleryImages[0] :
        this.galleryImages[this.currentSlide +1];
      const prevSlide : Node =
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
      this.setState({activeSlide: this.currentSlide});
    }
  }

  carouselLeft = () => {
    if (!this.isAnimating) {
      const currentSlide : Node = this.galleryImages[this.currentSlide];
      const nextSlide : Node =
        this.currentSlide === 0 ?
        this.galleryImages[this.galleryImages.length - 1] :
        this.galleryImages[this.currentSlide - 1];
      const prevSlide : Node =
        this.currentSlide === this.galleryImages.length - 1 ?
        this.galleryImages[0] :
        this.galleryImages[this.currentSlide + 1]
      // // console.log(this.currentSlide, "current", currentSlide, "nrxt", nextSlide,"prv",prevSlide);
      this.setSlideTo(prevSlide, 0);
      this.moveSlideTo(nextSlide, 1);
      this.moveSlideTo(currentSlide, 2);

      this.currentSlide =
        this.currentSlide === 0 ?
        this.galleryImages.length - 1 : this.currentSlide - 1;
      this.setState({activeSlide: this.currentSlide});
    }
  }

  setSlideTo(slide: Node, pos: number) {
    anime.set(slide ,{
      left: this.position[pos].left,
      right: this.position[pos].right
    });
  }

  moveSlideTo(slide: Node, pos: number) {
    this.isAnimating = true;
    anime({
      targets: slide,
      duration: 500,
      delay: 100,
      easing: 'easeInOutQuad',
      left: this.position[pos].left,
      right: this.position[pos].right,
      complete: () => {
        this.isAnimating = false;
      }
    });
  }

  setSlideToRight(slide: Node) {
    anime.set(slide, {
      left: this.position[2].left,
      right: this.position[2].right
    });
  }

  setSlideToLeft(slide: Node) {
    anime.set(slide, {
      left: this.position[0].left,
      right: this.position[0].right
    });
  }

  setSlideshowImages() {
    anime.set( this.galleryImages[2], {
      left: '100vw'
    });
    anime.set( this.galleryImages[0], {
      left: '-100vw'
    });
  }

  render() {
    let slides = [ slideImg1, slideImg2, slideImg3 ].map((i) => (
      <Slide className="slide" key={i} img={i}/>
    ));

    return (
      <div>
        <Carousel>
          <ArrowRight onClick={this.carouselRight}/>
          <ArrowLeft onClick={this.carouselLeft}/>
          {slides}
          <SlideIndicators>
            {
              this.state.activeSlide === 1 ?
                <ActiveSlideIndicator/> :
                <SlideIndicator/>
            }
            {
              this.state.activeSlide === 2 ?
              <ActiveSlideIndicator style={{ marginLeft: '40px' }}/> :
                <SlideIndicator style={{ marginLeft: '40px' }}/>
            }
            {
              this.state.activeSlide === 0 ?
              <ActiveSlideIndicator style={{ marginLeft: '80px' }}/> :
                <SlideIndicator style={{ marginLeft: '80px' }}/>
            }
          </SlideIndicators>
        </Carousel>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>hello</p>

      </div>
    );
  }
}

export default Home;
