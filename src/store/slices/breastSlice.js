import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  breast: null,
  error: null,
};

export const updateBreast = createAsyncThunk(
  "breast/updateBreastAsync",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Http().put(`/breast/${id}`, data);
      if (response.status === 200) {
        notify("تم تحديث الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add breast data
export const addBreast = createAsyncThunk(
  "breast/addBreastAsync",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await Http().post(`/breast/`, data);
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

const breastSlice = createSlice({
  name: "breast",
  initialState,
  reducers: {
    setBreastData: (state, { payload }) => {
      state.breast = payload || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBreast.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBreast.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.breast = payload.examination;
    });
    builder.addCase(addBreast.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(updateBreast.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBreast.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.breast = payload.examination;
    });
    builder.addCase(updateBreast.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setBreastData } = breastSlice.actions;
export default breastSlice.reducer;
