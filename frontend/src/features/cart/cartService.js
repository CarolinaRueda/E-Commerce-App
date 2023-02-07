import axios from "axios";

const API_URL = "http://localhost:4000/";

const createCart = async (userId) => {
  const response = await axios.post(API_URL + "user/cart", { userId });

  if (response) {
    localStorage.setItem("cartId", JSON.stringify(response.data.id));
  }

  return response.data.id;
};

const getCart = async (userId) => {
  const response = await axios.get(API_URL + `user/cart/${userId}`);
  if (response) {
    localStorage.setItem("cartId", JSON.stringify(response.data.id));
  }
  return response.data;
};

const getCartItems = async (cartId) => {
  const response = await axios.get(API_URL + `user/cart/${cartId}/items`);
  return response.data;
};

const addItems = async (product) => {
  const { quantity, userId, productId, cartId } = product;

  const response = await axios.post(API_URL + `user/cart/${cartId}/${userId}`, {
    quantity,
    productId,
  });
  return response.data;
};

const deleteItems = async (info) => {
  const { productId, cartId } = info;
  const response = await axios.delete(
    API_URL + `user/cart/${cartId}/item/${productId}`
  );

  return response.data;
};

// Route user/cart/:cartId/:userId

const deleteAllItems = async (info) => {
  const { userId, cartId } = info;
  const response = await axios.delete(
    API_URL + `user/cart/${cartId}/${userId}`
  );

  return response.data;
};

const cartService = {
  createCart,
  getCart,
  getCartItems,
  addItems,
  deleteItems,
  deleteAllItems,
};

export default cartService;
