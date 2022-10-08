import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const initialState = {};

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
});

export default store;
