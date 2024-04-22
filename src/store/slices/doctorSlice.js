import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [], history: [] };

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    getArray(state, actions) {
      return state.data;
    },
    setDoctorsData: (state, { payload }) => {
      state.data = payload;
    },
    setHistory: (state, { payload }) => {
      state.history = payload;
    },
  },
});

export const { getArray, setDoctorsData, setHistory } = doctorSlice.actions;
export default doctorSlice.reducer;
