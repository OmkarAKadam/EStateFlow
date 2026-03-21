import api from "../api/axios";

export const getPropertyImages = (propertyId) => {
  return api.get(`/property-images/property/${propertyId}`);
};

export const uploadPropertyImage = (propertyId, formData) => {
  return api.post(`/property-images/${propertyId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePropertyImage = (id) => {
  return api.delete(`/property-images/${id}`);
};