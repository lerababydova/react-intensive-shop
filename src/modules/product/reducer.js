import { SET_PRODUCTS } from "./constants";

const initialState = [];

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS: {
      return action.products;
    }
    default: {
      return state;
    }
  }
}
