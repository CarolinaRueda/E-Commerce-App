import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import productService from "./productService";

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.loadProducts();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = [];
      });
  },
});

export default productsSlice.reducer;
