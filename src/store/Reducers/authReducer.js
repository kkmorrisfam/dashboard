import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, { withCredentials: true});
        
      localStorage.setItem('accessToken', data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {
    messageClear : (state,_) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, {payload}) => {
        console.log("pending payload:", payload);
        state.loader = true;

      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        console.log("🔥 Rejected payload:", payload);
        state.loader = false;
        state.errorMessage = payload.error; //error comes from state and backend error message
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        console.log("fulfilled payload:", payload);
        state.loader = false;
        state.successMessage = payload.message; //error comes from state and backend error message
      });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
