import api from "./api";

export const listUsers = async () => {
  const res = await api.get("/users/");
  return res.data;
};

export const retrieveUser = async (id) => {
  const res = await api.get(`/users/${id}/`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post(`/users/`, data);
  return res.data;
};

export const updateUser = async (userId, formData) => {
  const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
    method: "PATCH",
    body: formData,         
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}/`);
  return res.status === 204;
};

export default { listUsers, retrieveUser, createUser, updateUser, deleteUser };
