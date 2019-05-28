import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { connect } from 'react-redux';
import { brandsMenuToggle } from '../../actions';

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
  height: 300px;
  display: flex;
  border-right: 1px solid peru;
`;

class Navbar extends React.Component {
  state = {
    brandsOpen: false,
    categoriesOpen: false,
    releasesOpen: false
  }

  isAnimating = false;
  exit = false;
  options = ['brands', 'categories', 'releases'];
  hover = false;

  componentDidMount() {
    const duration = 250;
    this.hideAnimation = anime({});
    this.displayAnimation = anime({});

  }

  displayDropdown = (i) => {
    const duration = 350;
    let paused = false;

    // interupt and finish hide animation
    this.hideAnimation.seek(duration);

    this.setState({ [this.options[i]+'Open']: true }, () => {
      this.displayAnimation = anime({
        targets: '.' + this.options[i] + 'Comp',
        autoplay: false,
        easing: 'easeInOutQuad',
        opacity: 1,
        duration,
        complete: function() {
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
    // console.log(this.hover);
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
          onMouseLeave={ () => {
            this.hideDropdown(i);
           } }
          >
          <NavLink key={`navbar-link-${i}`}>{`${link}`}</NavLink>
        </Link>
      );
    })

    return (
      <div>
        <Navigation>
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

const mapStateToProps = state => {
  return {
    brandsToggle: state.brandsMenuToggle,
    categoryToggle: state.categoryMenuToggle,
    releasesToggle: state.releasesMenuToggle
  }
}

export default connect(mapStateToProps, { brandsMenuToggle })(Navbar);