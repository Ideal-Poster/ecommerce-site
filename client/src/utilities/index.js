const CART_KEY = 'cart';

export function calculatePrice(items) {
  return `$${items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)}`;
};

export function setLocalStorageCart(value, cartKey = CART_KEY) {
  if (localStorage) {
      localStorage.setItem(cartKey, JSON.stringify(value));
  }
};

export function getLocalCart(cartKey = CART_KEY) {
  if (localStorage && localStorage.getItem(cartKey)) {
      return JSON.parse(localStorage.getItem(cartKey));
  }
  return [];
};

export function setLogInStatus(status: Boolean) {
  window.localStorage.setItem('loggedIn', status);  
};

export function loggedIn() {
  return window.localStorage.loggedIn;
};

export function simplifiedCart() {
  return getLocalCart().map((item) => {
    return {id: item.id, size: item.size}
  });
};