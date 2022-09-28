import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {topSalesProducts: [], loading: false, error: null};

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

const topSalesProductsSlice = createSlice({
  name: "topSalesProducts",
  initialState,
  reducers: {},
  extraReducers: {
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
  },
});

export default topSalesProductsSlice.reducer;
