import api from "../api/axios";

export const getAllProperties = (page) => {
  return api.get(`/properties?page=${page}&size=9`);
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

export const updateProperty = (id, data) => {
  return api.put(`/properties/${id}`, data);
};

export const deleteProperty = (id) => {
  return api.delete(`/properties/${id}`);
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