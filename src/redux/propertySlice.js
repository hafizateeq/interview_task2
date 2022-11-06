import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyData: [],
};

const PropertySlice = createSlice({
  name: "propertySlice",
  initialState,
  reducers: {
    propertyData: (state, action) => {
      state.propertyData.push(action.payload);
    },
  },
});

export const { propertyData } = PropertySlice.actions;
export default PropertySlice.reducer;
