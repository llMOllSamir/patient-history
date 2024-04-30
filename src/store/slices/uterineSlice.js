import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  uterine: {},
  error: null,
};

const uterineSlice = createSlice({
  name: "uterine",
  initialState,
  reducers: {
    setUterine: (state, { payload }) => {
      state.uterine = payload;
    },
    clearUterine: (state) => {
      state.uterine = {};
    },
  },
});

export const { setUterine, clearUterine } = uterineSlice.actions;
export default uterineSlice.reducer;
