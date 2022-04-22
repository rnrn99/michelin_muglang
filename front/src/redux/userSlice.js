import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("%c로그인!", "color: #d93d1a;");
      return { user: action.payload };
    },
    logout: (state, action) => {
      console.log("%c로그아웃!", "color: #d93d1a;");
      return { user: null };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
