import {combineReducers} from "@reduxjs/toolkit";
import addressSlice from "./slices/addressSlice";
import authSlice from "./slices/authSlice";
import brandsSlice from "./slices/brandsSlice";
import cartSlice from "./slices/cartSlice";
import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";
import reviewSlice from "./slices/reviewsSlice";
import userSlice from "./slices/userSlice";
import wishlistSlice from "./slices/wishlistSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  categories: categoriesSlice,
  brands: brandsSlice,
  reviews: reviewSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
  user: userSlice,
  address: addressSlice,

  authSlice,
});

export default rootReducer;
