import axiosInstance from "@/constant/constant";
import { sendChatBody } from "@/types/chatType";
import { chatCredentil } from "@/types/userAuth";
import { createAsyncThunk } from "@reduxjs/toolkit";
const chatbaseURL: string = "/chat";
const messagebaseURL: string = "/messages";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSpecifChat: any = createAsyncThunk(
  "chat/getSpecifchat",
  async ({ currentId, toId }: chatCredentil, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${chatbaseURL}/create-chat`, {
        firstId: currentId,
        secondId: toId,
      });

      
      const response = await axiosInstance.get(
        `${messagebaseURL}/get-message/${data?.chat?._id}`
      );
      return {
        chats: { ...response.data, chatId: data?.chat?._id },
        selectedUser: data.selectedUser,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendChat: any = createAsyncThunk(
  "chat/sendChat",
  async ({ content, senderId, chatId }: sendChatBody, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${messagebaseURL}/create-message`,
        { content, senderId, chatId }
      );
      console.log("🚀 ~ data: ______________________", data)

      return {chats:data};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
