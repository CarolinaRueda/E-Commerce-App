import axios from "axios";

const API_URL = "http://localhost:4000/";

// Load all products
export const loadProducts = async () => {
  const response = await axios.get(API_URL + "products");
  return response.data;
};

const productService = {
  loadProducts,
};

export default productService;
