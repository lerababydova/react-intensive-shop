import { CLEAR_CART, SET_CART } from "./constants";
import { selectCart } from "./selectors";

export const setCart = (cart) => ({ type: SET_CART, cart });

export const addToCartById =
  (id, count = 1) =>
  (dispatch, getState) => {
    const state = getState();

    const cart = selectCart(state);
    const productCount = cart[id];

    const newCart = {
      ...cart,
      [id]: productCount ? productCount + count : count,
    };
    dispatch(setCart(newCart));
  };

export const removeProductFromCardById = (id) => (dispatch, getState) => {
  const state = getState();

  const cart = selectCart(state);

  const newCart = {
    ...cart,
  };
  delete newCart[id];

  dispatch(setCart(newCart));
};

export const changeCartProductCountById =
  (id, count) => (dispatch, getState) => {
    const state = getState();

    const cart = selectCart(state);

    const newCart = {
      ...cart,
    };

    newCart[id] = count;

    dispatch(setCart(newCart));
  };

export const clearCart = () => ({ type: CLEAR_CART });
