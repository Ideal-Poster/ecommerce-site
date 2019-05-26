
import { combineReducers } from 'redux';

const brandToggleReducer = (state = false, action) => {
  switch (action.type) {
    case state === false:
      return true;
    default:
      return false;
  }
}

const categoryToggleReducer = (state = false, action) => {
  switch (action.type) {
    case state === false:
      return true;
    default:
      return false;
  }
}

const releasesToggleReducer = (state = false, action) => {
  switch (action.type) {
    case state === false:
      return true;
    default:
      return false;
  }
}

export default combineReducers({
  brandMenuToggle: brandToggleReducer,
  categoryMenuToggle: categoryToggleReducer,
  releasesMenuToggle: releasesToggleReducer
});