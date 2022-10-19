import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../API/API Hooks/useGetData";
const initialState = {
  allBrands: [],
  loading: false,
  error: null,
};

export const getAllBrands = createAsyncThunk(
  "brand/fetchAllBrands",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetData("/api/brands");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: {
    // GET All Brands
    [getAllBrands.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getAllBrands.fulfilled]: (state, action) => {
      state.allBrands = action.payload;
      state.loading = false;
    },
    [getAllBrands.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default brandsSlice.reducer;
