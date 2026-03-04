import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

export const getCategories = async () => {
  const res = await api.get("/categories/");
  return res.data;
};

export const getPosts = async () => {
  const res = await api.get("/posts/");
  return res.data;
};

export default api;