import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData?.token) {
    config.headers.Authorization = `Token ${userData.token}`;
  }
  return config;
});

export const login = async (username, password) => {
  try {
    const res = await api.post("/api-token-auth/", {
      username,
      password,
    });
    const token = res.data.token;

    localStorage.setItem("userData", JSON.stringify({
      username,
      token,
    }));

    return res.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

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

// ✅ Create Post
// src/services/postService.js

// CREATE POST
export const createPost = async (formData) => {
  const res = await fetch("http://127.0.0.1:8000/api/posts/", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`, // Shan’s token stored here
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server error ${res.status}: ${text}`);
  }

  return await res.json();
};

// ✅ Update Post
export const updatePostApi = async (postId, updatedData) => {
  const res = await api.patch(`/posts/${postId}/`, updatedData);
  return res.data;
};

// ✅ Delete Post
export const deletePostApi = async (postId) => {
  await api.delete(`/posts/${postId}/`);
};

export default api;