import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  obstetrics: {
    gravidity: null,
    parity: null,
    abortion: null,
    notes: null,
  },
  error: null,
};

// Get Obstetrics History data
export const getObstetrics = createAsyncThunk(
  "obstetrics/getObstetrics",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/obstetrics/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error.response));
    }
  }
);

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
    clearObstetricsData: (state) => {
      Object.assign(state, initialState);
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
    builder.addCase(getObstetrics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getObstetrics.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.obstetrics = payload;
    });
    builder.addCase(getObstetrics.rejected, (state, { payload }) => {
      payload = JSON.parse(payload);
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { addObstetricsData, clearObstetricsData } =
  obstetricsSlice.actions;
export default obstetricsSlice.reducer;
