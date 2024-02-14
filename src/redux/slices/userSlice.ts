import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthentication,
  loginUser,
  logoutUser,
  signupUser,
} from "../actions/User/authAction";
import toast from "react-hot-toast";
interface UserState {
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: null | any; // Replace YourUserType with the actual type of your user
  error: null | string; // Replace string with the actual type of your error
}
const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload?.response?.data?.err;
        if (payload.message == "Network Error") {
          toast.error(payload.message);
        } else {
          toast.error(payload?.response?.data?.err);
        }
      })
      // user auth check
      .addCase(checkAuthentication.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthentication.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(checkAuthentication.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload?.response?.data?.err;
      })
      // user logout controlling
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        toast.success("Logout successfull!!");
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.response?.data?.err;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        toast.success("Login successfull!!");
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload?.response?.data?.err;
        toast.error(payload?.response?.data?.err);
      });
  },
});

export default userSlice.reducer;
