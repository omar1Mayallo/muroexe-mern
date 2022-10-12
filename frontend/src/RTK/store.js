import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "redux-logger";

const initialState = {};
const middlewares = process.env.NODE_ENV !== "production" && logger;

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
});

export default store;
