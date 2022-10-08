import {combineReducers} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  categories: categoriesSlice,
  authSlice,
});

export default rootReducer;
