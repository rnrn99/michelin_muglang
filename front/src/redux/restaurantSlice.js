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

export const { setupInfo, setupReviews, addReview } = restaurantSlice.actions;

export default restaurantSlice.reducer;
