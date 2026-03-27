import axios from "axios";
import api from "./api";

export const login = async (username, password) => {
  const res = await axios.post("http://127.0.0.1:8000/api/token/", {
    username,
    password,
  });
  const { token } = res.data;
  localStorage.setItem("token", token); // ✅ store token
  return token;
};

export const register = async (data) => {
  const res = await api.post("/users/", data);
  return res.data;
};

export default { getToken, register };
