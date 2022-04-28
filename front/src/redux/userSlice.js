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
    deleteBookmark: (state, action) => {},
    deleteReview: (state, action) => {
      const newReviews = state.reviews.filter(
        (review) => review.id !== action.payload,
      );
      return { ...state, reviews: newReviews };
    },
  },
});

export const {
  login,
  logout,
  setupBookmarks,
  setupReviews,
  deleteBookmark,
  deleteReview,
} = userSlice.actions;

export default userSlice.reducer;
