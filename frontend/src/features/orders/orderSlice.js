import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createOrder = createAsyncThunk(
  "order/create",
  async (info, thunkAPI) => {
    try {
      return await orderService.createOrder(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loadOrders = createAsyncThunk(
  "orders/getOrders",
  async (userId, thunkAPI) => {
    try {
      return await orderService.loadOrders(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "orders/status",
  async (info, thunkAPI) => {
    try {
      return await orderService.updateOrder(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = current(state.orders).map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, status: action.payload.status };
          }
          return order;
        });
      })
      .addCase(updateStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default orderSlice.reducer;
