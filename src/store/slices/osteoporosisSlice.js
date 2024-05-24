
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  osteoporosis: null,
  error: null,
};

export const updateOsteoporosis = createAsyncThunk(
  "osteoporosis/updateOsteoporosis",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Http().put(`/osteoporosis/${id}`, data);
      if (response.status === 200) {
        notify("تم تحديث الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      notify("حدث خطأ أثناء تحديث الفحص", "error");
      return rejectWithValue(error.message);
    }
  }
);

// Add Osteoporosis data
export const addOsteoporosis = createAsyncThunk(
  "osteoporosis/addOsteoporosis",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await Http().post(`/osteoporosis/`, data);
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

const osteoporosisSlice = createSlice({
  name: "osteoporosis",
  initialState,
  reducers: {
    setOsteoporosis: (state, { payload }) => {
      state.osteoporosis = payload || null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addOsteoporosis.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addOsteoporosis.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.osteoporosis = payload.test;
    });
    builder.addCase(addOsteoporosis.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(updateOsteoporosis.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOsteoporosis.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateOsteoporosis.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setOsteoporosis } = osteoporosisSlice.actions;
export default osteoporosisSlice.reducer;
