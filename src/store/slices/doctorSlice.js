import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    getArray(state, actions) {
      return state.data;
    },
  },
});

export const { getArray } = doctorSlice.actions;
export default doctorSlice.reducer;
