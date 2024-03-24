import { createSlice, } from "@reduxjs/toolkit";


const initialState = {
  gynecologicalHistory: [],
  newGynecologicalHistory: [],
};

const gynecologicalHistorySlice = createSlice({
  name: "gynecologicalHistory",
  initialState,
  reducers: {
    // Add gynecological History data
    addGynecologicalHistoryData: (state, { payload }) => {
      state.newGynecologicalHistory = payload;
    },
  },
});

export const { addGynecologicalHistoryData } =
  gynecologicalHistorySlice.actions;
export default gynecologicalHistorySlice.reducer;
