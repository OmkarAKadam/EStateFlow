import api from "../api/axios";

export const sendMessage = (data) => {
  return api.post("/messages", data);
};

export const getInbox = () => {
  return api.get("/messages/inbox");
};

export const getAllMessages = () => {
  return api.get("/messages/all");
};

export const markAsRead = (id) => {
  return api.put(`/messages/${id}/read`);
};

export const getConversation = (userId, propertyId) => {
  return api.get(`/messages/conversation?userId=${userId}&propertyId=${propertyId}`);
};