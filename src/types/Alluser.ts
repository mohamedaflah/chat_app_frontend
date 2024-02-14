export interface oneUserType {
  _id: string;
  username: string;
  email: string;
  profile: string;
  joinedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  lastSeen?: Date;
}
export interface allUser {
  loading: boolean;
  err: boolean;
  users: null | oneUserType[];
}
