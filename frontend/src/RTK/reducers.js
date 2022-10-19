import {combineReducers} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import brandsSlice from "./slices/brandsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";
import reviewSlice from "./slices/reviewsSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  categories: categoriesSlice,
  brands: brandsSlice,
  reviews: reviewSlice,
  authSlice,
});

export default rootReducer;
