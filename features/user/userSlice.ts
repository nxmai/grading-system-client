import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userApi from "api/user";
import { RootState } from "app/store";

export type UserModel = {
  _id: string,
  firstName: string,
  lastName: string,
  studentCardID: string,
  studentCardIDScraft: string,
  photoUrl: string,
  active: boolean,
  email: string,
  role: "admin" | "user" | "guest",
  black_type: "ban" | "block" | "none",
}

export type ClassModal = {
    _id: string,
    name: string,
    subject: string,
    description: string,
    createdAt: string,
  }

export interface UserState {
  data: UserModel;
  token?: string;
  isLogin: boolean;
}

const initialState: UserState = {
  data: {
    _id: "",
    firstName: "",
    lastName: "",
    studentCardID: "",
    studentCardIDScraft: "",
    photoUrl: "",
    active: false,
    email: "",
    role: "guest",
    black_type: "none"
  },
  token: "",
  isLogin: false,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const response = await userApi.getMe();
    return response.data;
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (data: any) => {
    const response = await userApi.updateInfo(data);
    return response.data;
  }
);

export const updateStudentCardID = createAsyncThunk(
  "user/updateStudentCard",
  async (studentCardId: String) => {
    const response = await userApi.updateStudentID({ studentCardId });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<UserModel>) => {
      state.isLogin = true;
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLogin = true;
        state.data = action.payload;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateStudentCardID.fulfilled, (state, action) => {
        state.data.studentCardID = action.payload.studentCardID;
      });
  },
});

export const { setInit } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
