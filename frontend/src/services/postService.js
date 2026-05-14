import api from "./api";

// GET ALL POSTS
export const listPosts = async () => {
  const res = await api.get("/posts/");
  return res.data;
};

// CREATE POST ✅ FIXED
export const createPost = async (formData) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/posts/", {
      method: "POST",
      body: formData, // must be FormData for images
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(JSON.stringify(data));
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// UPDATE POST
export const updatePost = async (id, post) => {
  let data, headers;
  if (post.image && post.image instanceof File) {
    // Use FormData for file uploads
    data = new FormData();
    Object.keys(post).forEach((key) => {
      if (post[key] !== undefined && post[key] !== null) {
        data.append(key, post[key]);
      }
    });
    headers = { "Content-Type": "multipart/form-data" };
  } else {
    // Use JSON for non-file updates
    data = JSON.stringify(post);
    headers = { "Content-Type": "application/json" };
  }

  const res = await api.put(`/posts/${id}/`, data, { headers });
  return res.data;
};

// DELETE POST
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}/`);
  return res.status === 204;
};

export default {
  listPosts,
  createPost,
  updatePost,
  deletePost,
};