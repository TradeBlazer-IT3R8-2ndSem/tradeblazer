import axios from "axios";
import api from "./api";

export const getToken = async (username, password) => {
  const res = await axios.post("http://127.0.0.1:8000/api-token-auth/", {
    username,
    password,
  });
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/users/", data);
  return res.data;
};

export default { getToken, register };
