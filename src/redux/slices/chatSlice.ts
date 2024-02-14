/* eslint-disable no-self-assign */
import { chatType } from "@/types/chatType";
import { createSlice } from "@reduxjs/toolkit";
import { getSpecifChat, sendChat } from "../actions/Chat/getSpcificChat";
import toast from "react-hot-toast";

const initialState: chatType = {
  loading: false,
  err: false,
  chat: null,
  selectedUser: null,
};

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getMessage: (state, action: PayloadAction<messagesType>) => {
      
      // if (state.chat) {
      //   state.chat = {
      //     ...state.chat,
      //     messages: [...state.chat.messages, action.payload],
      //   };
      // }
      state.loading=false;
      state.err=false
      const messages=state.chat?.messages
      state.chat.messages=[...messages,action.payload]
      state.selectedUser=state.selectedUser
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpecifChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSpecifChat.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        state.chat = payload.chats;
        state.selectedUser = payload.selectedUser;
        state.err = false;
      })
      .addCase(getSpecifChat.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload?.response?.data?.err;
        toast.error(payload?.response?.data?.err);
        state.chat = null;
      })
      // send chat
      .addCase(sendChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChat.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.chat = payload.chats;
        state.err = false;
      })
      .addCase(sendChat.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload?.response?.data?.err;
      });
  },
});
export default chatReducer.reducer;
export const {getMessage}=chatReducer.actions
