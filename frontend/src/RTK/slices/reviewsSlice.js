import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import useDeleteData from "../../API/API Hooks/useDeleteData";
import {useGetData} from "../../API/API Hooks/useGetData";
import {useInsertData} from "../../API/API Hooks/useInsertData";
import {useInsertUpdateData} from "../../API/API Hooks/useUpdateData";

const initialState = {
  allReviewForAProduct: {allReviewsProduct: [], loading: false, error: null},
  reviewCreated: {reviewPosted: [], loading: false, error: null},
  reviewUpdated: {reviewChanged: [], loading: false, error: null},
  reviewDeleted: {reviewRemoved: [], loading: false, error: null},
};

//__________PRODUCT_DETAILS_PAGE__________//
export const getAllReviewsForSpecificProduct = createAsyncThunk(
  "review/fetchReviewsForOneProduct",
  async ({productId, page, limit}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetData(
        `/api/products/${productId}/reviews?page=${page}&limit=${limit}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const createReview = createAsyncThunk(
  "review/createReview",
  async ({productId, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertData(
        `/api/products/${productId}/reviews`,
        body
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({productId, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertUpdateData(`/api/reviews/${productId}`, body);
      return res;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (productId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useDeleteData(`/api/reviews/${productId}`);
      return res;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const reviewsSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    //GET All Reviews For One Product
    [getAllReviewsForSpecificProduct.pending]: (state, action) => {
      state.allReviewForAProduct.loading = true;
      state.allReviewForAProduct.error = null;
    },
    [getAllReviewsForSpecificProduct.fulfilled]: (state, action) => {
      state.allReviewForAProduct.allReviewsProduct = action.payload;
      state.allReviewForAProduct.loading = false;
    },
    [getAllReviewsForSpecificProduct.rejected]: (state, action) => {
      state.allReviewForAProduct.error = action.payload;
      state.allReviewForAProduct.loading = false;
    },
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    //CREATE Review for specific product
    [createReview.pending]: (state, action) => {
      state.reviewCreated.loading = true;
      state.reviewCreated.error = null;
    },
    [createReview.fulfilled]: (state, action) => {
      state.reviewCreated.reviewPosted = action.payload;
      state.reviewCreated.loading = false;
    },
    [createReview.rejected]: (state, action) => {
      state.reviewCreated.error = action.payload;
      state.reviewCreated.loading = false;
    },
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    //UPDATE Review for specific product
    [updateReview.pending]: (state, action) => {
      state.reviewUpdated.loading = true;
      state.reviewUpdated.error = null;
    },
    [updateReview.fulfilled]: (state, action) => {
      state.reviewUpdated.reviewChanged = action.payload;
      state.reviewUpdated.loading = false;
    },
    [updateReview.rejected]: (state, action) => {
      state.reviewUpdated.error = action.payload;
      state.reviewUpdated.loading = false;
    },
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    //DELETE Review for specific product
    [deleteReview.pending]: (state, action) => {
      state.reviewDeleted.loading = true;
      state.reviewDeleted.error = null;
    },
    [deleteReview.fulfilled]: (state, action) => {
      state.reviewDeleted.reviewRemoved = action.payload;
      state.reviewDeleted.loading = false;
    },
    [deleteReview.rejected]: (state, action) => {
      state.reviewDeleted.error = action.payload;
      state.reviewDeleted.loading = false;
    },
  },
});
export default reviewsSlice.reducer;
