import api from "./api";

export const listChatRooms = async () => {
  const res = await api.get("/chatrooms/");
  return res.data;
};

export const retrieveMessages = async () => {
  const res = await api.get("/messages/");
  return res.data;
};

export const createMessage = async (data) => {
  const res = await api.post("/messages/", data);
  return res.data;
};

export default { listChatRooms, retrieveMessages, createMessage };
