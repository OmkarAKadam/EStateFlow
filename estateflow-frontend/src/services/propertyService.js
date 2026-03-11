import api from "../api/axios";

export const getAllProperties = (page = 0) => {
  return api.get(`/properties?page=${page}&size=10`);
};

export const getPropertyById = (id) => {
  return api.get(`/properties/${id}`);
};

export const createProperty = (data) => {
  return api.post("/properties", data);
};
