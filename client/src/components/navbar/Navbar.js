import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BrandsComp from './Brands';
import CategoriesComp from './Categories';

import anime from 'animejs';
import { connect } from 'react-redux';


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
  /* padding: 0; */
  /* margin: 0; */
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
  /* background: plum; */
`
const NavLink = styled.p`
  transition: color 0.25s;
  color: white;
  padding-top: 5px;
  /* background: green; */
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
  /* background: orange; */
`;

class Navbar extends React.Component {
  state = {
    brands: false,
    categories: false
  }
  isAnimating = false;
  exit = false;

  constructor(props) {
    super(props);
    this.brandsRef = React.createRef();
  }

  componentDidMount() {
    const duration = 250;
    this.hideAnimation = anime({
      targets: '.brandsComp',
      autoplay: false,
      easing: 'easeInOutQuad',
      opacity: 0,
      duration,
      complete: () => {
        this.setState({ brands: false });
      }
    });
  }

  displayDropdown = (compName) => {
    const duration = 250;

    this.hideAnimation.seek(duration);
    this.setState({ [compName]: true }, () => {
      this.displayAnimation = anime({
        targets: '.' + compName + 'Comp',
        autoplay: false,
        easing: 'easeInOutQuad',
        opacity: 1,
        duration,
        // delay: 200,
        complete: function() {
          this.isAnimating = false;
        }
      });

      this.isAnimating = true;
      this.displayAnimation.play();
    });

    console.log(this.brandsRef);
  }

  hideDropdown = (compName) => {
    const duration = 250;
    this.hideAnimation = anime({
      targets: '.' + compName + 'Comp',
      autoplay: false,
      easing: 'easeInOutQuad',
      opacity: 0,
      // delay: 200,
      duration,
      complete: () => {
        // console.log('hide: closed');
        this.setState({ [compName]: false });
      }
    });
    this.hideAnimation.play();
  }

  render() {
    const options = ['brands', 'categories', 'releases'].map((link, i) => {
      return(
        <Link
          to={`${link}`}
          style={{
            textDecoration:'none',
            marginLeft: '25px'
          }}
          key={`link-${i}`}
          // onMouseEnter={() => {this.displayDropdown(link)}}
          // onMouseLeave={() => {this.hideDropdown(link)}}
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
            {options}
          </Selections>
        </Navigation>

        <Sections>
          {this.state.brands &&
            <BrandsComp ref={this.brandsRef}
            // displayDropdown={this.displayDropdown}
            // hideDropdown={this.hideDropdown}
            />
          }
          {this.state.categories &&
            <CategoriesComp/>
          }
        </Sections>
        {/* <p style={{margintTop: '600px'}}>hellp</p> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    brandMenuToggle: state.brandMenuToggle,
    categoryMenuToggle: state.categoryMenuToggle,
    releasesMenuToggle: state.releasesMenuToggle
  }
}

export default connect(mapStateToProps)(Navbar);