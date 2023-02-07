import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
