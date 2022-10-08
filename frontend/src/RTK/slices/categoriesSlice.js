import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../API/API Hooks/useGetData";
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
      const res = await useGetData("/api/categories");
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
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
