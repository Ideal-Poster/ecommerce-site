
import { combineReducers } from 'redux';
import { BRANDS_MENU_TOGGLE } from '../actions/types';

const brandsToggleReducer = (state = false, action) => {
  switch (action.type) {
    case BRANDS_MENU_TOGGLE:
      if (state === false) return true;
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
  switch(action.type) {
    case state === false:
      return true;
    default:
      return false;
  }
}

export default combineReducers({
  brandsMenuToggle: brandsToggleReducer,
  categoryMenuToggle: categoryToggleReducer,
  releasesMenuToggle: releasesToggleReducer
});