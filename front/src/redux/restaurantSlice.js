import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantInfo: {},
  restaurantReviews: [],
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setupInfo: (state, action) => {
      return { ...state, restaurantInfo: action.payload };
    },
    addBookmark: (state, action) => {
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          bookmarkCount: state.restaurantInfo.bookmarkCount + 1,
        },
      };
    },
    subBookmark: (state, action) => {
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          bookmarkCount: state.restaurantInfo.bookmarkCount - 1,
        },
      };
    },
    setupReviews: (state, action) => {
      return { ...state, restaurantReviews: action.payload };
    },
    addReview: (state, action) => {
      return {
        ...state,
        restaurantReviews: [...state.restaurantReviews, action.payload],
      };
    },
  },
});

export const { setupInfo, addBookmark, subBookmark, setupReviews, addReview } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
