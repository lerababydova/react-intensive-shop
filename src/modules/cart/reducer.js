import { CLEAR_CART, SET_CART } from "./constants";

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      return action.cart;
    }
    case CLEAR_CART: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
