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
    deleteDoctor: (state, { payload }) => {
      const newList = state.data.filter((item) => item.id !== payload);
      state.data = newList;
    },
    addAdminActivity: (state, { payload }) => {
      state.history.unshift(payload);
    },
  },
});

export const {
  getArray,
  setDoctorsData,
  setHistory,
  deleteDoctor,
  addAdminActivity,
} = doctorSlice.actions;
export default doctorSlice.reducer;
