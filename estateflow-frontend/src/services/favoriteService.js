import api from "../api/axios";

export const addFavorite = (propertyId) => {
  return api.post(`/favorites/${propertyId}`);
};

export const getFavorites = () => {
  return api.get("/favorites");
};

export const removeFavorite = (favoriteId) => {
  return api.delete(`/favorites/${favoriteId}`);
};