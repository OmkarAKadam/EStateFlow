import api from "../api/axios";

export const getImagesByProperty = (propertyId) => {
  return api.get(`/property-images/property/${propertyId}`);
};

export const uploadPropertyImage = (propertyId, file) => {

  const formData = new FormData();
  formData.append("file", file);

  return api.post(
    `/property-images/${propertyId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};