import api from "../api/axios";

export const sendMessage = (data) => {
  return api.post("/messages", data);
};

export const getInbox = () => {
  return api.get("/messages/inbox");
};

export const getSentMessages = () => {
  return api.get("/messages/sent");
};

export const markAsRead = (id) => {
  return api.put(`/messages/${id}/read`);
};