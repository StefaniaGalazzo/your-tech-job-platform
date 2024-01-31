import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../actions/favorite-actions"; //
import { initialState } from "../store/store-favorite";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (company) => company._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
export default rootReducer;
