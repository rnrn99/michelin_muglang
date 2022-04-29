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
    deleteReview: (state, action) => {
      const newReviews = state.restaurantReviews.filter(
        (review) => review.id !== action.payload,
      );
      return { ...state, restaurantReviews: newReviews };
    },
    editReview: (state, action) => {
      const newReviews = state.restaurantReviews.map((review) => {
        if (review.id === action.payload.id) {
          return action.payload;
        }
        return review;
      });
      return { ...state, restaurantReviews: newReviews };
    },
  },
});

export const {
  setupInfo,
  addBookmark,
  subBookmark,
  setupReviews,
  addReview,
  deleteReview,
  editReview,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
