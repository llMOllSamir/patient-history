import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gynecologicalHistory: null,
};

const gynecologicalHistorySlice = createSlice({
  name: "gynecologicalHistory",
  initialState,
  reducers: {
    // Add gynecological History data
    addGynecologicalHistoryData: (state, { payload }) => {
      state.gynecologicalHistory = payload;
    },
  },
});

export const { addGynecologicalHistoryData } =
  gynecologicalHistorySlice.actions;
export default gynecologicalHistorySlice.reducer;
