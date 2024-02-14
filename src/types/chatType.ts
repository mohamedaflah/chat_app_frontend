export interface chatType {
  loading: boolean;
  chat: null | [];
  err: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedUser: null | any;
}

export interface sendChatBody {
  chatId: string;
  content: string;
  senderId: string;
}

export type messagesType = {
  _id: string;
  chatId: string;
  content: string;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
};

