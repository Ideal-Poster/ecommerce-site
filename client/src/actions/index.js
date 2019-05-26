import {
  BRAND_MENU_TOGGLE,
  CATEGORY_MENU_TOGGLE,
  RELEASE_MENU_TOGGLE
} from './types';

export const brandMenuToggle = () => {
  return {
    type: BRAND_MENU_TOGGLE
  };
};

export const categoryMenuToggle = () => {
  return {
    type: CATEGORY_MENU_TOGGLE
  };
};

export const releasesMenuToggle = () => {
  return {
    type: RELEASE_MENU_TOGGLE
  };
};