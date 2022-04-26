import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    _id: "",
    name: "",
    address: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    currency: "",
    cuisine: [],
    longitude: "",
    latitude: "",
    phoneNumber: "",
    url: "",
    websiteUrl: "",
    award: "",
    country: "",
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setup: (state, action) => {
      return { restaurant: action.payload };
    },
  },
});

export const { setup } = restaurantSlice.actions;

export default restaurantSlice.reducer;
