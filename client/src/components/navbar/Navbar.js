import React from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

import BrandsDropdown from './BrandsDropdown';
import CategoriesDropdown from './CategoriesDropdown';
import {
  NavLink,
  Navigation,
  IconContainer,
  Icon,
  Selections,
  Sections
 } from './styled/Navbar';

class Navbar extends React.Component {
  state = {
    brandsOpen: false,
    categoriesOpen: false,
    releasesOpen: false
  }
  navIsAnimating = false;
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
        delay: 100
      });

      anime({
        targets: '.sections',
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
        duration: 400
      });
      anime({
        targets: '.sections',
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
    const activeLink = 'releases';
    const optionLinks = this.options.map((link, i) => {
      return(
        link === activeLink ?
        <Link
          to={`${link}`}
          // style={{ background: 'orange'}}
          key={`link-${i}`}
          onMouseEnter={ () => { this.displayDropdown(i) } }
          onMouseLeave={ () => { this.hideDropdown(i); }}
          onClick={ this.sectionHoverLeave }>
          <NavLink
          key={`navbar-link-${i}`}>{`${link}`}</NavLink>
        </Link> :

        <Link>
          <NavLink
            key={`navbar-link-${i}`}
            onMouseEnter={ () => { this.displayDropdown(i) } }
            onMouseLeave={ () => { this.hideDropdown(i); }}
            >{`${link}`}
          </NavLink>
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
          className="sections"
          onMouseEnter={ this.sectionHoverEnter }
          onMouseLeave={ this.sectionHoverLeave }>

          {this.state.brandsOpen &&
            <BrandsDropdown/>
          }

          {this.state.categoriesOpen &&
            <CategoriesDropdown/>
          }
        </Sections>
      </div>
    )
  }
}

export default Navbar;