import axiosInstance from "@/constant/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllUsers: any = createAsyncThunk(
  "users/getAllusers",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/get-allUsers?id=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
