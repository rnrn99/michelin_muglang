import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  bookmarks: [],
  reviews: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, user: action.payload };
    },
    logout: (state, action) => {
      return initialState;
    },
    setupBookmarks: (state, action) => {
      return { ...state, bookmarks: action.payload };
    },
    setupReviews: (state, action) => {
      return { ...state, reviews: action.payload };
    },
  },
});

export const { login, logout, setupBookmarks, setupReviews } =
  userSlice.actions;

export default userSlice.reducer;
