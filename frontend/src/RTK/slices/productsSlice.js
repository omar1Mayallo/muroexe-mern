import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useGetData} from "../../API/API Hooks/useGetData";

const initialState = {
  latestProducts: [],
  topSalesProducts: [],

  loading: false,
  error: null,

  allProductsShop: {productsShop: [], loading: false, error: null},
  allProductsCategory: {productsCategory: [], loading: false, error: null},
  productDetails: {productInfo: [], loading: false, error: null},
};

//__________HOME_PAGE__________//
export const getTopSalesProducts = createAsyncThunk(
  "product/fetchTopSalesProducts",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetData("/api/products/top-7-sales");
      return res;
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
      const res = await useGetData("/api/products/top-7-latest-products");
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//__________PRODUCT_DETAILS_PAGE__________//
export const getProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetData(`/api/products/${productId}`);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0].msg);
    }
  }
);

//__________SHOP_PAGE__________//
export const getAllProductsShop = createAsyncThunk(
  "/products/fetchAllProductsShop",
  async (queryString, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetData(`/api/products?${queryString}`);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(error.message);
      // }
    }
  }
);

//__________CATEGORY_PAGE__________//
export const getAllProductsCategory = createAsyncThunk(
  "/products/fetchAllProductsCategory",
  async (queryString, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetData(`/api/products?${queryString}`);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(error.message);
      // }
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
    //-----------------------------------------------------//
    //-----------------------------------------------------//
    //GET Product Details
    [getProductDetails.pending]: (state, action) => {
      state.productDetails.loading = true;
      state.productDetails.error = null;
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.productDetails.productInfo = action.payload;
      state.productDetails.loading = false;
    },
    [getProductDetails.rejected]: (state, action) => {
      state.productDetails.error = action.payload;
      state.productDetails.loading = false;
    },

    //-----------------------------------------------------//
    //-----------------------------------------------------//
    //GET All Products For ShopPage
    [getAllProductsShop.pending]: (state, action) => {
      state.allProductsShop.loading = true;
      state.allProductsShop.error = null;
    },
    [getAllProductsShop.fulfilled]: (state, action) => {
      state.allProductsShop.productsShop = action.payload;
      state.allProductsShop.loading = false;
    },
    [getAllProductsShop.rejected]: (state, action) => {
      state.allProductsShop.error = action.payload;
      state.allProductsShop.loading = false;
    },
    //-----------------------------------------------------//
    //-----------------------------------------------------//
    //GET All Products For CategoryPage
    [getAllProductsCategory.pending]: (state, action) => {
      state.allProductsCategory.loading = true;
      state.allProductsCategory.error = null;
    },
    [getAllProductsCategory.fulfilled]: (state, action) => {
      state.allProductsCategory.productsCategory = action.payload;
      state.allProductsCategory.loading = false;
    },
    [getAllProductsCategory.rejected]: (state, action) => {
      state.allProductsCategory.error = action.payload;
      state.allProductsCategory.loading = false;
    },
  },
});

export default productsSlice.reducer;
