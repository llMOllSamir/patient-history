import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";

const initialState = {
  loading: false,
  history: null,
  error: null,
};

// Get patient History data
export const getPatientHistory = createAsyncThunk(
  "history/getPatientHistoryAsync",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/patients/${id}/history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error.response));
    }
  }
);
export const getDoctorHistory = createAsyncThunk(
  "history/getDoctorHistoryAsync",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/doctors/${id}/history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error.response));
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatientHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPatientHistory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      payload.forEach((element) => {
        if (
          element.preEclampsia &&
          element.preEclampsia.date_of_pregnancies_with_pe.length
        ) {
          element.preEclampsia.date_of_pregnancies_with_pe = element
            .preEclampsia.date_of_pregnancies_with_pe
            ? JSON.parse(element.preEclampsia.date_of_pregnancies_with_pe)
            : null;
        }
      });
      state.history = payload;
    });
    builder.addCase(getPatientHistory.rejected, (state, { payload }) => {
      payload = JSON.parse(payload);
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getDoctorHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDoctorHistory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      payload.forEach((element) => {
        if (
          element.preEclampsia &&
          element.preEclampsia.date_of_pregnancies_with_pe.length
        ) {
          element.preEclampsia.date_of_pregnancies_with_pe = element
            .preEclampsia.date_of_pregnancies_with_pe
            ? JSON.parse(element.preEclampsia.date_of_pregnancies_with_pe)
            : null;
        }
      });
      state.history = payload;
    });
    builder.addCase(getDoctorHistory.rejected, (state, { payload }) => {
      payload = JSON.parse(payload);
      state.loading = false;
      state.error = payload;
    });
  },
});
export const {} = historySlice.actions;
export default historySlice.reducer;
