import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/user";
import { RootState } from "app/store";

export interface UserState {
  data: any;
  token?: string;
  isLogin: boolean;
}

const initialState: UserState = {
  data: {
    firstName: "",
    lastName: "",
    studentCardID: "",
    photoUrl: "",
    active: "",
    email: "",
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLogin = true;
        state.data = action.payload;
      })
      .addCase(updateStudentCardID.fulfilled, (state, action) => {
        state.data.studentCardID = action.payload.studentCardID;
      });
  },
});

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
