import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import cartService from "./cartService";

// Get cart from LocalStorage
const cartId = JSON.parse(localStorage.getItem("cartId"));

const initialState = {
  items: [],
  cartId: cartId ? cartId : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create cart
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (userId, thunkAPI) => {
    try {
      return await cartService.createCart(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Cart
export const getCartId = createAsyncThunk(
  "cart/getCart",
  async (userId, thunkAPI) => {
    try {
      return await cartService.getCart(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Cart Items
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (cartId, thunkAPI) => {
    try {
      return await cartService.getCartItems(cartId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Post to Add Items
export const addItems = createAsyncThunk(
  "cart/addItems",
  async (product, thunkAPI) => {
    try {
      return await cartService.addItems(product);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Items
export const deleteItems = createAsyncThunk(
  "cart/deleteItem",
  async (info, thunkAPI) => {
    try {
      return await cartService.deleteItems(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete All Items
export const deleteAllItems = createAsyncThunk(
  "cart/deleteAllItems",
  async (info, thunkAPI) => {
    try {
      return await cartService.deleteAllItems(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartId = action.payload;
      })
      .addCase(createCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCartId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartId = action.payload.id;
      })
      .addCase(getCartId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cartId = null;
      })
      .addCase(addItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.items = [];
      })
      .addCase(deleteItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = current(state.items).filter(
          (item) => item.product_id !== action.payload.id
        );
      })
      .addCase(deleteItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAllItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = [];
      })
      .addCase(deleteAllItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.items;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.items = [];
      });
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
