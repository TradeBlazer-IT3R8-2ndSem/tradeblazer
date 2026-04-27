// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired access token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh,
          });
          const newAccess = res.data.access;

          localStorage.setItem("access", newAccess);
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

          return api(originalRequest);
        } catch (err) {
          // Refresh failed → force logout
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// 🔑 Login: obtain access + refresh tokens
export const login = async (username, password) => {
  try {
    const res = await api.post("/token/", { username, password });
    const { access, refresh } = res.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    return res.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// 🚪 Logout: clear tokens
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

// Example API calls
export const getCategories = async () => {
  const res = await api.get("/categories/");
  return res.data;
};

export const getBestSellingPosts = async () => {
  const res = await api.get("/posts/best-selling/");
  return res.data;
};

export const getPosts = async () => {
  const res = await api.get("/posts/");
  return res.data;
};

export const createPost = async (formData) => {
  const res = await api.post("/posts/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updatePostApi = async (postId, updatedData) => {
  const res = await api.patch(`/posts/${postId}/`, updatedData);
  return res.data;
};

export const deletePostApi = async (postId) => {
  await api.delete(`/posts/${postId}/`);
};

export const getOrCreateChatRoom = async (otherUserId) => {
  const res = await api.post("/chatrooms/get_or_create/", { other_user_id: otherUserId });
  return res.data;
};

export const getMessages = async (chatroomId) => {
  const res = await api.get(`/messages/?chatroom=${chatroomId}`);
  return res.data;
};

export const sendMessage = async (chatroomId, content) => {
  const res = await api.post("/messages/", { chatroom: chatroomId, content });
  return res.data;
};

export default api;
