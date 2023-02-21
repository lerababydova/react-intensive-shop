import { SET_MODAL } from "./constants";

const initialState = { isOpened: false, modalType: null };

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL: {
      return action.modal;
    }
    default: {
      return state;
    }
  }
}
