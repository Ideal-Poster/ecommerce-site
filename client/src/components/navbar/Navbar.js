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
  LogInIcon,
  CartIcon,
  UserIcon,
  CartDropdown,
  CartTotalCircle,
  CartTotalText,
  CartCheckoutLink,
  CartPrice
 } from './styled/Navbar';

import {setLogIn} from '../../actions';
import { connect } from 'react-redux';
import { calculatePrice, totalCartCount, nameTooLong } from '../../utilities';


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
  navSelectionNames = ['brands', 'categories', 'releases'];
  offset : number;

  componentDidMount() {
    this.offset = window.pageYOffset;
    this.hideAnimation = anime({});
    this.displayAnimation = anime({});
    this.cartDisplayAnimation = anime({});
    window.addEventListener('scroll',
      () => {
        this.hideNavMenu();
        this.showNavMenu();
      }
    );
  }

  isNavHidden = () => {
    return this.offset < window.pageYOffset &&
    window.pageYOffset > 250 &&
    !this.navIsAnimating &&
    this.navDisplayed
  }

  isNavDisplayed = () => {
    return this.offset > window.pageYOffset
    && !this.navIsAnimating
    && !this.navDisplayed
  }

  hideNavMenu = () => {
    const duration = 300;

    if (this.isNavHidden()) {
      this.navIsAnimating = true;
      anime({
        targets: '.navMenu',
        easing: 'easeOutCubic',
        translateY: '-60px',
        duration,
        delay: 100
      });

      anime({
        targets: '.sections',
        easing: 'easeOutCubic',
        translateY: '-60px',
        duration,
        delay: 100,
        complete: () => {
          this.navIsAnimating = false;
          this.navDisplayed = false;
        }
      });
    }
  }

  showNavMenu = () => {
    const duration = 250;
    if (this.isNavDisplayed()) {
      this.navIsAnimating = true;
      anime({
        targets: '.navMenu',
        easing: 'easeOutCubic',
        translateY: '0px',
        duration
      });
      anime({
        targets: '.sections',
        easing: 'easeOutCubic',
        translateY: '0px',
        duration,
        complete: () => {
          this.navIsAnimating = false;
          this.navDisplayed = true;
        }
      });
    }
    this.offset = window.pageYOffset;
  }

  displayDropdown = selectionName => {
    const duration = 200;
    // interupt and finish hide animation
    this.hideAnimation.seek(duration);

    this.setState({ [selectionName + 'Open']: true }, () => {
      this.displayAnimation = anime({
        targets: '#' + selectionName + '-dropdown',
        autoplay: false,
        easing: 'easeOutCubic',
        opacity: 1,
        duration,
        complete: () => {
          this.isAnimating = false;
        }
      });

      this.isAnimating = true;
      this.displayAnimation.play();
    });
  };

  hideDropdown = selectionName => {
    const duration = 200;
    this.hideAnimation = anime({
      targets: '#' + selectionName + '-dropdown',
      autoplay: false,
      easing: 'easeOutCubic',
      opacity: 0,
      duration,
      complete: () => {
        this.setState({[selectionName + 'Open']: false });
        this.activeHover = false;
      }
    });
    this.hideAnimation.play();
  };

  sectionHoverEnter = () => {
    this.hideAnimation.reset();
  };

  sectionHoverLeave = () => {
    this.hideAnimation.play();
  };

  toggleCart = () => {
    this.state.cartOpen ? this.hideDropdown("cart") : this.displayDropdown("cart");
  };

  render() {
    const activeLink = 'releases';
    const optionLinks = this.navSelectionNames.map((navSelectionName, i) => {
      return(
        navSelectionName === activeLink ?
        <Link
          to={`${navSelectionName}`}
          key={`link-${i}`}
          onMouseEnter={ () => this.displayDropdown(navSelectionName) }
          onMouseLeave={ () => this.hideDropdown(navSelectionName) }
          onClick={ this.sectionHoverLeave }>
          <NavLink>{`${navSelectionName}`}</NavLink>
        </Link> :
        <div key={`navbar-link-${i}`}>
          <NavLink
            onMouseEnter={ () => this.displayDropdown(navSelectionName) }
            onMouseLeave={ () => this.hideDropdown(navSelectionName) } >
            {`${navSelectionName}`}
          </NavLink>
        </div>
      );
    })
    return (
      <div>
        <Navigation className="navMenu">
          <IconContainer>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Icon>Rebel</Icon>
            </Link>
          </IconContainer>
          
          <Selections>
            { optionLinks }
            {
              this.props.isLoggedIn ?
              <Link to={`/user`}><UserIcon/></Link> :
              <Link to={`/login`}><LogInIcon/></Link>
            }
            <CartIcon onClick={ this.toggleCart } />
            { 
              this.props.cart.length > 0 &&
              <CartTotalCircle onClick={ this.toggleCart }>
                <CartTotalText>{  totalCartCount(this.props.cart) }</CartTotalText> 
              </CartTotalCircle>
            }
          </Selections>
        </Navigation>

        <Sections
          className="sections"
          onMouseEnter={ this.sectionHoverEnter }
          onMouseLeave={ this.sectionHoverLeave }>
          { this.state.brandsOpen && <BrandsDropdown/> }
          { this.state.categoriesOpen && <CategoriesDropdown/> }
        </Sections>
          { this.state.cartOpen &&
            <CartDropdown id="cart-dropdown" className="sections">
              <div style={{display: 'inline-block'}}>
                {this.props.cart.map(item => (
                  <Link to={`/product/${item.id}`}>
                    <div key={'navbar-cart-' + item.name} style={{color: 'black'}}>
                      <CartImage src={item.images[0]} alt="cart item"/>
                      <div style={{display: 'inline-block', maxWidth: '360px'}}>
                        <p style={{paddingLeft: '20px'}}>{nameTooLong(item.name, 37)}</p> 
                        <CartInfo>$ {item.price}</CartInfo>
                        <CartInfo>size: {item.size}</CartInfo>
                        <CartInfo>quantity: {item.quantity}</CartInfo>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <CartPrice>
                <p style={{ color: 'black' }}>total: { calculatePrice(this.props.cart) }</p>
              </CartPrice>

              <Link to={`/cart`}>
                <CartCheckoutLink>
                  <p>checkout</p>
                </CartCheckoutLink>
              </Link>
            </CartDropdown>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps, {setLogIn})(Navbar);