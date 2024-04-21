import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  ovarian: null,
  error: null,
};

export const updateOvarian = createAsyncThunk(
  "ovarian/updateOvarianAsync",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Http().put(`/ovarian/${id}`, data);
      if (response.status === 200) {
        notify("تم تحديث الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add ovarian data
export const addOvarian = createAsyncThunk(
  "ovarian/addOvarianAsync",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await Http().post(`/ovarian`, data);
      if (response.status === 201) {
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const ovarianSlice = createSlice({
  name: "ovarian",
  initialState,
  reducers: {
    setOvarian: (state, { payload }) => {
      state.ovarian = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOvarian.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addOvarian.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addOvarian.rejected, (state) => {
      notify("حدث خطأ أثناء اضافه الفحص", "error");

      state.loading = false;
      state.error = true;
    });
    builder.addCase(updateOvarian.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOvarian.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateOvarian.rejected, (state) => {
      state.loading = false;
      state.error = true;
      notify("حدث خطأ أثناء تحديث الفحص", "error");
    });
  },
});

export const { setOvarian } = ovarianSlice.actions;
export default ovarianSlice.reducer;
