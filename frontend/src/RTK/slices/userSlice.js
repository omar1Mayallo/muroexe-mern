import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
  useUpdateDataWithImage,
  useInsertUpdateData,
} from "../../API/API Hooks/useUpdateData";

const initialState = {
  updateUserInfo: {updatedInfo: [], loading: false, error: null},
  updateUserPassword: {
    updatedPassword: [],
    loadingPass: false,
    errorPass: null,
  },
};

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useUpdateDataWithImage(
        "/api/users/updateMyProfile",
        body
      );
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertUpdateData(
        "/api/users/updateMyPassword",
        body
      );
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // Update User Info
    [updateUserInfo.pending]: (state, action) => {
      state.updateUserInfo.loading = true;
      state.updateUserInfo.error = null;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.updateUserInfo.updatedInfo = action.payload;
      state.updateUserInfo.loading = false;
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.updateUserInfo.error = action.payload;
      state.updateUserInfo.loading = false;
    },
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Update User Password
    [updateUserPassword.pending]: (state, action) => {
      state.updateUserPassword.loadingPass = true;
      state.updateUserPassword.errorPass = null;
    },
    [updateUserPassword.fulfilled]: (state, action) => {
      state.updateUserPassword.updatedPassword = action.payload;
      state.updateUserPassword.loadingPass = false;
    },
    [updateUserPassword.rejected]: (state, action) => {
      state.updateUserPassword.errorPass = action.payload;
      state.updateUserPassword.loadingPass = false;
    },
  },
});
export default userSlice.reducer;
