import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import anime from 'animejs';

import BrandsComp from './Brands';
import CategoriesComp from './Categories';

const Navigation =  styled.div`
  width: 100%;
  color: #fff;
  background: black;
  display: flex;
  align-items: center;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1;
  font-family: 'Calibre';
  overflow: hidden;
  text-transform: uppercase;
`
const IconContainer = styled.div`
  border-right: 1px solid #343434;
  text-align: center;
  width: 130px;
`
const Icon = styled.h2`
  color: white;
  height:  100%;
`
const Selections = styled.div`
  flex: 1;
  display: flex;
  font-size: 13px;
  font-family: 'Arial Monospaced MT Std';
  font-weight: 900;
`
const NavLink = styled.p`
  transition: color 0.25s;
  color: white;
  padding-top: 5px;
  height: 100%;
  &:hover {
   color: gray;
  }
`;
const Sections = styled.div`
  position: fixed;
  /* height: 300px; */
  display: flex;
  border-right: 1px solid peru;
  z-index: 10000;
`;

class Navbar extends React.Component {
  state = {
    brandsOpen: false,
    categoriesOpen: false,
    releasesOpen: false
  }
  navIsAnimating= false;
  isAnimating = false;
  navDisplayed = true;
  options = ['brands', 'categories', 'releases'];
  hover = false;



  componentDidMount() {
    this.offset = window.pageYOffset;
    this.hideAnimation = anime({});
    this.displayAnimation = anime({});
    window.addEventListener('scroll',
      () => {
        this.hideNavMenu();
        this.showNavMenu();
      }
    );
  }

  isNavHidden = () => {
    return this.offset < window.pageYOffset &&
    window.pageYOffset > 400 &&
    !this.navIsAnimating &&
    this.navDisplayed
  }

  isNavDisplayed = () => {
    return this.offset > window.pageYOffset && !this.navIsAnimating && !this.navDisplayed
  }

  hideNavMenu = () => {
    if (this.isNavHidden()) {
      this.navIsAnimating = true;
      anime({
        targets: '.navMenu',
        easing: 'easeInOutQuad',
        translateY: '-60px',
        duration: 400,
        delay: 100,
        complete: () => {
          this.navIsAnimating = false;
          this.navDisplayed = false;
        }
      });
    }
  }

  showNavMenu = () => {
    if (this.isNavDisplayed()) {
      this.navIsAnimating = true;
      anime({
        targets: '.navMenu',
        easing: 'easeInOutQuad',
        translateY: '0px',
        duration: 400,
        complete: () => {
          this.navIsAnimating = false;
          this.navDisplayed = true;
        }
      });
    }
    this.offset = window.pageYOffset;
  }

  displayDropdown = i => {
    const duration = 350;

    // interupt and finish hide animation
    this.hideAnimation.seek(duration);

    this.setState({ [this.options[i]+'Open']: true }, () => {
      this.displayAnimation = anime({
        targets: '.' + this.options[i] + 'Comp',
        autoplay: false,
        easing: 'easeInOutQuad',
        opacity: 1,
        duration,
        complete: () => {
          this.isAnimating = false;
        }
      });

      this.isAnimating = true;
      this.displayAnimation.play();
    });
  }

  hideDropdown = i => {
    const duration = 350;

    this.hideAnimation = anime({
      targets: '.' + this.options[i] + 'Comp',
      autoplay: false,
      easing: 'easeInOutQuad',
      opacity: 0,
      duration,
      complete: () => {
        this.setState({ [this.options[i]+ 'Open']: false });
      }
    });
    this.hideAnimation.play();
  }

  sectionHoverEnter = () => {
    this.hover = true;
    this.hideAnimation.reset();

  }
  sectionHoverLeave = () => {
    this.hover = false;
    this.hideAnimation.play();
  }


  render() {
    const optionLinks = this.options.map((link, i) => {
      return(
        <Link
          to={`${link}`}
          style={{ textDecoration:'none', marginLeft: '25px' }}
          key={`link-${i}`}
          onMouseEnter={ () => { this.displayDropdown(i) } }
          onMouseLeave={ () => { this.hideDropdown(i); }}
          >
          <NavLink key={`navbar-link-${i}`}>{`${link}`}</NavLink>
        </Link>
      );
    })

    return (
      <div>
        <Navigation className="navMenu">
          <IconContainer>
            <Link to="/" style={{textDecoration: 'none'}}>
              <Icon>
                Rebel
              </Icon>
            </Link>
          </IconContainer>
          <Selections>
            {optionLinks}
          </Selections>
        </Navigation>

        <Sections
          onMouseEnter={ this.sectionHoverEnter }
          onMouseLeave={ this.sectionHoverLeave }>

          {this.state.brandsOpen &&
            <BrandsComp/>
          }

          {this.state.categoriesOpen &&
            <CategoriesComp/>
          }
        </Sections>
      </div>
    )
  }
}


export default Navbar;