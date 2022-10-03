import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  allCategories: [],
  loading: false,
  error: null,
};

export const getAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const {data} = await axios("/api/categories");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    // GET All Categories
    [getAllCategories.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.allCategories = action.payload;
      state.loading = false;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default categoriesSlice.reducer;
