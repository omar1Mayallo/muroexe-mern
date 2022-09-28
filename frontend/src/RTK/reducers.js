import {combineReducers} from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import latestProductSlice from "./slices/latestProductsSlice";
import topSalesProductsSlice from "./slices/topSalesProductsSlice";

const rootReducer = combineReducers({
  latest: latestProductSlice,
  topSales: topSalesProductsSlice,
  products: productSlice,
});

export default rootReducer;
