import {combineReducers} from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  categories: categoriesSlice,
});

export default rootReducer;
