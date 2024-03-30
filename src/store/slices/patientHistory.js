import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";

const initialState = {
  loading: false,
  history: null,
  error: null,
};

// Get patient History data
export const getHistory = createAsyncThunk(
  "patientHistory/getHistoryAsync",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/patients/${id}/history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error.response));
    }
  }
);

const patientHistorySlice = createSlice({
  name: "patientHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getHistory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.history = payload;
    });
    builder.addCase(getHistory.rejected, (state, { payload }) => {
      payload = JSON.parse(payload);
      state.loading = false;
      state.error = payload;
    });
  },
});

// export const {  } = patientHistorySlice.actions;
export default patientHistorySlice.reducer;
