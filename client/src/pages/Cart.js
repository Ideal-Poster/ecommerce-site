import React from 'react';
import { Container, Row, Col } from '@bootstrap-styled/v4';
import { connect } from 'react-redux';
import { calculatePrice, setLocalStorageCart } from '../utilities/index';
import { deleteFromCart } from '../actions/index';

class Cart extends React.Component {

	async deleteItemFromCart(item) {
	 	await this.props.deleteFromCart(item);
		setLocalStorageCart(this.props.cart);
	}

	render() {
		return(
			<div>
				<h1>Cart</h1>
					<Container>
						<Row style={{borderBottom: '1px solid black'}}>
							<Col sm={8}>
								<p>product</p>
							</Col>
							<Col sm={1}>
								<p>size</p>
							</Col>
							<Col sm={1}>
								<p>quantity</p>
							</Col>
							<Col sm={1}>
								<p>price</p>
							</Col>
						</Row>


						{
							this.props.cart.map(item => (
							<Row key={'item-row-' + item.name}>
								<Col sm={8}>
									<img style={{display: 'inline-block',height: '70px'}} src={item.images[0]} alt="product"/>
									<p style={{display: 'inline-block', verticalAlign: 'top'}}>{ item.name }</p>
								</Col>
								<Col sm={1}>
									<p>{ item.size }</p>
								</Col>
								<Col sm={1}>
									<p>{ item.quantity }</p>
								</Col>
								<Col sm={1}>
									<p>{item.price}</p>
								</Col>
								<Col>
									<p onClick={() => console.log(this.deleteItemFromCart(item))}>X</p>
								</Col>
							</Row>
							))
						}

						<Row>
							<Col xs={ 2 } sm={{ offset: 10 }}  style={{ background: 'red' }}>
								<p>Total: { calculatePrice(this.props.cart) }</p>
							</Col>
						</Row>
					</Container>
				</div>
			)
		}
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps, { deleteFromCart })(Cart);