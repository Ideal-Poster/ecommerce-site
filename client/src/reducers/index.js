import { combineReducers } from 'redux';
import { setLogInStatus } from '../utilities';

const logInReducer = (state = false, action) => {  
  switch (action.type) {
    case 'SET_LOGIN':
      setLogInStatus(action.payload.boolean);
      const boolean = action.payload.boolean;
      return boolean;
    default:
      return state
  };
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const product = action.payload.item
      const alreadyInCart = state.findIndex(
        item => item.id === product.id && item.size === product.size
      )
      if (alreadyInCart === -1) {
        const updatedItems = state.concat({
          ...product,
          quantity: 1
        });
        return updatedItems;
      } else {
        const updatedItems = [...state];
        updatedItems[alreadyInCart].quantity += 1;
        return updatedItems;
      }
    case 'DELETE_FROM_CART':
      const cart = state;
      const itemToDelete = action.payload.item;
      const filteredItems = cart.filter(
        item => item.id !== itemToDelete.id || 
                item.size !== itemToDelete.size
      );
      return filteredItems;
    case 'SET_CART':
      const setCart = action.payload.cart
      return setCart ;
    default:
      return [];
  };
};




export default combineReducers({
  cart: cartReducer,
  isLoggedIn: logInReducer
});