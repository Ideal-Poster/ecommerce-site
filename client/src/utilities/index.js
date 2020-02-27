const CART_KEY = 'cart';

export const calculatePrice = items => {
  return `$${items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)}`;
};

export const setLocalStorageCart = (value, cartKey = CART_KEY) => {
  if (localStorage) {
      localStorage.setItem(cartKey, JSON.stringify(value));
  }
};

export const getLocalCart = (cartKey = CART_KEY) => {
  if (localStorage && localStorage.getItem(cartKey)) {
      return JSON.parse(localStorage.getItem(cartKey));
  }
  return [];
};

export const simplifiedCart = () => {
  return getLocalCart().map((item) => {
    return {id: item.id, size: item.size}
  });
}