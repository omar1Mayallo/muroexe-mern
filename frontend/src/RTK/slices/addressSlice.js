import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import useDeleteData from "../../API/API Hooks/useDeleteData";
import {useGetDataLogged} from "../../API/API Hooks/useGetData";
import {useInsertData} from "../../API/API Hooks/useInsertData";

const initialState = {
  addAddress: {addressInfo: [], loading: false, error: null},
  removeAddress: {removedAddress: [], loading: false, error: null},
  getUserAddress: {userAddresses: [], loading: false, error: null},
};

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useInsertData("/api/addresses", body);
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

export const getUserAddress = createAsyncThunk(
  "address/getUserAddress",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useGetDataLogged("/api/addresses");
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

export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async (addressId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const res = await useDeleteData(`/api/addresses/${addressId}`);
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

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: {
    // Add Address
    [addAddress.pending]: (state, action) => {
      state.addAddress.loading = true;
      state.addAddress.error = null;
    },
    [addAddress.fulfilled]: (state, action) => {
      state.addAddress.addressInfo = action.payload;
      state.addAddress.loading = false;
    },
    [addAddress.rejected]: (state, action) => {
      state.addAddress.error = action.payload;
      state.addAddress.loading = false;
    },
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Get User Addresses
    [getUserAddress.pending]: (state, action) => {
      state.getUserAddress.loading = true;
      state.getUserAddress.error = null;
    },
    [getUserAddress.fulfilled]: (state, action) => {
      state.getUserAddress.userAddresses = action.payload;
      state.getUserAddress.loading = false;
    },
    [getUserAddress.rejected]: (state, action) => {
      state.getUserAddress.error = action.payload;
      state.getUserAddress.loading = false;
    },
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Remove Address
    [removeAddress.pending]: (state, action) => {
      state.removeAddress.loading = true;
      state.removeAddress.error = null;
    },
    [removeAddress.fulfilled]: (state, action) => {
      state.removeAddress.removedAddress = action.payload;
      state.removeAddress.loading = false;
    },
    [removeAddress.rejected]: (state, action) => {
      state.removeAddress.error = action.payload;
      state.removeAddress.loading = false;
    },
  },
});
export default addressSlice.reducer;
