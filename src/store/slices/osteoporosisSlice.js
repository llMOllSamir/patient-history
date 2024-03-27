import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  osteoporosis: {
    age: null,
    weight: null,
    current_oestrogen_use: null,
    recommendations: null,
  },
  error: null,
};

// Get Osteoporosis History data
export const getOsteoporosis = createAsyncThunk(
  "osteoporosis/getOsteoporosis",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/osteoporosis/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    clearOsteoporosisData: (state) => {
      Object.assign(state, initialState);
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
      state.osteoporosis = payload.obstetric;
    });
    builder.addCase(addOsteoporosis.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getOsteoporosis.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOsteoporosis.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.osteoporosis = payload;
    });
    builder.addCase(getOsteoporosis.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { clearOsteoporosisData } = osteoporosisSlice.actions;
export default osteoporosisSlice.reducer;
