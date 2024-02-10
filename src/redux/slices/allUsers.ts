import { allUser } from "@/types/Alluser";
import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../actions/User/allUserAction";

const initialState: allUser = {
  loading: false,
  err: false,
  users: null,
};

const allUserSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
        state.err = false;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.users = null;
        state.err=payload?.response?.data?.err
      });
  },
});

export default allUserSlice.reducer;
