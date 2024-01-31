// actions.js

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const addToFavorites = (company) => ({
  type: ADD_TO_FAVORITES, // l'azione che dovrò descrivere in.. NEL REDUCER
  payload: company, // i dati effettivi che l'azione intende trasmettere al reducer
});

export const removeFromFavorites = (company) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: company,
});
