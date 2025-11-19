import axios from "../lib/axiosInstances";

const todoApi = {
  getAll: async (status) => {
    const params = status ? { status } : {};
    return await axios.get("/todos", { params });
  },

  getById: async (id) => {
    return await axios.get(`/todos/${id}`);
  },

  create: async (data) => {
    return await axios.post("/todos", data);
  },

  update: async (id, data) => {
    return await axios.put(`/todos/${id}`, data);
  },

  toggleDone: async (id) => {
    return await axios.patch(`/todos/${id}/done`);
  },

  delete: async (id) => {
    return await axios.delete(`/todos/${id}`);
  },
};

export default todoApi;
