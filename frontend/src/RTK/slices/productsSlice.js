import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  latestProducts: [],
  topSalesProducts: [],

  loading: false,
  error: null,
};

//__________HOME_PAGE__________//
export const getTopSalesProducts = createAsyncThunk(
  "product/fetchTopSalesProducts",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const {data} = await axios("/api/products/top-7-sales");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getLatestProducts = createAsyncThunk(
  "product/fetchLatestProducts",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const {data} = await axios("/api/products/top-7-latest-products");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    //GET Top Sales Products
    [getTopSalesProducts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getTopSalesProducts.fulfilled]: (state, action) => {
      state.topSalesProducts = action.payload;
      state.loading = false;
    },
    [getTopSalesProducts.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    //-----------------------------------------------------//
    //-----------------------------------------------------//
    //GET Latest Products
    [getLatestProducts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getLatestProducts.fulfilled]: (state, action) => {
      state.latestProducts = action.payload;
      state.loading = false;
    },
    [getLatestProducts.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default productsSlice.reducer;
