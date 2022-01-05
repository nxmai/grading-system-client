import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import classApi from "api/classes";
import classInviteUserApi from "api/classInviteUser";
import { RootState } from "app/store";

export interface ClassState {
  data: any;
  status: "idle" | "loading" | "failed";
}

const initialState: ClassState = {
  data: [],
  status: "idle",
};

export const fetchClassesFromAPI = createAsyncThunk(
  "class/fetchClasses",
  async () => {
    const response = await classApi.getAllClassesByUser();
    return response.data;
  }
);

export const addClass = createAsyncThunk(
  "class/addClass",
  async (classInfo: any) => {
    const response = await classApi.createClass(classInfo);
    return response.data;
  }
);

export const joinClass = createAsyncThunk(
  "class/joinClass",
  async (classInfo: any) => {
    const response = await classInviteUserApi.confirmInviteUserLink(classInfo.code);
    return response.data;
  }
);

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassesFromAPI.pending, (state) => {
        state.status == "loading";
      })
      .addCase(fetchClassesFromAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchClassesFromAPI.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export const selectClass = (state: RootState) => state.class.data;

export default classSlice.reducer;
