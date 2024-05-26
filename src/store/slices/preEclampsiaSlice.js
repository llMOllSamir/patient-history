import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  preEclampsia: null,
  error: null,
};

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
    setPreEclampsia: (state, { payload }) => {
      state.preEclampsia = payload || null;
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
  },
});

export const { setPreEclampsia } = preEclampsiaSlice.actions;
export default preEclampsiaSlice.reducer;
