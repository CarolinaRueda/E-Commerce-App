import axios from "axios";

const API_URL = "http://localhost:4000/";

export const stripeCheckout = async (items) => {
  const response = await axios.post(API_URL + "checkout", { items });

  if (response.data.url) {
    window.location.assign(response.data.url);
  }
};
