import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:4000/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.dataObject) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("cartId");
  Cookies.remove("user");
};

// Update password
// users/:userId
const updatePassword = async (info) => {
  const { userId, passwords } = info;
  const response = await axios.put(API_URL + `users/${userId}`, { passwords });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  updatePassword,
};

export default authService;
