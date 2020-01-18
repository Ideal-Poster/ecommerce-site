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
  Sections,
  CartImage,
  CartInfo,
  CartIcon
 } from './styled/Navbar';

import { connect } from 'react-redux';
import { calculatePrice } from '../../utilities/index';


class Navbar extends React.Component {
  state = {
    brandsOpen: false,
    categoriesOpen: false,
    releasesOpen: false,
    cartOpen: false
  }
  navIsAnimating : boolean = false;
  isAnimating : boolean = false;
  navDisplayed : boolean = true;
  options = ['brands', 'categories', 'releases'];
  activeHover;
  offset : number;

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
    const duration = 200;
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
    const duration = 200;
    this.hideAnimation = anime({
      targets: '.' + this.options[i] + 'Comp',
      autoplay: false,
      easing: 'easeInOutQuad',
      opacity: 0,
      duration,
      complete: () => {
        this.setState({ [this.options[i]+ 'Open']: false });
        this.activeHover = false;
      }
    });
    this.hideAnimation.play();
  }

  sectionHoverEnter = (i) => {
    this.hideAnimation.reset();
  }

  sectionHoverLeave = () => {
    this.hideAnimation.play();
  }

  toggleCart = () => {
    this.setState({ cartOpen: !this.state.cartOpen})
  }


  render() {
    const activeLink = 'releases';
    const optionLinks = this.options.map((link, i) => {
      return(
        link === activeLink ?
        <Link
          to={`${link}`}
          key={`link-${i}`}
          onMouseEnter={ () => this.displayDropdown(i) }
          onMouseLeave={ () => this.hideDropdown(i) }
          onClick={ this.sectionHoverLeave }>
          <NavLink
          key={`navbar-link-${i}`}>{`${link}`}</NavLink>
        </Link> :

        <a>
          <NavLink
            key={`navbar-link-${i}`}
            onMouseEnter={ () =>this.displayDropdown(i) }
            onMouseLeave={ () => this.hideDropdown(i) } >
            {`${link}`}
          </NavLink>
        </a>
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

            <i 
              onClick={this.toggleCart}
              style={{
                fontSize: '16px',
                position: 'absolute',
                right: '0',
                top: '21px',
                paddingRight: '25px'
              }}
              class="fas fa-shopping-cart"/>
              {/* <CartIcon class="fas fa-shopping-cart"/> */}
          </Selections>
        </Navigation>

        <Sections
          className="sections"
          onMouseEnter={ () => { this.sectionHoverEnter(this.activeHover) } }
          onMouseLeave={ () => { this.sectionHoverLeave(this.activeHover) } } >

          {
            this.state.brandsOpen &&
            <BrandsDropdown/>
          }

          {
            this.state.categoriesOpen &&
            <CategoriesDropdown/>
          }

          {
            this.state.cartOpen &&
            <div
              style={{
                position: 'fixed',
                width: '400px',
                background: 'purple',
                right: '0'
              }}>
                
              <div style={{display: 'inline-block'}}>
                {this.props.cart.map((item) => (
                    <div>
                      <CartImage src={item.images[0]} alt="cart item"/>
                      <div style={{display: 'inline-block'}}>
                        <p style={{paddingLeft: '20px'}}>{item.name}</p> 
                        <CartInfo>$ {item.price}</CartInfo>
                        <CartInfo>size: {item.size}</CartInfo>
                        <CartInfo>quantity: {item.quantity}</CartInfo>
                      </div>
                    </div>
                ))}
              </div>
              <div style={{
                width: '100px',
                display: 'inline-block',
                background: 'green',
                verticalAlign: 'center'
              }}>
                <p>total: { calculatePrice(this.props.cart) }</p>
              </div>

              <Link to={`/cart`}>
                <div 
                style={{
                  width: '100px',
                  display: 'inline-block',
                  background: 'green',
                  verticalAlign: 'center'
                }}>
                  <p>checkout</p>
                </div>
              </Link>
            </div>
          }
        </Sections>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Navbar);