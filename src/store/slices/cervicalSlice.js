import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  cervical: null,
};

const cervicalSlice = createSlice({
  name: "cervical",
  initialState,
  reducers: {
    setCervicalData: (state, { payload }) => {
      state.cervical = payload || null;
    },
  },
});

export const { setCervicalData } = cervicalSlice.actions;
export default cervicalSlice.reducer;
