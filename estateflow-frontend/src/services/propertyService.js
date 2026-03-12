import api from "../api/axios";

export const getAllProperties = (page) => {
  return api.get(`/properties?page=${page}&size=10`);
};

export const getPropertyById = (id) => {
  return api.get(`/properties/${id}`);
};

export const createProperty = (data) => {
  return api.post("/properties", data);
};


export const getMyProperties = () => {
  return api.get("/properties/my-properties");
};

export const searchByLocation = (location) => {
  return api.get(`/properties/search/location?location=${location}`);
};

export const searchByPrice = (min, max) => {
  return api.get(`/properties/search/price?min=${min}&max=${max}`);
};

export const searchByType = (type) => {
  return api.get(`/properties/search/type?type=${type}`);
};