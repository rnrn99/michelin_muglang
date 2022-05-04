import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantInfo: {},
  restaurantReviews: [],
  restaurantNearby: [],
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
      state.restaurantReviews.forEach((review) => {
        if (review.id === action.payload.id) {
          review.text = action.payload.text;
        }
      });

      return state;
    },
    setupNearby: (state, action) => {
      const nearby = action.payload.filter(
        (restaurant) => state.restaurantInfo._id !== restaurant._id,
      );
      return { ...state, restaurantNearby: nearby };
    },
    addComment: (state, action) => {
      state.restaurantReviews.forEach((review) => {
        if (review.id === action.payload.reviewId) {
          review.comments.push(action.payload.comment);
        }
      });
      return state;
    },
    deleteComment: (state, action) => {
      state.restaurantReviews.forEach((review) => {
        if (review.id === action.payload.reviewId) {
          const newComments = review.comments.filter(
            (comment) => comment._id !== action.payload.commentId,
          );
          review.comments = newComments;
        }
      });
      return state;
    },
    editComment: (state, action) => {
      state.restaurantReviews.forEach((review) => {
        if (review.id === action.payload.reviewId) {
          review.comments.forEach((comment) => {
            if (comment._id === action.payload.comment._id) {
              comment.text = action.payload.comment.text;
            }
          });
        }
      });
      return state;
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
  setupNearby,
  addComment,
  deleteComment,
  editComment,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
