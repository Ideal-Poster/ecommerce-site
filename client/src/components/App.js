import React from 'react';
import anime from 'animejs';

import Carousel from './carousel/Carousel';
import Slide from './carousel/Slide';

import slideImg1 from "../static/photo-1513531926349-466f15ec8cc7.jpeg";
import slideImg2 from "../static/warren-wong-248636-unsplash.jpg";
import slideImg3 from "../static/photo-1527905804285-2f67b86e3bf6.jpeg";

import Strapi from 'strapi-sdk-javascript';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends React.Component {
  // state = {
  //   brands: []
  // }
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

  async componentDidMount() {
    this.galleryImages = document.querySelectorAll('.slide');
    this.setSlideshowImages();

    // try {
    //   const response = await strapi.request('POST', '/graphql',{
    //     data: {
    //       query: `{
    //         brands{
    //           _id
    //           name
    //           description
    //           image {
    //             url
    //           }
    //         }
    //       }`
    //     }
    //   });
    //   console.log(response);
    //   this.setState({brands: response.data.brands})
    // } catch(error) {
    //   console.log(error);
    // }

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
    anime.set( this.galleryImages[2], {
      left: '100vw'
    });
    anime.set( this.galleryImages[0], {
      left: '-100vw'
    });
  }


  render() {
    // const { brands } = this.state;

    let slides = [ slideImg1, slideImg2, slideImg3 ].map((i) => (
      <Slide className="slide" img={i}/>
    ));

    return (
      <div>
        <Carousel onClick={this.carouselRight}>
          {slides}
        </Carousel>

        {/* {brands.map(brand => (
          // console.log(brand.image)
          <img src={`${apiUrl}${brand.image.url}`} alt="hello"/>
        ))} */}
      </div>
    );
  }
}

export default App;
