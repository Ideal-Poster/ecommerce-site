import { combineReducers } from 'redux';

const addToCartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const product = action.payload.item
      const alreadyInCart = state.findIndex(
        item => item.id === product.id
      )

      if (alreadyInCart === -1) {
        const updatedItems = state.concat({
          ...product,
          quantity: 1
        });
        return updatedItems
      } else {
        const updatedItems = [...state];
        updatedItems[alreadyInCart].quantity += 1;
        return updatedItems
      }

    default:
      return []
  }
}

export default combineReducers({
  cart: addToCartReducer
});