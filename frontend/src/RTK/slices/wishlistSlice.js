import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useGetDataLogged} from "../../API/API Hooks/useGetData";
import {useInsertData} from "../../API/API Hooks/useInsertData";
import useDeleteData from "../../API/API Hooks/useDeleteData";

const initialState = {
  addToWishlist: {addWishlist: [], loading: false, error: null},
  getUserWishList: {userWishlist: [], loading: false, error: null},
  removeFromWishlist: {wishlist: [], loading: false, error: null},
};

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertData("/api/wishlist", productId);
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

export const getUserWishList = createAsyncThunk(
  "wishlist/getUserWishList",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetDataLogged("/api/wishlist");
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

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useDeleteData(`/api/wishlist/${productId}`);
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

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: {
    // Add To wishlist
    [addToWishlist.pending]: (state, action) => {
      state.addToWishlist.loading = true;
      state.addToWishlist.error = null;
    },
    [addToWishlist.fulfilled]: (state, action) => {
      state.addToWishlist.addWishlist = action.payload;
      state.addToWishlist.loading = false;
    },
    [addToWishlist.rejected]: (state, action) => {
      state.addToWishlist.error = action.payload;
      state.addToWishlist.loading = false;
    },
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Get User WishList
    [getUserWishList.pending]: (state, action) => {
      state.getUserWishList.loading = true;
      state.getUserWishList.error = null;
    },
    [getUserWishList.fulfilled]: (state, action) => {
      state.getUserWishList.userWishlist = action.payload;
      state.getUserWishList.loading = false;
    },
    [getUserWishList.rejected]: (state, action) => {
      state.getUserWishList.error = action.payload;
      state.getUserWishList.loading = false;
    },
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Remove From Wishlist
    [removeFromWishlist.pending]: (state, action) => {
      state.removeFromWishlist.loading = true;
      state.removeFromWishlist.error = null;
    },
    [removeFromWishlist.fulfilled]: (state, action) => {
      state.removeFromWishlist.wishlist = action.payload;
      state.removeFromWishlist.loading = false;
    },
    [removeFromWishlist.rejected]: (state, action) => {
      state.removeFromWishlist.error = action.payload;
      state.removeFromWishlist.loading = false;
    },
  },
});
export default wishlistSlice.reducer;
