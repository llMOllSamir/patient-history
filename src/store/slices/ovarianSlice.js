import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  ovarian: {
    breast_cancer_history: null,
    relatives_with_ovarian_cancer: null,
    gene_mutation_or_lynch_syndrome: null,
    tvs_result: null,
    tvs_comment: null,
    "ca-125_result": null,
    "ca-125_comment": null,
    recommendations: null,
  },
  error: null,
};

// Get ovarian History data
export const getOvarian = createAsyncThunk(
  "ovarian/getOvarianAsync",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Http().get(`/ovarian/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error.response));
    }
  }
);

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
      const response = await Http().post(`/ovarian/`, data);
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

const ovarianSlice = createSlice({
  name: "ovarian",
  initialState,
  reducers: {
    clearOvarianData: (state) => {
      Object.assign(state, initialState);
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
      state.ovarian = payload.examination;
    });
    builder.addCase(addOvarian.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getOvarian.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOvarian.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.ovarian = payload;
    });
    builder.addCase(getOvarian.rejected, (state, { payload }) => {
      payload = JSON.parse(payload);
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearOvarianData } = ovarianSlice.actions;
export default ovarianSlice.reducer;
