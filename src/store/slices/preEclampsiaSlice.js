import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  preEclampsia: {
    "history_of_pre-eclampsia": null,
    number_of_pregnancies_with_pe: null,
    date_of_pregnancies_with_pe: null,
    fate_of_the_pregnancy: null,
  },
  error: null,
};

// Get Pre Eclampsia History data
export const getPreEclampsia = createAsyncThunk(
  "preEclampsia/getPreEclampsia",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/pre-eclampsia/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error.response));
    }
  }
);

export const updatePreEclampsia = createAsyncThunk(
  "preEclampsia/updatePreEclampsia",
  async ({ id, data }, { rejectWithValue }) => {
    data.date_of_pregnancies_with_pe = JSON.stringify(
      data.date_of_pregnancies_with_pe
    );
    try {
      const response = await Http().put(`/pre-eclampsia/${id}`, data);
      if (response.status === 200) {
        notify("تم تحديث الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Pre Eclampsia data
export const addPreEclampsia = createAsyncThunk(
  "preEclampsia/addPreEclampsia",
  async ({ data }, { rejectWithValue }) => {
    data.date_of_pregnancies_with_pe = JSON.stringify(
      data.date_of_pregnancies_with_pe
    );
    try {
      const response = await Http().post(`/pre-eclampsia/`, data);
      if (response.status === 201) {
        notify("تم إضافة الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      notify("حدث خطأ أثناء تحديث الفحص", "error");
      return rejectWithValue(error.message);
    }
  }
);

const preEclampsiaSlice = createSlice({
  name: "preEclampsia",
  initialState,
  reducers: {
    clearPreEclampsiaData: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPreEclampsia.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addPreEclampsia.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.preEclampsia = payload.test;
    });
    builder.addCase(addPreEclampsia.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getPreEclampsia.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPreEclampsia.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      payload.date_of_pregnancies_with_pe = payload.date_of_pregnancies_with_pe
        ? JSON.parse(payload.date_of_pregnancies_with_pe)
        : null;
      state.preEclampsia = payload;
    });
    builder.addCase(getPreEclampsia.rejected, (state, { payload }) => {
      payload = JSON.parse(payload);
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearPreEclampsiaData } = preEclampsiaSlice.actions;
export default preEclampsiaSlice.reducer;
