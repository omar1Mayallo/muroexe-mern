import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../API/API Hooks/useGetData";
const initialState = {
  allCategories: [],
  loading: false,
  error: null,

  category: {categoryInfo: [], loading: false, error: null},
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

export const getACategory = createAsyncThunk(
  "category/fetchACategory",
  async (catId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetData(`/api/categories/${catId}`);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.errors[0].msg);
      } else {
        return rejectWithValue(error);
      }
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
    // GET A Category
    [getACategory.pending]: (state, action) => {
      state.category.loading = true;
      state.category.error = null;
    },
    [getACategory.fulfilled]: (state, action) => {
      state.category.categoryInfo = action.payload;
      state.category.loading = false;
    },
    [getACategory.rejected]: (state, action) => {
      state.category.error = action.payload;
      state.category.loading = false;
    },
  },
});

export default categoriesSlice.reducer;
