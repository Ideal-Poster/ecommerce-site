import { combineReducers } from 'redux';

const selectProductReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_PRODUCT':
      return action.payload.id
    default:
      return null
  }
}

export default combineReducers({
  productId: selectProductReducer
});