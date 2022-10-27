import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import useDeleteData from "../../API/API Hooks/useDeleteData";
import {useGetDataLogged} from "../../API/API Hooks/useGetData";
import {useInsertData} from "../../API/API Hooks/useInsertData";
import {useInsertUpdateData} from "../../API/API Hooks/useUpdateData";

const initialState = {
  addToCart: {addCart: [], loading: false, error: null},
  removeFromCart: {removedCart: [], loading: false, error: null},
  getUserCart: {userCart: [], loading: false, error: null},
  updateCartItemQty: {updatedCartItem: [], loading: false, error: null},
  clearCart: {clearedCart: [], loading: false, error: null},
  applyCoupon: {appliedCoupon: [], loading: false, error: null},
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertData("/api/carts", body);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetDataLogged("/api/carts");
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useDeleteData(`/api/carts/${productId}`);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async ({productId, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertUpdateData(`/api/carts/${productId}`, body);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useDeleteData(`/api/carts`);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertUpdateData(`/api/carts/applyCoupon`, body);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    // Add To Cart
    [addToCart.pending]: (state, action) => {
      state.addToCart.loading = true;
      state.addToCart.error = null;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.addToCart.addCart = action.payload;
      state.addToCart.loading = false;
    },
    [addToCart.rejected]: (state, action) => {
      state.addToCart.error = action.payload;
      state.addToCart.loading = false;
    },
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // Get User Cart
    [getUserCart.pending]: (state, action) => {
      state.getUserCart.loading = true;
      state.getUserCart.error = null;
    },
    [getUserCart.fulfilled]: (state, action) => {
      state.getUserCart.userCart = action.payload;
      state.getUserCart.loading = false;
    },
    [getUserCart.rejected]: (state, action) => {
      state.getUserCart.error = action.payload;
      state.getUserCart.loading = false;
    },
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // Remove From Cart
    [removeFromCart.pending]: (state, action) => {
      state.removeFromCart.loading = true;
      state.removeFromCart.error = null;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.removeFromCart.removedCart = action.payload;
      state.removeFromCart.loading = false;
    },
    [removeFromCart.rejected]: (state, action) => {
      state.removeFromCart.error = action.payload;
      state.removeFromCart.loading = false;
    },
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // Update Cart Item Quantity
    [updateCartItemQty.pending]: (state, action) => {
      state.updateCartItemQty.loading = true;
      state.updateCartItemQty.error = null;
    },
    [updateCartItemQty.fulfilled]: (state, action) => {
      state.updateCartItemQty.updatedCartItem = action.payload;
      state.updateCartItemQty.loading = false;
    },
    [updateCartItemQty.rejected]: (state, action) => {
      state.updateCartItemQty.error = action.payload;
      state.updateCartItemQty.loading = false;
    },
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // ClearCart
    [clearCart.pending]: (state, action) => {
      state.clearCart.loading = true;
      state.clearCart.error = null;
    },
    [clearCart.fulfilled]: (state, action) => {
      state.clearCart.clearedCart = action.payload;
      state.clearCart.loading = false;
    },
    [clearCart.rejected]: (state, action) => {
      state.clearCart.error = action.payload;
      state.clearCart.loading = false;
    },
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // Apply Coupon
    [applyCoupon.pending]: (state, action) => {
      state.applyCoupon.loading = true;
      state.applyCoupon.error = null;
    },
    [applyCoupon.fulfilled]: (state, action) => {
      state.applyCoupon.appliedCoupon = action.payload;
      state.applyCoupon.loading = false;
    },
    [applyCoupon.rejected]: (state, action) => {
      state.applyCoupon.error = action.payload;
      state.applyCoupon.loading = false;
    },
  },
});
export default cartSlice.reducer;
