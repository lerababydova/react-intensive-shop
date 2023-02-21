import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import cartReducer from "../cart/reducer";
import modalReducer from "../modal/reducer";
import productReducer from "../product/reducer";
import userReducer from "../user/reducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer,
  modal: modalReducer,
});

const middlewareEnhancer = applyMiddleware(thunk);

const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeWithDevTools(middlewareEnhancer);

export const store = createStore(rootReducer, composedEnhancers);
