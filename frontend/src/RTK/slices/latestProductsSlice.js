import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {latestProducts: [], loading: false, error: null};

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

const latestProductSlice = createSlice({
  name: "latestProducts",
  initialState,
  reducers: {},
  extraReducers: {
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

export default latestProductSlice.reducer;
