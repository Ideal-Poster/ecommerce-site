export const addToCart = item => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      item
    }
  }
}

export const setReduxCart = cart => {
  return { 
    type: 'SET_CART',
    payload: { 
      cart
    }
  }
}

export const deleteFromCart = item => {
  return {
    type: 'DELETE_FROM_CART',
    payload: {
      item
    }
  }
}