export const selectProduct = id => {
  return{
    type: 'SELECT_PRODUCT',
    payload: {
      id: id
    }
  }
}