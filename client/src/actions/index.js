export const addToCart = item => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      item: item
    }
  }
}

export const setCartFromStorage = cart => {
  return { 
    type: 'SET_CART',
    payload: { 
      cart: cart
    }
  }
}