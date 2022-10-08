import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
  useInsertData,
  userInsertDataWithImg,
} from "../../API/API Hooks/useInsertData";

const initialState = {
  loginUser: {loggedUser: [], loading: false, error: null},
  registerUser: {registeredUser: [], loading: false, error: null},
};

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({email, password}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const {data} = await useInsertData("/api/users/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// REGISTER || Create a new user
export const createNewUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const {data} = await userInsertDataWithImg(
        "/api/users/register",
        userData
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // Login
    [login.pending]: (state, action) => {
      state.loginUser.loading = true;
      state.loginUser.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loginUser.loggedUser = action.payload;
      state.loginUser.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.loginUser.error = action.payload;
      state.loginUser.loading = false;
    },

    // Register || Create a new user
    [createNewUser.pending]: (state, action) => {
      state.registerUser.loading = true;
      state.registerUser.error = null;
    },
    [createNewUser.fulfilled]: (state, action) => {
      state.registerUser.registeredUser = action.payload;
      state.registerUser.loading = false;
    },
    [createNewUser.rejected]: (state, action) => {
      state.registerUser.error = action.payload;
      state.registerUser.loading = false;
    },
  },
});

export default authSlice.reducer;
