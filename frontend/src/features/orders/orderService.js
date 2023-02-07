import axios from "axios";

const API_URL = "http://localhost:4000/";

// checkout/cart/:cartId
const createOrder = async (info) => {
  let { cartId, userId, total, items } = info;

  const today = new Date().getTime();
  const randomDay = 100000000 * Math.round(Math.random() * 20) + 100000000;
  const deliverDate = new Date(today + randomDay).toISOString().split("T")[0];

  const response = await axios.post(API_URL + `checkout/cart/${cartId}`, {
    deliverDate,
    userId,
    total,
    items,
  });

  return response.data;
};

// orders/:userId
const loadOrders = async (userId) => {
  const response = await axios.get(API_URL + `orders/${userId}`);
  return response.data;
};

// Route: orders/:id/updateOrder
const updateOrder = async (info) => {
  const { id, status } = info;
  const response = await axios.put(API_URL + `orders/${id}/updateOrder`, {
    status,
  });
  return response.data;
};

const orderService = {
  createOrder,
  loadOrders,
  updateOrder,
};

export default orderService;
