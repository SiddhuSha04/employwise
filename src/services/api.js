import axios from "axios";

const API_URL = "https://reqres.in/api/users"; // Base API URL

// ✅ Fetch all users
export const fetchUsers = async (page = 1) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data.data; // Returning user data
};

// ✅ Create a new user
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// ✅ Update an existing user
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

// ✅ Delete a user
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
