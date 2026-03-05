import api from "./api";

export const listPosts = async () => {
  const res = await api.get("/posts/");
  return res.data;
};

export const retrievePost = async (id) => {
  const res = await api.get(`/posts/${id}/`);
  return res.data;
};

export const createPost = async (post) => {
  const formData = new FormData();
  Object.keys(post).forEach((key) => {
    if (post[key] !== undefined && post[key] !== null) {
      formData.append(key, post[key]);
    }
  });
  const res = await api.post("/posts/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updatePost = async (id, post) => {
  const formData = new FormData();
  Object.keys(post).forEach((key) => {
    if (post[key] !== undefined && post[key] !== null) {
      formData.append(key, post[key]);
    }
  });
  const res = await api.put(`/posts/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}/`);
  return res.status === 204;
};

export default {
  listPosts,
  retrievePost,
  createPost,
  updatePost,
  deletePost,
};
