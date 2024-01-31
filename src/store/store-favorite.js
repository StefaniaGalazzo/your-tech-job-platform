// store.js
import { createStore } from "redux";
import rootReducer from "../reducers/favorite-reduce";

// reducer
const initialState = {
  companies: [],
  favorites: [],
};

// Store
const store = createStore(rootReducer);

export { store, initialState };
