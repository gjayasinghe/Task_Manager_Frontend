import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tasks. Please try again.");
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(API_BASE_URL, task);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create task. Please try again.");
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task. Please try again.");
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete task. Please try again.");
  }
};
