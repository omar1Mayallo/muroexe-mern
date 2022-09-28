import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {products: [], loading: false, error: null};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    //GET Top Sales Products
  },
});

// export const {increment, decrement, incrementByAmount} = counterSlice.actions;
export default productSlice.reducer;
