import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  obstetrics: null,
  error: null,
};

export const updateObstetrics = createAsyncThunk(
  "obstetrics/updateObstetrics",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Http().put(`/obstetrics/${id}`, data);
      if (response.status === 200) {
        notify("تم تحديث الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add patient data
export const addObstetrics = createAsyncThunk(
  "obstetrics/addObstetrics",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await Http().post(`/obstetrics/`, data);
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

const obstetricsSlice = createSlice({
  name: "obstetrics",
  initialState,
  reducers: {
    setObstetrics: (state, { payload }) => {
      state.obstetrics = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addObstetrics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addObstetrics.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.obstetrics = payload.obstetric;
    });
    builder.addCase(addObstetrics.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {setObstetrics} =
  obstetricsSlice.actions;
export default obstetricsSlice.reducer;
