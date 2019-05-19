import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BrandsComp from './Brands';
// import { Container, Row, Col } from 'react-awesome-styled-grid'
import anime from 'animejs';



const Navigation =  styled.div`
  width: 100%;
  color: #fff;
  background: #000;
  display: flex;
  align-items: center;
  height: 60px;
  position: absolute;
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
  background:green;
  padding: 0;
  margin:0;
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
    brandsOpen: false
  }
  isAnimating = false;
  exit = false;

  constructor(props) {
    super(props);
    // this.brandsComp = React.createRef();
  }

  componentDidMount() {
    const duration = 400;

    this.hideAnimation = anime({
      targets: '.brandsComp',
      autoplay: false,
      easing: 'easeInOutQuad',
      opacity: 0,
      duration,
      complete: () => {
        console.log('hide: closed');
        this.setState({ brandsOpen: false });
      }
    });
  }
  displayDropdown = () => {
    const duration = 200;
    this.hideAnimation.seek(duration);
    this.setState({ brandsOpen: true }, () => {
      this.displayAnimation = anime({
        targets: '.brandsComp',
        autoplay: false,
        easing: 'easeInOutQuad',
        opacity: 1,
        duration,
        // delay: 200,
        complete: function() {
          this.isAnimating = false;
          console.log('display: open');
        }
      });

      this.isAnimating = true;
      this.displayAnimation.play();

    });
  }


  hideDropdown = () => {
    const duration = 200;
    this.hideAnimation = anime({
      targets: '.brandsComp',
      autoplay: false,
      easing: 'easeInOutQuad',
      opacity: 0,
      // delay: 200,
      duration,
      complete: () => {
        console.log('hide: closed');
        this.setState({ brandsOpen: false });
      }
    });
    this.hideAnimation.play();
  }
  render() {
    const options =  ['brands', 'categories', 'releases'].map((link, i) => {
      return(
        <Link
          to={`${link}`}
          style={{
            textDecoration:'none',
            marginLeft: '25px'
          }}
          key={`link-${i}`}
          onMouseEnter={this.displayDropdown}
          onMouseLeave={this.hideDropdown}>
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

        <Sections >
          {this.state.brandsOpen &&
            <BrandsComp/>
          }
        </Sections>
        {/* <p style={{margintTop: '600px'}}>hellp</p> */}
      </div>
    )
  }
}

export default Navbar;