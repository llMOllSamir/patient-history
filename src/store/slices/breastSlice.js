import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  breast: {
    age: null,
    family_history: null,
    recommendations: null,
  },
  error: null,
};

// Get Breast History data
export const getBreast = createAsyncThunk(
  "breast/getBreastAsync",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/breast/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    clearBreastData: (state) => {
      Object.assign(state, initialState);
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
    builder.addCase(getBreast.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBreast.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.breast = payload;
    });
    builder.addCase(getBreast.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { clearBreastData } = breastSlice.actions;
export default breastSlice.reducer;
